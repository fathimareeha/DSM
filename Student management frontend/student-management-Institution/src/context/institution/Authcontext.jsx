// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export const Authcontext = createContext()

// export const Authprovider = ({children})=>{
//     const navigate=useNavigate()

//     const [collegeid,setcollegeid] = useState("");
//     const [loading,setloading] = useState(false)

//     const collegelogin = async (username, password) => {
//   try {
//     const res = await axios.post("http://127.0.0.1:8000/superadmin_app/institution_login", {
//       username,
//       password,
//     });

//     console.log("Login response:", res);
//     const user = res?.data?.user;
//     const token = res.data?.token;
//     // const institution_id = res.data?.user?.institution_id;

//     if (user?.institution_id && token) {
//       localStorage.setItem("token", token);
//       // setcollegeid(institution_id);
//       navigate("admin/dash");
//     } else {
//       toast.error("Login failed: Missing token or institution ID",res.data);
//     }
//   } catch (error) {
//     console.error("login failed",error);
    
//     // console.error("Login error:", error);
//     // if (error.response?.data) {
//     //   const err = error.response.data;
//     //   if (err.username) toast.error(err.username[0]);
//     //   if (err.password) toast.error(err.password[0]);
//     //   else toast.error("Login failed. Please check your credentials.");
//     // } else {
//     //   toast.error("Network or server error. Try again.");
//     // }
//   }
// };


// // create login

//   //   const collegelogin = async (username, password) => {
//   // try {
//   //   const res = await axios.post("http://127.0.0.1:8000/superadmin_app/institution_login", {
//   //     username,
//   //     password,
//   //   });

//   //   console.log("res.data =", res.data); // 🔍 See the actual response here
//   //   localStorage.setItem('token', res.data.token);
//   //   navigate('admin/dash')

//     // use correct path based on res.data
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // const collegelogin = async (username, password) => {
  
// //   try {
// //     const response = await axios.post("http://127.0.0.1:8000/superadmin_app/institution_login", {
// //       username,
// //       password
// //     });

// //     console.log("Login Response:", response);

// //     const token = response.data.token;
// //     const institutionType = response.data.institution_type; // ✅

// //     localStorage.setItem("token", token);
// //     localStorage.setItem("institution_type", institutionType); // ✅

// //     toast.success("Login Successful");

// //     navigate("/admin/dash");
// //   } catch (error) {
// //     console.error("Login error:", error.response?.data?.detail || error.message);
// //   } 
// // };


// // create hod

 
    
// //     const department_create = async (name) => {
// //   const token = localStorage.getItem("token"); // fetch inside function to ensure it's up to date

// //   try {
// //     const res = await axios.post(
// //       "http://127.0.0.1:8000/collegeapp/departments/",
// //       { name},
// //       {
// //         headers: {
// //           Authorization: `Token ${token}`,
// //         },
       
            
// //       }
           

// //     );
// //     console.log(res.data);
// //     setdepartmentlist((prevList) => [...prevList, res.data]);
// //     toast.success("Department created successfully");
// //     navigate("admin/department")
// //   } catch (error) {
// //     console.error(error);
// //     toast.error("Failed to create department.");
// //   }
// // };




//       // Create new HOD
// //   const hod_create = async (username, email, password, department, phone, college) => {
// //     const token = localStorage.getItem("token");
// //     try {
// //       const res = await axios.post(
// //         "http://127.0.0.1:8000/collegeapp/hods/",
// //         { username, email, password, department, phone, college },
// //         {
// //           headers: {
// //             Authorization: `Token ${token}`,
// //           },
// //         }
// //       );

// //       console.log(res.data);
// //       sethodlist((prevList) => [...prevList, res.data]);
// //       toast.success("HOD created successfully");
// //       navigate("admin/hod");
// //     } catch (error) {
// //         console.log(error);
        
// //       console.error("Error creating HOD:", error.response?.data || error.message);
// //       toast.error("Failed to create HOD.");
// //     }
// //   };

// // const hod_create = async (username, email, password, department, phone) => {
//   // const token = localStorage.getItem("token");

// //   // Log the data being sent
// //   console.log("📤 Sending HOD data:", {
// //     username,
// //     email,
// //     password,
// //     department,
// //     phone,
    
// //   });

// //   try {
// //     const res = await axios.post(
// //       "http://127.0.0.1:8000/collegeapp/hods/",
// //       { username, email, password, department, phone },
// //       {
// //         headers: {
// //           Authorization: `Token ${token}`,
// //         },
// //       }
// //     );

// //     console.log("✅ Response:", res.data);
// //     sethodlist((prevList) => [...prevList, res.data]);
// //     toast.success("HOD created successfully");
// //     navigate("admin/hod");
// //   } catch (error) {
// //     console.error("❌ Axios Error Response:", error.response?.data);
// //     console.error("❌ Axios Full Error Object:", error);

// //     toast.error("Failed to create HOD.");
// //   }
// // };

//     const token = localStorage.getItem("token")




// // const[hodlist,sethodlist]=useState([])
// // useEffect(()=>{
// //     const fetchhod=async()=>{
// //         try {
// //             const response = await axios.get("http://127.0.0.1:8000/collegeapp/hods/",{
// //                 headers:{
// //                     Authorization:`Token ${token}`,
// //                 },
// //             })
// //             sethodlist(response.data)
            
// //         } catch (error) {
// //             console.log(error);
            
            
// //         }
// //     }
// //     fetchhod()
// // },[])

// // faculty create
// const[facultylist,setfacultylist]=useState([])
// useEffect(()=>{
//   const fetchfaculty=async()=>{
//     try {
//       const response = await axios.get("",{
//         headers:{
//           Authorization:`Token ${token}`,
//         }
//       })
//       setfacultylist(response.data)
      
//     } catch (error) {
//       console.log(error);
      
      
//     }
//   }
//   fetchfaculty()

// },[])

// // const[departmentlist,setdepartmentlist]=useState([])
// // useEffect(()=>{
// //     const fetchdepartment=async()=>{
// //         try {
// //             const response= await axios.get("http://127.0.0.1:8000/collegeapp/departments/",{
// //                 headers:{
// //                     Authorization:`Token ${token}`,
// //                 },
// //             })
// //             setdepartmentlist(response.data)
            
// //         } catch (error) {
// //             console.log(error);
            
            
// //         }
// //     }
// //     fetchdepartment()
// // },[])


// //   // 🔴 DELETE function
// //   const deleteDepartment = async (id) => {
    
// //     try {
// //       await axios.delete(`http://127.0.0.1:8000/collegeapp/departments/${id}/`, {
// //         headers: {
// //           Authorization: `Token ${token}`,
// //         },
// //       });
// //       setdepartmentlist((prevDepartments) =>
// //       prevDepartments.filter((dept) => dept.id !== id)
// //     );
// //       alert('deleted successfully');

     
// //       fetchDepartments();
// //     } catch (error) {
// //       console.error("Delete error:", error.response?.data || error.message);
      
// //     }
// //   };



// //   const hod_create = async (username, email, password, department, phone) => {
// //   const token = localStorage.getItem("token");

// //   try {
// //     const response = await axios.post(
// //       "http://127.0.0.1:8000/collegeapp/hods/",
// //       {
// //         username,
// //         email,
// //         password,
// //         phone,
// //         department:selecteddepartments,
// //         college: collegeid  // ✅ Add this line
// //       },
// //       {
// //         headers: {
// //           Authorization: `Token ${token}`
// //         }
// //       }
// //     );

// //     console.log(response.data);

// //     toast.success('HOD Registered Successfully');
// //   } catch (error) {
// //     console.error("Error creating HOD:", error.response?.data || error.message);
// //     toast.error("Failed to create HOD.");
// //   }
// // };



//     return(
//         <Authcontext.Provider value={{collegelogin,collegeid,facultylist}}>
//             {
//                 children
//             }
//         </Authcontext.Provider>
//     )
// }


import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




export const Authcontext = createContext();

export const Authprovider = ({ children }) => {
  const navigate = useNavigate();

  const [collegeid, setcollegeid] = useState("");
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  ); // ✅ Keep logged-in user

  const collegelogin = async (username, password) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/superadmin_app/institution_login",
        {
          username,
          password,
        }
      );

      console.log("Login response:", res.data);
      const user = res?.data?.user;
      const token = res?.data?.token;

      if (user?.institution_id && token) {
        // ✅ Save both token and user
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        // setcollegeid(user.institution_id);

        toast.success("Login successful!");
        navigate("admin/dash");
      } else {
        toast.error("Login failed: Missing token or institution ID");
      }
    } catch (error) {
      console.error("login failed", error);
      toast.error("Invalid username or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <Authcontext.Provider
      value={{ collegelogin, collegeid, user, token, logout }}
    >
      {children}
    </Authcontext.Provider>
  );
};

