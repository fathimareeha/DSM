import React from 'react'
import StaffTable from '../../components/super_admin/table/StaffTable'

import { useNavigate } from 'react-router-dom'

function Staff() {
    const navigate=useNavigate()
    const handleAddClick=()=>{
          navigate('/admin/create_staff')
      }
  return (
    <div>
        <div className='flex justify-end'><button className=' py-2 px-4 shadow ' onClick={handleAddClick}>+ Staff</button></div>
       <div className='mt-4'><StaffTable/></div> </div>
  )
}

export default Staff