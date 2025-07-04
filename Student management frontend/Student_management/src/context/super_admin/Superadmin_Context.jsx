import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export const SuperadminContext = createContext()
export const SuperadminProvider = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [institution_id, setinstitution_Id] = useState(() => {
  return localStorage.getItem("institution_id") || '';
});
const [loading,setloading]=useState(false)




  //ADMIN LOGIN
  const handle_login = async (username, password) => {
    setloading(true)

    try {
      const response = await axios.post("http://127.0.0.1:8000/superadmin_app/token/", { username, password })
      console.log(response);
      localStorage.setItem('token', response.data.token);
      toast.success('Login Successfull')
      navigate('/admin/dashboard')
    } catch (error) {
      console.error(error)
    }
    finally{
      setloading(false)
    }

  }
  //Staff create

  const staff_create =async (username,email,password1,password2)=>{
    try {
      const response=await axios.post("http://127.0.0.1:8000/superadmin_app/create_staff",{username,email,password1,password2},{
        headers:{
          Authorization: `Token ${token}`
        }
      })
      console.log(response)
      toast.success('Registered Successfully')
    } catch (error) {
      console.error(error)
    }
    finally{
      setloading(false)
    }
  }

  //Institution admin create
  const admin_create = async (username, email, password1, password2) => {
    


    try {
      const response = await axios.post("http://127.0.0.1:8000/superadmin_app/create_user/", { username, email, password1, password2 }, {
        headers: {
          Authorization: `Token ${token}`
        }

      })
      const institutionId = response.data.institution_id;

      setinstitution_Id(institutionId);  //  store in state
      localStorage.setItem("institution_id", institutionId);
      console.log("Institution ID:", institutionId);  //  now safe to log

      toast.success('Registered Successfully')
      navigate('/admin/institution_form')

      console.log(response);



    } catch (error) {
      console.error(error)
    }
    finally{
      setloading(false)
    }

  };

  console.log('student id', institution_id);


  //create school

  const school_create = async (
    institutionId,
    school_name,
    address1,
    address2,
    city,
    state,
    pin_code,
    udise_code,
    location,
    phone_number,
    landline_number,
    school_type,
    board
  ) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/superadmin_app/create_school/${institutionId}`,
        {
          school_name,
          address1,
          address2,
          city,
          state,
          pin_code,
          udise_code,
          location,
          phone_number,
          landline_number,
          school_type,
          board,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success('School Created Successfully')
      console.log(response.data);
    } catch (error) {
      console.error("Error creating school:", error.response?.data || error.message);
    }
    finally{
      setloading(false)
    }
  };
    //College create
  const college_create = async (institutionId, college_name, address1, address2, city, state, pin_code, aishe_code, location, phone_number, landline_number, college_type, university) => {

    try {
      const response = await axios.post(`http://127.0.0.1:8000/superadmin_app/create_college/${institutionId}`, { college_name, address1, address2, city, state, pin_code, aishe_code, location, phone_number, landline_number, college_type, university },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      console.log(response.data);
      toast.success('College Registered Successfully')
    } catch (error) {
      console.error("Error creating school:", error.response?.data || error.message);
    }
    finally{
      setloading(false)
    }

  }
  //institution_admin login
  const handle_institution_login = async (username, password) => {
setloading(true)
    try {
      const response = await axios.post("http://127.0.0.1:8000/superadmin_app/institution_login", { username, password })
      console.log(response);
      const token = response.data.token;
      localStorage.setItem('token', token);

      toast.success('Login Successfull')
      navigate('/dashboard_loader')
    } catch (error) {
      console.error(error)
    }
    finally{
      setloading(false)
    }

  }

  //Checkout
  const [order_details, setOrder_details] = useState('');

const handle_package = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/superadmin_app/checkout/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // ✅ Add package_id manually into the response data
    setOrder_details({
      ...response.data,
      package_id: id,
    });

    console.log({
      ...response.data,
      package_id: id,
    });

    navigate('/Checkout');  // Proceed to RazorpayPayment page
  } catch (error) {
    console.log(error);
  }
};
//all institution list

const [institutions_list,setInstitutions_list]=useState([]);
 useEffect(()=>{
  const InstitutionsList=async()=>{
    try {
      const response =await axios.get('http://127.0.0.1:8000/superadmin_app/list_institutions',{
        headers:{
          Authorization: `Token ${token}`
        }
      })
      console.log(response.data);
      setInstitutions_list(response.data)
      
      
    } catch (error) {
      console.log(error)
    }
  }
  InstitutionsList()
 },[])

 //institution_admin list

 const[institution_adminList,setInstitution_adminList]=useState([])
 
  const InstitutionAdminList=async()=>{
    try {
      const response=await axios.get('http://127.0.0.1:8000/superadmin_app/create_user/',{
        headers:{
          Authorization:`Token ${token}`
        }
      })
      setInstitution_adminList(response.data)
    } catch (error) {
      console.log(error)
    }
  }
 
 



 

//School list
 const [school_list,setSchool_list]=useState([])
 
 

  useEffect(() => {

  const fetchSchoolList = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/superadmin_app/create_school/${institution_id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      
      setSchool_list(response.data);
    } catch (error) {
      console.error("Error fetching school list:", error);
    }
  };

  fetchSchoolList(); // ✅ call it inside useEffect

}, [institution_id]);

//college_list

 const [college_list,setCollege_list]=useState([])
 
 

  useEffect(() => {

  const fetchCollegeList = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/superadmin_app/create_college/${institution_id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("College list:", response.data);
      setCollege_list(response.data);
    } catch (error) {
      console.error("Error fetching college list:", error);
    }
  };

  fetchCollegeList(); // ✅ call it inside useEffect

}, [institution_id]);

//create+packages

  const create_packages = async (planPackage,plan_type,description,price)=>{

  try {
        const response=await axios.post('http://127.0.0.1:8000/superadmin_app/create_package',{package: planPackage,plan_type,description,price},
          {
            headers:
            {
             Authorization: `Token ${token}`
            }
          }
        )
        navigate('/admin/list_package')
        console.log(response);
        
  } catch (error) {
    console.log(error);
    
  }
  }
  return (
    <SuperadminContext.Provider value={{ handle_login, admin_create, school_create,college_create,handle_institution_login,handle_package,staff_create,create_packages,InstitutionAdminList,institution_adminList,school_list,college_list,institutions_list, order_details,institution_id ,loading}}>
      {
        children
      }
    </SuperadminContext.Provider>
  )
}