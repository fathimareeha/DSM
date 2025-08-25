// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// import { Route, Routes } from 'react-router-dom'
// import Dashboard from './pages/institution/Dashboard'
// import Layout from './layout/institution_admin/Layout'
// import Login from './pages/institution/Login'
// import AddHod from './pages/institution/AddHod'
// import Statistics from './components/dashboard/Statistics'
// import ManageHod from './pages/institution/ManageHod'
// import Reports from './pages/institution/Reports'
// import AddStudent from './pages/institution/AddStudent'
// import AddCourse from './pages/institution/AddCourse'
// import CreateCircular from './pages/institution/CreateCircular'
// import AddEvent from './pages/institution/AddEvent'
// import Students from './pages/institution/Students'
// import ViewCourses from './pages/institution/ViewCourses'
// import Users from './pages/institution/Users'
// import AddDepartment from './pages/institution/AddDepartment'
// import ViewDepartments from './pages/institution/ViewDepartments'
// import ViewFaculty from './pages/institution/ViewFaculty'
// import SubjectAllocation from './pages/institution/SubjectAllocation'
// import AttendancePage from './pages/institution/AttendancePage'
// import FacultyMarksEntry from './pages/institution/FacultyMarksEntry'
// import ExamPage from './pages/institution/ExamPage'
// import AddFaculty from './pages/institution/AddFaculty'
// import { Authprovider } from './context/institution/Authcontext'
// import EditDepartment from './pages/institution/EditDepartment'
// import DeleteDepartment from './pages/institution/DeleteDepartment'




// function App() {
 

//   return (
//     <>
//             <Authprovider>

//       <Routes>
//                   <Route path='/login' element={<Login/>}></Route>

//         <Route path='/admin'  element={<Layout/>}>
//         <Route path='dash' element={<Dashboard/>}></Route>
//         <Route path="hod" element={<ManageHod/>} />  {/* ✅ ADD THIS */}
//         <Route path="departments/add" element={<AddDepartment/>} />
//         <Route path="edit-department/:id" element={<EditDepartment />} />
//         <Route path="delete-department/:id" element={<DeleteDepartment />} />
        
        
//         <Route path='hod/add' element={<AddHod/>}/>
//         <Route path="department" element={<ViewDepartments/>} />
//         <Route path="faculty/add" element={<AddFaculty />} />
//         <Route path="students" element={<Students/>} />
//         <Route path="students/add" element={<AddStudent/>} />
        

//                 </Route>
//                    </Routes>
//                            </Authprovider>

// <Routes>

//         <Route path="/reports" element={<Reports/>} />
       
//         <Route path="/addcourse" element={<AddCourse/>} />
//         <Route path="circulars/create" element={<CreateCircular/>} />
//         <Route path="/events/create" element={<AddEvent/>} />
        
        
//         <Route path="/courses" element={<ViewCourses/>} />
//         <Route path="/users" element={<Users/>} />
//         <Route path="departments" element={<ViewDepartments/>} />
        
//         <Route path="/faculty" element={<ViewFaculty />} />
//         <Route path="/academic/subjects" element={<SubjectAllocation />} />
//         <Route path="/academic/marks" element={<FacultyMarksEntry />} />
//         <Route path="/academic/attendance" element={<AttendancePage />} />
//         {/* <Route path="/coordinators/exams" element={<ExamPage/>} /> */}
//         <Route path="/faculty/add" element={<AddFaculty />} />


// </Routes>



        
        
   
//     </>
//   )
// }

// export default App



import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/institution/Dashboard'
import Layout from './layout/institution_admin/Layout'
import Login from './pages/institution/Login'
import AddHod from './pages/institution/AddHod'
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
import AddFaculty from './pages/institution/AddFaculty'
import { Authprovider } from './context/institution/Authcontext'
import EditDepartment from './pages/institution/EditDepartment'
import DeleteDepartment from './pages/institution/DeleteDepartment'
import EditHod from './pages/institution/EditHod'
import EditFaculty from './pages/institution/EditFaculty'
import Editstudent from './pages/institution/Editstudent'
import AddStaff from './pages/institution/AddStaff'
import StaffList from './pages/institution/StaffList'
import AddBook from './pages/institution/AddBook'
import BookList from './pages/institution/BookList'
import AddHostel from './pages/institution/AddHostel'
import HostelList from './pages/institution/HostelList'
import AssignHostel from './pages/institution/Assignhostel'
import AddBus from './pages/institution/AddBus'
import BusList from './pages/institution/BusList'
import BusStopList from './pages/institution/BusStopList'
import StudentBus from './pages/institution/StudentBus'
import AddStudentBusAllocation from './pages/institution/AddBusStusents'
import { ToastContainer } from "react-toastify";
import Layouthod from './layout/Hod/Layouthod'
import Loginmembers from './pages/institution/Loginmembers'
import Hoddashboard from './pages/institution/Hoddashboard'

function App() {
  return (
    <Authprovider>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick
        rtl={false} 
        pauseOnFocusLoss
        draggable 
        pauseOnHover
      />
      <Routes>
        {/* Public route */}
        
       
        
        <Route path='/login' element={<Login />} />

        {/* Admin protected layout */}
        <Route path='/admin' element={<Layout />}>
          <Route path='dash' element={<Dashboard />} />

          <Route path='hods/add' element={<AddHod />} />
          <Route path='hod' element={<ManageHod />} />
          <Route path="edithod/:id" element={<EditHod />} />

          <Route path='faculty/add' element={<AddFaculty />} />
          <Route path='facultys' element={<ViewFaculty />} />
          <Route path="editfaculty/:id" element={<EditFaculty />} />

          <Route path='hostel/add' element={<AddHostel/>}/>
          <Route path='hostel/list' element={<HostelList/>}/>
          <Route path="/admin/assign-hostel/:studentId" element={<AssignHostel />} />



          <Route path='students' element={<Students />} />
          <Route path='studentss/add' element={<AddStudent />} />
          <Route path='editstudent/:id' element={<Editstudent/>}/>

          <Route path='staffs/add' element={<AddStaff/>}></Route>
          <Route path='staffs/list' element={<StaffList/>}/>


          <Route path='books/add' element={<AddBook/>}/>
          <Route path='books/list' element={<BookList/>}/>


          <Route path='bus/add' element={<AddBus/>}/>
          <Route path='bus/list' element={<BusList/>}/>
          <Route path='bus/stop/list' element={<BusStopList/>}/>
          <Route path='bus/student/stop/list' element={<StudentBus/>}/>
          <Route path='bus/student/stop/add' element={<AddStudentBusAllocation/>}/>
          <Route path='events/create' element={<AddEvent />} />


          <Route path='addcourse' element={<AddCourse />} />



          
          <Route path='courses' element={<ViewCourses />} />
          <Route path='users' element={<Users />} />
          <Route path='addcourse' element={<AddCourse />} />
          <Route path='circulars/create' element={<CreateCircular />} />
          <Route path='events/create' element={<AddEvent />} />
          <Route path='academic/subjects' element={<SubjectAllocation />} />
          <Route path='academic/marks' element={<FacultyMarksEntry />} />
          <Route path='academic/attendance' element={<AttendancePage />} />
          <Route path='reports' element={<Reports />} />
          <Route path='departments/add' element={<AddDepartment />} />
          <Route path='department' element={<ViewDepartments />} />
           <Route path='edit-department/:id' element={<EditDepartment />} />
          <Route path='delete-department/:id' element={<DeleteDepartment />} />
        </Route>

        <Route path='login/members' element={<Loginmembers/>}></Route>

        <Route path='/hod' element={<Layouthod/>}>
        <Route path='dash' element={<Hoddashboard/>}/>
          

        </Route>




      </Routes>
    </Authprovider>
  )
}

export default App
