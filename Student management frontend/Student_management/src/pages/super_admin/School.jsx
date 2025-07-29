import React, { useContext } from 'react'
import Table1 from '../../components/super_admin/table/Table1'
import Breadcrumbs from '../../components/super_admin/Breadcrumbs'
import { Search_context } from '../../context/super_admin/Search_context';

function School() {
  const { searchQuery, setSearchQuery } = useContext(Search_context);

   const handleSearchClick = (e) => {
    e.preventDefault(); // Prevent page reload
    setSearchQuery(searchQuery); // Already updating value, but this can trigger filtering if needed
  };
  return (
    <div>
      <Breadcrumbs/>
        <div className='mt-3 bg-white p-6 space-y-6 rounded'>
        <h1 className='text-2xl'>Schools</h1>
        <div class="flex ">
        <input type="text"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         placeholder="Search..." class="w-full px-4 py-3 rounded focus:outline-none focus:ring-2 bg-gray-100 focus:ring-blue-500"/>
        <button className='bg-blue-900 py-3 px-6 text-white rounded'  onClick={() => handleSearchClick}>Search</button>
      </div>
        <Table1/>
      </div>
    </div>
  )
}

export default School