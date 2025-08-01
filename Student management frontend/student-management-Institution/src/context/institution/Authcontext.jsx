import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Authcontext = createContext()

export const Authprovider = ({children})=>{
    const navigate=useNavigate()

    const [collegeid,setcollegeid] = useState("")

    const collegelogin=async(username,password)=>{
        try {
            const res=await axios.post("http://127.0.0.1:8000/superadmin_app/institution_login",{username,password})
            console.log(res);
            setcollegeid(res.data.user.institution_id)
            localStorage.setItem("token",res.data.token)

            navigate("admin/dash")
            
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const token = localStorage.getItem("token")


    const fetchinstitution_details = async () => {
    const token = localStorage.getItem("token");  // ensure token is fetched inside the function
    try {
        const res = await axios.get(
            `http://127.0.0.1:8000/superadmin_app/institution_detail/2/`,
            {
                headers: {
                    Authorization: `Token 422bb1e4ff6fc1dc629f21064fa187352ca7cfa1`,
                },
            }
        );
        console.log("collegedetails", res.data);
    } catch (error) {
        console.log("Error fetching institution details", error);
    }
};

useEffect(
   ()=>{
    fetchinstitution_details()
   },[]
)
    return(
        <Authcontext.Provider value={{collegelogin}}>
            {
                children
            }
        </Authcontext.Provider>
    )
}