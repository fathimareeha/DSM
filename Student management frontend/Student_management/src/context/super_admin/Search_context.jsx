import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search_context=createContext()
export const Search_provider=({children})=>{
   const token = localStorage.getItem('token')
  const navigate = useNavigate()

  
 const institution_id= localStorage.getItem("institution_id") || '';



  //School list
 const [school_list,setSchool_list]=useState([])
 
 // ✅ 1. Add state to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ 2. Add logic to filter school_list by school_name
  const filteredSchoolList = school_list.filter((school) =>
  school.school_name?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
);



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
 
 // ✅ 1. Add state to store the search query
  const [searchBar, setSearchBar] = useState("");

  // ✅ 2. Add logic to filter school_list by school_name
  const filteredCollegeList = college_list.filter((college) =>
  college.college_name?.toLowerCase().includes(searchBar?.toLowerCase() || '')
);
 

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



//all institution list

const [institutions_list,setInstitutions_list]=useState([]);

    // ✅ 1. Add state to store the search query
  const [searchInstitution, setSearchInstitution] = useState("");

      // ✅ 2. Add logic to filter school_list by school_name
  const filteredInstitutionList = institutions_list.filter((institution) =>
  institution.name?.toLowerCase().includes(searchInstitution?.toLowerCase() || '')
);

 

  const InstitutionsList=async()=>{
    try {
      const response =await axios.get('http://127.0.0.1:8000/superadmin_app/list_institutions',{
        headers:{
          Authorization: `Token ${token}`
        }
      })
      console.log('data', response.data);
      setInstitutions_list(response.data)
      
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
  InstitutionsList()

  },[])

 console.log("list",institutions_list);

  //institution_admin list

  const [institution_adminList, setInstitution_adminList] = useState([])
  const [searchAdminInstitution, setSearchAdminInstitution] = useState("");

  const filteredAdminInstitutionList = searchAdminInstitution.trim()
  ? institution_adminList.filter((institution) => {
      const name =
        institution.school?.name ||
        institution.college?.name ||
        "";

      return name.toLowerCase().includes(searchAdminInstitution.trim().toLowerCase());
    })
  : institution_adminList;



console.log("filtered list", filteredAdminInstitutionList);

  const InstitutionAdminList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/superadmin_app/admin_list', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      console.log("Admin List:", response.data);
      setInstitution_adminList(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
  InstitutionAdminList()

  },[])


  return(
    <Search_context.Provider value={{school_list,setSearchQuery,filteredSchoolList,college_list,setSearchBar,filteredCollegeList,institutions_list,setSearchInstitution,filteredInstitutionList,InstitutionsList,institution_adminList,
     filteredAdminInstitutionList, InstitutionAdminList,setSearchAdminInstitution
    }}>
      {children}
    </Search_context.Provider>
  )
}



