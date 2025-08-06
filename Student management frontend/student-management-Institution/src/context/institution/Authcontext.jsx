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
    
    const department_create = async (name) => {
  const token = localStorage.getItem("token"); // fetch inside function to ensure it's up to date

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/collegeapp/departments/",
      { name},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
       
            
      }
           

    );
    console.log(res.data);
    setdepartmentlist((prevList) => [...prevList, res.data]);
    toast.success("Department created successfully");
    navigate("admin/department")
  } catch (error) {
    console.error(error);
    toast.error("Failed to create department.");
  }
};




      // Create new HOD
//   const hod_create = async (username, email, password, department, phone, college) => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/collegeapp/hods/",
//         { username, email, password, department, phone, college },
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );

//       console.log(res.data);
//       sethodlist((prevList) => [...prevList, res.data]);
//       toast.success("HOD created successfully");
//       navigate("admin/hod");
//     } catch (error) {
//         console.log(error);
        
//       console.error("Error creating HOD:", error.response?.data || error.message);
//       toast.error("Failed to create HOD.");
//     }
//   };

// const hod_create = async (username, email, password, department, phone) => {
//   const token = localStorage.getItem("token");

//   // Log the data being sent
//   console.log("📤 Sending HOD data:", {
//     username,
//     email,
//     password,
//     department,
//     phone,
    
//   });

//   try {
//     const res = await axios.post(
//       "http://127.0.0.1:8000/collegeapp/hods/",
//       { username, email, password, department, phone },
//       {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       }
//     );

//     console.log("✅ Response:", res.data);
//     sethodlist((prevList) => [...prevList, res.data]);
//     toast.success("HOD created successfully");
//     navigate("admin/hod");
//   } catch (error) {
//     console.error("❌ Axios Error Response:", error.response?.data);
//     console.error("❌ Axios Full Error Object:", error);

//     toast.error("Failed to create HOD.");
//   }
//};

    const token = localStorage.getItem("token")




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

const[departmentlist,setdepartmentlist]=useState([])
useEffect(()=>{
    const fetchdepartment=async()=>{
        try {
            const response= await axios.get("http://127.0.0.1:8000/collegeapp/departments/",{
                headers:{
                    Authorization:`Token ${token}`,
                },
            })
            setdepartmentlist(response.data)
            
        } catch (error) {
            console.log(error);
            
            
        }
    }
    fetchdepartment()
},[])


  // 🔴 DELETE function
  const deleteDepartment = async (id) => {
    
    try {
      await axios.delete(`http://127.0.0.1:8000/collegeapp/departments/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setdepartmentlist((prevDepartments) =>
      prevDepartments.filter((dept) => dept.id !== id)
    );
      alert('deleted successfully');

     
      fetchDepartments();
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      
    }
  };



  const hod_create = async (username, email, phone, department, password) => {

    try {
      const response = await axios.post("http://127.0.0.1:8000/collegeapp/hods/", { username,email,phone,department,password},
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      console.log(response.data);
      toast.success('hod Registered Successfully')
    } catch (error) {
      console.error("Error creating school:", error.response?.data || error.message);
    }
    

  }


    return(
        <Authcontext.Provider value={{collegelogin,hodlist,hod_create,department_create,departmentlist,deleteDepartment}}>
            {
                children
            }
        </Authcontext.Provider>
    )
}



