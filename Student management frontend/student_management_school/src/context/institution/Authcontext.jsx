// import axios from "axios";
// import { Children, createContext } from "react";
// import { useNavigate } from "react-router-dom";

// export const Authcontext= createContext()

// export const Autprovider =({children})=>{

//     const Navigate = useNavigate

//     const school_login = async(username,password)=>{

//         try {

//             const res=await axios.post("http://127.0.0.1:8000/superadmin_app/institution_login",{username,password})

//             console.log(res);
//             Navigate("dashboard")
            
//         } catch (error) {

//              console.log(error);
        
            
//         }
//     }

//     return(
//         <Authcontext.Provider value={{school_login}}>

//             {
//                 children
//             }
//         </Authcontext.Provider>
//     )
// }



import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'



export const Authcontext = createContext()

export const Authprovider = ({children})=>{
    const navigate=useNavigate()

    const [schoolid,setschoolid] = useState("");
    const [loading,setloading] = useState(false)


    const school_login = async (username, password) => {
        try {
          const res = await axios.post(
            "http://127.0.0.1:8000/superadmin_app/institution_login",
            { username, password }
          );
      
          console.log("Login response:", res);
      
          const user = res?.data?.username;
          const token = res?.data?.token;
      
          if (user?.institution_id && token) {
            // success path
          } 
            else {
                console.error("Missing user or institution_id in response:", res.data);
              
          }
          
        } catch (error) {
          console.error("Login failed:", error);
        }
      };
      
    return(
        <Authcontext.Provider value={{school_login}}>
            {
                children
            }
        </Authcontext.Provider>
    )
}