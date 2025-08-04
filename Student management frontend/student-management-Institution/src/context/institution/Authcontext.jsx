import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Authcontext = createContext()

export const Authprovider = ({children})=>{
    const navigate=useNavigate()

    const [collegeid,setcollegeid] = useState("");
    const [loading,setloading] = useState(false)


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

const[hodlist,sethodlist]=useState([])
useEffect(()=>{
    const fetchhod=async()=>{
        try {
            const response = await axios.get("http://127.0.0.1:8000/collegeapp/hods/",{
                headers:{
                    Authorization:`Token ${token}`,
                },
            })
            sethodlist(response.data)
            
        } catch (error) {
            console.log(error);
            
            
        }
    }
    fetchhod()
},[])


const hod_create= async(name,email,phone,department)=>{
    try {
        const response = await axios.post("http://127.0.0.1:8000/collegeapp/hods/",{name,email,phone,department},{
            headers:{
                Authorization:`Token ${token}`
            }

        })
        console.log(response);
        toast.success('add successfully')
        
        
    } catch (error) {
        console.error(error)
        
    }
    finally{
        setloading(false)
    }
}

// const staff_create = async (username, email, password1, password2) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/superadmin_app/create_staff", { username, email, password1, password2 }, {
//         headers: {
//           Authorization: `Token ${token}`
//         }
//       })
//       console.log(response)
//       toast.success('Registered Successfully')
//     } catch (error) {
//       console.error(error)
//     }
//     finally {
//       setloading(false)
//     }
//   }



    return(
        <Authcontext.Provider value={{collegelogin,hodlist,hod_create}}>
            {
                children
            }
        </Authcontext.Provider>
    )
}



// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const Authcontext = createContext();

// export const Authprovider = ({ children }) => {
//   const navigate = useNavigate();
//   const [collegeid, setcollegeid] = useState("");

//   // ✅ Login API
//   const collegelogin = async (username, password) => {
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/superadmin_app/institution_login", {
//         username,
//         password,
//       });

//       console.log(res);
//       setcollegeid(res.data.user.institution_id);
//       localStorage.setItem("token", res.data.token);
//       navigate("/admin/dash");
//     } catch (error) {
//       console.log("Login failed:", error);
//     }
//   };

//   // ✅ Add HOD API
//   const addHod = async (hodData) => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/collegeapp/hods/", hodData, {
//         headers: {
//           Authorization: `Token ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("✅ HOD created:", res.data);
//       return res.data;
//     } catch (error) {
//       console.error("❌ Failed to create HOD:", error.response?.data || error.message);
//       throw error;
//     }
//   };

//   // ✅ (Optional) Fetch institution details
//   const fetchinstitution_details = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/superadmin_app/institution_detail/2/", {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       console.log("collegedetails", res.data);
//     } catch (error) {
//       console.log("Error fetching institution details", error);
//     }
//   };

//   useEffect(() => {
//     fetchinstitution_details();
//   }, []);

//   return (
//     <Authcontext.Provider value={{ collegelogin, addHod, collegeid }}>
//       {children}
//     </Authcontext.Provider>
//   );
// };
