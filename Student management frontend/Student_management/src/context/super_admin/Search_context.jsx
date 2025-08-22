import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search_context=createContext()
export const Search_provider=({children})=>{
   const token = localStorage.getItem('token')
  const navigate = useNavigate()

  
 const institution_id= localStorage.getItem("institution_id") || '';



//✅SCHOOL LIST

 const [school_list,setSchool_list]=useState([])
 
 //  1. Add state to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  //  2. Add logic to filter school_list by school_name
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

  fetchSchoolList(); //  call it inside useEffect

}, [institution_id]);

//✅FETCH UNIVERSITY


const [universities, setUniversities] = useState([]);

useEffect(() => {
  const fetchUniversities = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/superadmin_app/university', {
        headers: { Authorization: `Token ${token}` },
      });
      setUniversities(res.data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };
  fetchUniversities();
}, [token]);


// ✅COLLEGE LIST

  const [college_list, setCollege_list] = useState([]);
 

  // Filter states
  const [searchBar, setSearchBar] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');

  // Fetch colleges
  useEffect(() => {
    const fetchCollegeList = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/superadmin_app/create_college/${institution_id}`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setCollege_list(response.data);
      } catch (error) {
        console.error('Error fetching college list:', error);
      }
    };
    if (institution_id) fetchCollegeList();
  }, [institution_id, token]);

 

  // Filter college list based on search, university, and district
  const filteredCollegeList = college_list.filter((college) => {
    const matchesName = college.college_name
      ?.toLowerCase()
      .includes(searchBar.toLowerCase());
    const matchesUniversity = selectedUniversity
      ? college.university === Number(selectedUniversity)
      : true;
    const matchesDistrict = districtFilter
      ? college.district?.toLowerCase().includes(districtFilter.toLowerCase())
      : true;

    return matchesName && matchesUniversity && matchesDistrict;
  });




//✅ALL INSTITUTION LIST

const [institutions_list,setInstitutions_list]=useState([]);

    // 1. Add state to store the search query
  const [searchInstitution, setSearchInstitution] = useState("");

      // 2. Add logic to filter school_list by school_name
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



  //✅INSTITUTION ADMIN LIST

  const [institution_adminList, setInstitution_adminList] = useState([]);

  // Filters
  const [searchAdminInstitution, setSearchAdminInstitution] = useState('');
  const [dstrctFilter, setDstrctFilter] = useState('');
  const [universityFilter, setUniversityFilter] = useState('');

  // Function to fetch institution admin list from backend
  const InstitutionAdminList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/superadmin_app/admin_list', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setInstitution_adminList(response.data);
    } catch (error) {
      console.error('Error fetching institution admin list:', error);
    }
  };

  // Fetch on mount or when token changes
  useEffect(() => {
    if (token) {
      InstitutionAdminList();
    }
  }, [token]);

  // Filter the list based on all filters
const filteredAdminInstitutionList =
  searchAdminInstitution.trim() || dstrctFilter.trim() || selectedUniversity
    ? institution_adminList.filter((institution) => {
        const name = (institution.school?.name || institution.college?.name || '').toLowerCase();
        const district = (institution.school?.district || institution.college?.district || '') || '';
        const districtNormalized = district.trim().toLowerCase();

        const universityId = institution.college?.university?.id || null;

        const matchesName = name.includes(searchAdminInstitution.trim().toLowerCase());
        const matchesDistrict = dstrctFilter
          ? districtNormalized.includes(dstrctFilter.trim().toLowerCase())
          : true;
        const matchesUniversity = selectedUniversity
          ? universityId === Number(selectedUniversity)
          : true;

        return matchesName && matchesDistrict && matchesUniversity;
      })
    : institution_adminList;



    return(
    <Search_context.Provider value={{school_list,setSearchQuery,filteredSchoolList,college_list,setSearchBar,filteredCollegeList,institutions_list,setSearchInstitution,filteredInstitutionList,InstitutionsList,institution_adminList,
     filteredAdminInstitutionList,setSearchAdminInstitution,    college_list,
        universities,
        searchBar,
        setSearchBar,
        selectedUniversity,
        setSelectedUniversity,
        districtFilter,
        setDistrictFilter,
        filteredCollegeList,
         institution_adminList,
        setInstitution_adminList,
        searchAdminInstitution,
        setSearchAdminInstitution,
        dstrctFilter,
        setDstrctFilter,
        universityFilter,
        setUniversityFilter,
        filteredAdminInstitutionList,
        InstitutionAdminList,
    }}>
      {children}
    </Search_context.Provider>
  )
}



