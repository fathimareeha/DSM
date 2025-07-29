import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/super_admin/table/table';
import Breadcrumbs from '../../components/super_admin/Breadcrumbs';
import { Search_context } from '../../context/super_admin/Search_context';

function Institutions() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/admin/admin_form');
  };
  const { searchInstitution, setSearchInstitution } = useContext(Search_context);
  
     const handleSearchClick = (e) => {
      e.preventDefault(); // Prevent page reload
      setSearchInstitution(searchInstitution); // Already updating value, but this can trigger filtering if needed
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
        value={searchInstitution}
        onChange={(e)=>setSearchInstitution(e.target.value)}
        placeholder="Search..." class="w-full px-4 py-3 rounded focus:outline-none focus:ring-2 bg-gray-100 focus:ring-blue-500"/>
        <button className='bg-blue-900 py-3 px-6 text-white rounded' onClick={(e)=>handleSearchClick}>Search</button>
      </div>
      
        <Table />
      </div>
    </div>
  );
}

export default Institutions;
