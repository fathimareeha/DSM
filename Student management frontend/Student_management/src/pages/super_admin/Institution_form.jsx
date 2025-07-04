import React, { useState } from 'react'
import SchoolForm from '../../components/super_admin/forms/SchoolForm'
import CollegeForm from '../../components/super_admin/forms/CollegeForm'

function Institution_form() {
    const [type,setType]=useState('')
    console.log(type);


    

  return (
    <div>

    <div>

            <div className="flex gap-4">
              <label className="flex items-center gap-1 font-bold ">
                <input
                  type="radio"
                  name="type"
                  value="School"
                  className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300"
                  onChange={(e) => setType(e.target.value)}
                />

                School
              </label>
              <label className="flex items-center gap-1 font-bold">
                <input
                  type="radio"
                  name="type"
                  value="College"
                  className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300"
                  onChange={(e) => setType(e.target.value)}
                />
                College
              </label>
            </div>
          </div>
          {type=='School'?<SchoolForm/>: <CollegeForm/>}

          
         

    </div>
  )
}

export default Institution_form