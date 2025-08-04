import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/institution/Dashboard'
import Layout from './layout/institution_admin/Layout'
import Login from './pages/institution/Login'
import AddHod from './pages/institution/AddHod'
import Statistics from './components/dashboard/Statistics'
import ManageHod from './pages/institution/ManageHod'
import Reports from './pages/institution/Reports'
import AddStudent from './pages/institution/AddStudent'
import AddCourse from './pages/institution/AddCourse'
import CreateCircular from './pages/institution/CreateCircular'
import AddEvent from './pages/institution/AddEvent'
import Students from './pages/institution/Students'
import ViewCourses from './pages/institution/ViewCourses'
import Users from './pages/institution/Users'
import AddDepartment from './pages/institution/AddDepartment'
import ViewDepartments from './pages/institution/ViewDepartments'
import ViewFaculty from './pages/institution/ViewFaculty'
import SubjectAllocation from './pages/institution/SubjectAllocation'
import AttendancePage from './pages/institution/AttendancePage'
import FacultyMarksEntry from './pages/institution/FacultyMarksEntry'
import ExamPage from './pages/institution/ExamPage'
import AddFaculty from './pages/institution/AddFaculty'
import { Authprovider } from './context/institution/Authcontext'




function App() {
 

  return (
    <>
            <Authprovider>

      <Routes>
                  <Route path='/login' element={<Login/>}></Route>

        <Route path='/admin'  element={<Layout/>}>
        <Route path='dash' element={<Dashboard/>}></Route>
        <Route path="hod" element={<ManageHod/>} />  {/* ✅ ADD THIS */}
        <Route path="departments/add" element={<AddDepartment/>} />
        <Route path='hod/add' element={<AddHod/>}/>
        <Route path="department" element={<ViewDepartments/>} />
        <Route path="faculty/add" element={<AddFaculty />} />
        <Route path="students" element={<Students/>} />
        <Route path="students/add" element={<AddStudent/>} />
        

                </Route>
                   </Routes>
                           </Authprovider>

<Routes>

        <Route path="/reports" element={<Reports/>} />
       
        <Route path="/addcourse" element={<AddCourse/>} />
        <Route path="circulars/create" element={<CreateCircular/>} />
        <Route path="/events/create" element={<AddEvent/>} />
        
        
        <Route path="/courses" element={<ViewCourses/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="departments" element={<ViewDepartments/>} />
        
        <Route path="/faculty" element={<ViewFaculty />} />
        <Route path="/academic/subjects" element={<SubjectAllocation />} />
        <Route path="/academic/marks" element={<FacultyMarksEntry />} />
        <Route path="/academic/attendance" element={<AttendancePage />} />
        {/* <Route path="/coordinators/exams" element={<ExamPage/>} /> */}
        <Route path="/faculty/add" element={<AddFaculty />} />


</Routes>



        
        
   
    </>
  )
}

export default App
