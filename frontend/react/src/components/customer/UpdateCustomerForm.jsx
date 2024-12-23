import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Image, Input, Select, Stack, VStack} from "@chakra-ui/react";
import {
    customerProfilePictureUrl,
    saveCustomer,
    updateCustomer,
    uploadCustomerProfilePicture
} from "../../services/client.js";
import {successNotification, errorNotification} from "../../services/notification.js";
import {useCallback} from "react";
import {useDropzone} from "react-dropzone";

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

const MyDropzone = ({ customerId , fetchCustomers}) => {
    const onDrop = useCallback(acceptedFiles => {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0])
        // Do something with the files
        uploadCustomerProfilePicture(
            customerId,
            formData
        ).then(() => {
            successNotification("Success", "Profile Picture Uploaded")
            fetchCustomers();
        }).catch((err) => {
            errorNotification("Failed", "Profile picture failed to upload")
            console.log(err)
        })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Box {...getRootProps()}
            w={'100%'}
             textAlign={'center'}
             border={'dashed'}
             borderColor={'gray.200'}
             borderRadius={'3xl'}
             p={6}
             rounded={'md'}
        >
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the picture here ...</p> :
                    <p>Drag 'n' drop picture files here, or click to picture files</p>
            }
        </Box>
    )
}

// And now we can use these
const UpdateCustomerForm = ({fetchCustomers, initialValues, customerId}) => {
    return (
        <>
            <VStack spacing={'5'} mb={'5'}>
                <Image
                    borderRadius={'full'}
                    boxSize={'150px'}
                    objectFit={'cover'}
                    src={customerProfilePictureUrl(customerId)}
                />
                <MyDropzone
                    customerId={customerId}
                    fetchCustomers={fetchCustomers}
                />
            </VStack>
            <Formik
                initialValues={initialValues}
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
                })}
                // onSubmit={(values, { setSubmitting }) => {
                onSubmit={(updatedCustomer, { setSubmitting }) => {
                    //so once we submit the form we set submitting to true so we do not send a bunch of requests to our server
                    setSubmitting(true)
                    updateCustomer(customerId, updatedCustomer)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "Customer updated",
                                `${updatedCustomer.name} was successfully update`
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
                wrapped the form like this {({curly brackets to destructure}) => (<Form> component)}
                */}
                {({isValid, isSubmitting, dirty}) => (
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

                            {/*dirty keyword checks if values have been changed from the input box*/}
                            <Button type="submit" isDisabled={!(isValid && dirty) || isSubmitting}>Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default UpdateCustomerForm;