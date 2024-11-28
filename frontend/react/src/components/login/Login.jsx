import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    Text, Box, Alert, AlertIcon
} from '@chakra-ui/react';
import {Form, Formik, useField} from "formik";
import * as Yup from 'yup';
import {useAuth} from "../context/AuthContext.jsx";
import {errorNotification} from "../../services/notification.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

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

const LoginForm = () => {
    // we have access to the user or login function but in this case we just use login
    //const {user, login} = useAuth;
    const {login} = useAuth();
    const navigate = useNavigate();

    return (
        <Formik
            validateOnMount={true}
            validationSchema={
                Yup.object({
                    username: Yup.string()
                        .email("Must be a valid email")
                        .required("Email is required"),
                    password: Yup.string()
                        .max(20, "Password cannot be longer than 20 characters")
                        .required("Password is required ")
                })
            }
            initialValues={{username: '', password: ''}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                login(values).then(res => {
                    // navigate to dashboard
                    navigate("/dashboard")
                    console.log("Succesfully logged in ", res);
                }).catch(err => {
                    errorNotification(
                        //both of these are derived from the JSON object we get back from the error on webpage
                        err.code,
                        err.response.data.message
                    )
                }).finally(() => {
                    setSubmitting(false);
                })

            }}>

            {({isValid, isSubmitting}) => (
                <Form>
                    <Stack spacing={15}>
                        <MyTextInput
                            label={"Email"}
                            name={"username"}
                            type={"email"}
                            placeholder={"example@gmail.com"}
                        />
                        <MyTextInput
                            label={"Password"}
                            name={"password"}
                            type={"password"}
                            placeholder={"Enter your password"}
                        />

                        <Button
                            type={"submit"}
                            isDisabled={!isValid || isSubmitting}
                        >
                            Login
                        </Button>
                    </Stack>

                </Form>
            )}

        </Formik>
    )
}

const Login = () => {
    const {customer} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(customer){
            navigate("/dashboard")
        }
    });
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'} mb={11}>Sign in to your account</Heading>
                    <LoginForm/>
                    <Link color={"blue.600"} href={"/signup"}>
                        Don't have an account? Register here!
                    </Link>
                </Stack>
            </Flex>
            <Flex flex={1}
                  flexDirection={"column"}
                  p={10}
                  alignItems={"center"}
                  justifyContent={"center"}
                  bgGradient={{sm: 'linear(to-r, red.800, purple.700)'}}
            >
                <Text fontSize={"5xl"} color={"white"} fontWeight={"bold"} mb={5}>
                    <Link href={"https://github.com/Erwin-R/Full-Stack-Project"}>
                        Check Out The Repository!
                    </Link>
                </Text>
                <Image
                    alt={'Login Image'}
                    objectFit={'scale-down'}
                    src={
                        'https://user-images.githubusercontent.com/40702606/215539167-d7006790-b880-4929-83fb-c43fa74f429e.png'
                    }
                />
            </Flex>
        </Stack>
    );
}

export default Login;