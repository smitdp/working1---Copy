import { jwtDecode } from "jwt-decode";

const getCurrentUserId = () => {
    const token = localStorage.getItem("login");
    let decodedToken;
    let id;
    if(token){
        decodedToken = jwtDecode(token);
        id = decodedToken.nameid;
    }


    return id;
}

export default getCurrentUserId;