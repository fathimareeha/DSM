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
  const [loading, setloading] = useState(false)




  //ADMIN LOGIN
  const handle_login = async (username, password) => {
    setloading(true)

    try {
      const response = await axios.post("http://127.0.0.1:8000/superadmin_app/login", { username, password })
      console.log(response);
      localStorage.setItem('token', response.data.token);
      toast.success('Login Successfull')
      navigate('/admin/dashboard')
    } catch (error) {
      console.error(error)
    }
    finally {
      setloading(false)
    }

  }
  //Staff create

  const staff_create = async (username, email, password1, password2,staff_role) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/superadmin_app/create_staff", { username, email, password1, password2 ,staff_role}, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      console.log(response)
      toast.success('Registered Successfully')
    } catch (error) {
      console.error(error)
    }
    finally {
      setloading(false)
    }
  }
  //staff list

  const [staffList,setStaffList]=useState([])

  useEffect(()=>{
    const fetchStaff=async()=>{
      try {
       const response= await axios.get('http://127.0.0.1:8000/superadmin_app/create_staff',{
      headers: {
            Authorization: `Token ${token}`,
          },
    })
    setStaffList(response.data)
        
      } catch (error) {
        console.error( error);
      }
    } 
 
  fetchStaff()
},[])

 const handleDeleteStaff = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/superadmin_app/del_up_re_staff/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // Remove staff from list
    setStaffList(prev => prev.filter(staff => staff.id !== id));
    alert('Staff deleted successfully');
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
  }
};



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
    finally {
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
    finally {
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
    finally {
      setloading(false)
    }

  }
  //institution_admin login
const handle_institution_login = async (username, password) => {
  setloading(true);
  try {
    const response = await axios.post("http://127.0.0.1:8000/superadmin_app/institution_login", {
      username,
      password
    });

    console.log("Login Response:", response);

    const token = response.data.token;
    const institutionType = response.data.institution_type; // ✅

    localStorage.setItem("token", token);
    localStorage.setItem("institution_type", institutionType); // ✅

    toast.success("Login Successful");

    navigate("/dashboard_loader");
  } catch (error) {
    console.error("Login error:", error.response?.data?.detail || error.message);
  } finally {
    setloading(false);
  }
};


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

  const [institutions_list, setInstitutions_list] = useState([]);
  useEffect(() => {
    const InstitutionsList = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/superadmin_app/list_institutions', {
          headers: {
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
  }, [])











  //create+packages

  const create_packages = async (institution_type,planPackage, plan_type, description,features, price) => {

    try {
      const numericPrice = parseFloat(price);
      const response = await axios.post('http://127.0.0.1:8000/superadmin_app/create_package', {institution_type, package: planPackage, plan_type, description,features, price:numericPrice },
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

  //institution count
  const [totalInstitutions, setTotalInstitutions] = useState(0);
  const [schoolCount, setSchoolCount] = useState(0);
  const [collegeCount, setCollegeCount] = useState(0);
  const [schoolActive, setSchoolActive] = useState(0);
  const [collegeActive, setCollegeActive] = useState(0);
  const [schoolInactive, setSchoolInactive] = useState(0);
  const [collegeInactive, setCollegeInactive] = useState(0);
  const [totalActive, setTotalActive] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalStaff,setTotalStaff]=useState(0)



  const fetchInstitutionCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/superadmin_app/institution_count', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const { total_institutions, total_schools, total_colleges, active_school_count, active_college_count, total_active_institution_count, inactive_college_count, inactive_school_count, total_amount,staff_count } = response.data;
      setTotalInstitutions(total_institutions);
      setSchoolCount(total_schools);
      setCollegeCount(total_colleges);
      setSchoolActive(active_school_count);
      setCollegeActive(active_college_count);
      setSchoolInactive(inactive_school_count);
      setCollegeInactive(inactive_college_count);
      setTotalActive(total_active_institution_count);
      setTotalAmount(total_amount);
      setTotalStaff(staff_count)


      console.log('Total Amount (from API):', total_amount);

    } catch (error) {
      console.error('Error fetching institution count:', error);
    }
  };



  //list active institution
  const [activeList, setActiveList] = useState([])
  useEffect(() => {
    const fetchActiveInstitutions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/superadmin_app/list_institutions?active=true', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log("Active institutions", response.data);
        setActiveList(response.data); // or your state variable
      } catch (error) {
        console.error("Error fetching active institutions:", error);
      }
    };

    fetchActiveInstitutions();
  }, []);



  return (
    <SuperadminContext.Provider value={{ handle_login, admin_create, school_create, college_create, handle_institution_login, handle_package, staff_create, create_packages,handleDeleteStaff,  activeList,staffList,  order_details, totalInstitutions, schoolCount, collegeCount, institution_id, schoolActive, collegeActive, schoolInactive, collegeInactive, totalActive, totalAmount, loading,totalStaff, fetchInstitutionCount }}>
      {
        children
      }
    </SuperadminContext.Provider>
  )
}