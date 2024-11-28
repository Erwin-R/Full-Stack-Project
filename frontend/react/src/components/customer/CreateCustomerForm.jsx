import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack} from "@chakra-ui/react";
import {saveCustomer} from "../../services/client.js";
import {successNotification, errorNotification} from "../../services/notification.js";

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};


const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

// And now we can use these
const CreateCustomerForm = ({fetchCustomers}) => {
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    age: 0,
                    gender: '', // added for our select
                    password: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Must be 20 characters or less')
                        .required('Required'),
                    age: Yup.number()
                        .min(16, "Must be at least 16 years of age")
                        .max(100, "Must be at less than 100 years of age")
                        .required(),
                    password: Yup.string()
                        .min(6, "Must be at least 6 characters")
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    gender: Yup.string()
                        .oneOf(
                            ['MALE', 'FEMALE'],
                            'Invalid gender'
                        )
                        .required('Required'),
                })}
                // onSubmit={(values, { setSubmitting }) => {
                onSubmit={(customer, { setSubmitting }) => {
                    //so once we submit the form we set submitting to true so we do not send a bunch of requests to our server
                    setSubmitting(true)
                    saveCustomer(customer)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "Customer Saved",
                                `${customer.name} was successfully saved`
                            );
                            fetchCustomers();
                        }).catch(err => {
                            console.log(err);
                            errorNotification(
                                //both of these are derived from the JSON object we get back from the error on webpage
                                err.code,
                                err.response.data.message
                            )
                        }).finally(() => {
                            //Once we are done submitting the customer we change the state to false, so we are able to
                            //submit another customer again
                            setSubmitting(false);
                    })

                }}
            >

                {/*
                here we are destructuring and seeing whether form is valid and submitting
                wrapped the form like this {({curly brackets to destructure}) => (<Form> component)} so this is a function that
                lets us return the form
                */}
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Jane"
                            />

                            <MyTextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="jane@formik.com"
                            />

                            <MyTextInput
                                label="Age"
                                name="age"
                                type="number"
                                placeholder="20"
                            />

                            <MyTextInput
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Password"
                            />

                            <MySelect label="Gender" name="gender">
                                <option value="">Select gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </MySelect>

                            <Button type="submit" isDisabled={!isValid || isSubmitting}>Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateCustomerForm;