import {
    Button, Drawer,
    DrawerBody,
    DrawerCloseButton, DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input, useDisclosure
} from "@chakra-ui/react";
import CreateCustomerForm from "../shared/CreateCustomerForm.jsx";
import UpdateCustomerForm from "./UpdateCustomerForm.jsx";

const AddIcon = () => "+";
const CloseIcon = () => "x";

const UpdateCustomerDrawer = ({fetchCustomers, initialValues, customerId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button
            bg={'dodgerblue'}
            color={"black"}
            rounded={"full"}
            _hover={{
                transform:'translateY(-2px)',
                boxShadow:'lg'
            }}
            onClick={onOpen}
        >
            Update Customer
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"lg"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Update customer</DrawerHeader>

                <DrawerBody>
                    <UpdateCustomerForm
                        fetchCustomers={fetchCustomers}
                        initialValues={initialValues}
                        customerId={customerId}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        leftIcon={<CloseIcon/>}
                        colorScheme={"teal"}
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>

}


export default UpdateCustomerDrawer
