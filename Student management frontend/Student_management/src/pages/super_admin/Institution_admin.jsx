import React, { useContext } from 'react'

import Breadcrumbs from '../../components/super_admin/Breadcrumbs'
import Table3 from '../../components/super_admin/table/Table3'
import { Search_context } from '../../context/super_admin/Search_context'
import { useNavigate } from 'react-router-dom';



function Institution_admin() {
  const navigate = useNavigate();
  const {searchAdminInstitution, setSearchAdminInstitution}=useContext(Search_context)

  const handleSearchClick = (e) => {
      e.preventDefault(); // Prevent page reload
      setSearchAdminInstitution(searchAdminInstitution); // Already updating value, but this can trigger filtering if needed
    };

  const handleAddClick = () => {
    navigate('/admin/admin_form');
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <Breadcrumbs/>
        <button
          className='bg-blue-900 rounded-lg py-2 px-5 text-white text-2xl'
          onClick={handleAddClick}
        >
          + Institutions
        </button>
       
      </div>
        <div className='mt-3 bg-white p-6 space-y-6 rounded'>
        <h1 className='text-2xl'>All institutions</h1>
        <div class="flex ">
        <input type="text"
        value={searchAdminInstitution}
        onChange={(e)=>setSearchAdminInstitution(e.target.value)} 
        placeholder="Search..." class="w-full px-4 py-3 rounded focus:outline-none focus:ring-2 bg-gray-100 focus:ring-blue-500"/>
        <button className='bg-blue-900 py-3 px-6 text-white rounded' onClick={(e)=>handleSearchClick}>Search</button>
      </div>
        <Table3/>
      </div>
    </div>
  )
}

export default Institution_admin