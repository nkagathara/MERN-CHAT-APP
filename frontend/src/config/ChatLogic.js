export const getSender = (loggedInUser,users) =>{
    return loggedInUser._id === users[0]._id ? users[1].name : users[0].name;
}