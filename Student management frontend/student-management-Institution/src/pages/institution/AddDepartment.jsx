import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';
import { Authcontext } from '../../context/institution/Authcontext';
import { Loader } from 'lucide-react';


function AddDepartment() {
  const {department_create} = useContext(Authcontext)
  const [name,setname] = useState("")
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    {/* <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2> */}

    <div className="space-y-4">
      <Inputfield label={'name'} onchange={(e)=>setname(e.target.value)} />
      
      <Button label={'Add Department'} onclick={()=>department_create(name)} />
    </div>
  </div>
</div>

  )
}


//   const [name, setname] = useState('');
//   // const [college, setcollege] = useState(1);
  
//   const {department_create,loading,college}=useContext(Authcontext)

//   const handle_submit=(e)=>{
//   department_create(name,college)
//     e.preventDefault()
//   }
 

  
  
//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md">
//       <h2 className="text-xl font-bold text-indigo-700 mb-6">Add New Department</h2>
//       <form onSubmit={handle_submit} className="space-y-4">
        
//         <Inputfield
//           label="Department Name"
//           name="name"
//           placeholder="name"
          
//           onChange={(e)=>setname(e.target.value)} required={true}
//         />

        

//         <div className="flex gap-4">
                    
//           <Button label="Add Department" />
//           <button
//             type="submit"
            
//             className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
//           >
//             {loading?<Loader/>:'submit'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

export default AddDepartment;
