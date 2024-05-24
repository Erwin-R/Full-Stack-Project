//spread operator is used to grab rest of props/children
const UserProfile = ({name, age, gender, imageNumber, ... props}) => {

    gender = gender === "MALE" ? "men" : "women"

    return (
        <div>
            <p>{name}</p>
            <p>{age}</p>
            <img
                src={`https://randomuser.me/api/portraits/${gender}/${imageNumber}.jpg`}
            />
            {/*props.children is taken from the code passed in between the component opening and closing tag*/}
            {props.children}
        </div>
    )
}

export default UserProfile;

//one way to use props but if you do not want to use props keyword then use the UserProfile function at the top of page
// const UserProfile = (props) => {
//     return (
//         <div>
//             <p>{props.name}</p>
//             <p>{props.age}</p>
//             <img src={`https://randomuser.me/api/portraits/${props.gender}/75.jpg`}/>
//         </div>
//     )
// }