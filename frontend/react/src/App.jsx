import UserProfile from "./UserProfile.jsx";
import {useState, useEffect} from "react";
import { Wrap, WrapItem, Spinner, Text } from '@chakra-ui/react'
import SidebarWithHeader from "./components/shared/Sidebar.jsx";
import {getCustomers} from "./services/client.js";
import CardWithImage from "./components/Card.jsx";

const App = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getCustomers().then(res => {
                setCustomers(res.data)
            }).catch(err =>{
                console.log(err)
            }).finally(() => {
                setLoading(false);
            })
        })
    }, [])

    //displaying the load bar while we are loading the customers
    if(loading){
        return (
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        )
    }

    //if there are no customers in the database
    if(customers.length <= 0){
        return (
            <SidebarWithHeader>
                <Text>No customers available.</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <Wrap justify={"center"} spacing={"30px"}>
                {
                    customers.map((customer, index) =>(
                         <WrapItem key={index}>
                            {/* using spread so we don't have to pass each C value such as c.name, c.gender, etc. */}
                            {/* instead we are going to do this in the card.jsx file*/}
                            <CardWithImage {...customer}/>
                        </WrapItem>
                    ))
                }
            </Wrap>
        </SidebarWithHeader>
    )
}




// const users = [
//     {
//         name: "Jamila",
//         age: 22,
//         gender: "FEMALE"
//     },
//     {
//         name: "Ana",
//         age: 45,
//         gender: "FEMALE"
//     },
//     {
//         name: "Alex",
//         age: 18,
//         gender: "MALE"
//     },
//     {
//         name: "Bilal",
//         age: 27,
//         gender: "MALE"
//     }
// ]
//
// //passing array "users" as a prop so must pass users in through the component
// const UserProfiles = ({ users }) => (
//     <div>
//         {/* whenever you use map you have to assign variable "key" to an index */}
//         {/* can also use parenthesis without return instead of curly bracket with return keyword if we are returning immediately*/}
//         {users.map((user, index) => (
//             <UserProfile
//                 key = {index}
//                 name = {user.name}
//                 age = {user.age}
//                 gender = {user.gender}
//                 imageNumber={index}
//             />
//         ))}
//     </div>
// )
// function App() {
//     const [counter, setCounter] = useState(0);
//     const[isLoading, setIsLoading] = useState(false);
//
//     //use effect takes a function and an array of dependencies, if we only want the useEffect to run once then dont include dependencies
//     useEffect(() => {
//         setIsLoading(true)
//         setTimeout(() => {
//             setIsLoading(false)
//         }, 4000)
//         return () => {
//             console.log("cleanup functions")
//         }
//     }, []);
//
//     if(isLoading){
//         //renders loading instead of the component below
//         return "loading..."
//     }
//
//     //when we return the component thats when it gets mounted and renders onto the webpage
//     return (
//         <div>
//             <button
//                 onClick={() => setCounter(prevCounter => prevCounter + 5)}>
//                 Increment Counter
//             </button>
//             <h1>{counter}</h1>
//             <UserProfiles users={users} />
//         </div>
//     )
// }

export default App
        // <div>
        //     {/*Component has to be in self closing tag if you want to pass HTML inside of it*/}
        //     <UserProfile
        //         name = {"Jamila"}
        //         age = {22}
        //         gender = {"women"}
        //     >
        //     anything between the component(UserProfile) tags are considered props children
        //         <p>Hello</p>
        //     </UserProfile>
        //     <UserProfile
        //         name = {"Marco"}
        //         age = {34}
        //         gender = {"men"}
        //     >
        //         <h1>Ciao</h1>
        //     </UserProfile>
        // </div>



//This code is notes for when using the map function
//         <div>
//             {/* whenever you use map you have to assign variable "key" to an index */}
//             {/* can also use parenthesis without return instead of curly bracket with return keyword if we are returning immediately*/}
//             {users.map((user, index) => (
//                 <UserProfile
//                     key = {index}
//                     name = {user.name}
//                     age = {user.age}
//                     gender = {user.gender}
//                     imageNumber={index}
//                 />
        //
        //         return <UserProfile
        //             key = {index}
        //             name = {user.name}
        //             age = {user.age}
        //             gender = {user.gender}
        //             imageNumber={index}
        //         />
        //     ))}
        // </div>
