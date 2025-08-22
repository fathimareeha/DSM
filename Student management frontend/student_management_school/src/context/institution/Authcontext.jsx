
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// export const Authcontext = createContext()

// export const Authprovider = ({children})=>{
//     const navigate=useNavigate()

//     const [schoolid,setschoolid] = useState("");
//     const [loading,setloading] = useState(false)


//   const school_login = async (username, password) => {
//   try {
//     const res = await axios.post(
//       "http://127.0.0.1:8000/superadmin_app/institution_login",
//       { username, password }
//     );

//     console.log("Login response:", res);

//     const user = res?.data?.user;
//     const token = res?.data?.token;

//     if (user?.institution_id && token) {
//       setschoolid(user.institution_id);
//       localStorage.setItem("token", token);
//       navigate("/admin/dashboard");
//     } else {
//       console.error("Missing user or institution_id in response:", res.data);
//     }
//   } catch (error) {
//     console.error("Login failed:", error);
//   }
// };

// const createVicePrincipal = async (username, email, phone, password, institution_id) => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await axios.post(
//       "http://127.0.0.1:8000/schoolapp/createvp/",
//       {
//         username,
//         email,
//         phone,
//         password,
//         institution_id,  // Make sure this is passed correctly
//       },
//       {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
       
//       }
//     );

//     console.log("Vice Principal Created:", response.data);
//     toast.success("Vice Principal created successfully!");
//   } catch (error) {
//     console.error(
//       "Error creating Vice Principal:",
//       error.response?.data || error.message
//     );
//     toast.error("Failed to create Vice Principal");
//   }
// };


// // VPLIST

// const token = localStorage.getItem("token")
// const[VpList,setVpList] = useState([])
// useEffect(()=>{

//   const fetchVp=async()=>{

//     try {
//       const response = await axios.get("http://127.0.0.1:8000/schoolapp/createvp/",{

//         headers:{
//           Authorization: `Token ${token}`,
//         }
//       })

//       setVpList(response.data)
      
//     } catch (error) {
      
//       console.log(error);
      
//     }
//   }

//   fetchVp()
// },[])

// // const handleDeleteVp = async (id) => {
// //   try {
// //     await axios.delete(`http://127.0.0.1:8000/schoolapp/vpdetails/${id}`, {
// //       headers: {
// //         Authorization: `Token ${token}`,
// //       },
// //     });

// //     // Remove VP from list

// //     setVpList(prev => prev.filter(vp => vp.id !== id));
// //     alert(' deleted successfully');
// //   } catch (error) {
// //     console.error("Delete error:", error.response?.data || error.message);
    
// //   }
// // };


//     return(
//         <Authcontext.Provider value={{school_login,createVicePrincipal,VpList}}>
//             {
//                 children
//             }
//         </Authcontext.Provider>
//     )
// }


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [schoolId, setSchoolId] = useState("");
  const [loading, setLoading] = useState(false);

  const school_login = async (username, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/superadmin_app/institution_login`, 
        { username, password }
      );

      console.log("Login response:", res.data);

      const user = res?.data?.user;
      const token = res?.data?.token;

      if (user?.institution_id && token) {
        setSchoolId(user.institution_id);
        localStorage.setItem("token", token);
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        console.error("Missing user or institution_id in response:", res.data);
        toast.error("Invalid login response from server.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
        toast.error(error.response?.data?.detail || "Login failed, please try again.");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
    
  };

  const createVicePrincipal = async (username, email, phone, password, institution_id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to perform this action.");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/schoolapp/createvp/`,
        { username, email, phone, password, institution_id },
        { headers: { Authorization: `Token ${token}` } }
      );

      console.log("Vice Principal Created:", response.data);
      toast.success("Vice Principal created successfully!");
    } catch (error) {
      console.error("Error creating Vice Principal:", error.response?.data || error.message);
      toast.error("Failed to create Vice Principal");
    }
  };

  return (
    <AuthContext.Provider value={{ schoolId, loading, school_login, createVicePrincipal }}>
      {children}
    </AuthContext.Provider>
  );
};
