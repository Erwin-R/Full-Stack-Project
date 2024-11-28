import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Flex, Heading, Image, Link, Stack, Text} from "@chakra-ui/react";
import CreateCustomerForm from "../shared/CreateCustomerForm.jsx";

const Signup = () => {
    const {customer, setCustomerFromToken} = useAuth();
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
                    <CreateCustomerForm onSuccess={(token) => {
                        localStorage.setItem("access_token", token)
                        setCustomerFromToken()
                        navigate("/dashboard");
                    }}/>
                    <Link color={"blue.600"} href={"/"}>
                        Have an account? Login here!
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

export default Signup;