import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../Server";

export const UserInformationContext = createContext();


const UserInformationProvider = ({children}) => {
    const [information, setInformation] = useState({});
    const [currentUserId, setCurrentUserId] = useState("");
    // const {token} = useContext(LoginContext);
    const token = localStorage.getItem("login")
    console.log(token);
    console.log(information, currentUserId);

    useEffect(() => {
      if(token && currentUserId) {
        const user = async () => {
            try {
              const user = await axios.get(`${baseURL}/user/user-info/${currentUserId}`);
              console.log("RELOAD");
              setInformation(user.data);
            } catch(error) {
              console.log(error);
            }
        }
        user();
        
      }
    }, [token, currentUserId])
    
  return (<UserInformationContext.Provider value = {{information, setInformation, setCurrentUserId
}}>{children}</UserInformationContext.Provider>);
}

export default UserInformationProvider;