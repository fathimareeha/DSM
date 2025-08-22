import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/schooladmin/Layout'
import Dashboard from './pages/schooladmin/Dashboard'
import Login from './pages/schooladmin/Login'
import { ToastContainer } from "react-toastify";
import VicePrincipalList from './pages/schooladmin/Viceprincipallist'
import AddTeachers from './pages/schooladmin/Addteachers'
import EditTeachers from './pages/schooladmin/EditTeachers'
import CreateClass from './pages/schooladmin/Createclasses'
import EditVicePrincipal from './pages/schooladmin/EditVicePrincipal'
// import { AuthProvider, Authprovider } from './context/institution/Authcontext'
import TeachersList from './pages/schooladmin/Teacherslist'
import StudentList from './pages/schooladmin/StudentsList'
import AddVicePrincipal from './pages/schooladmin/Addviceprincipal'
import StandardsList from './pages/schooladmin/StandardsList'
import { AuthProvider } from './context/institution/Authcontext'
import SubjectList from './pages/schooladmin/Subjectslist'
import CreateSubject from './pages/schooladmin/SubjectCreate'
import BookCreateForm from './pages/schooladmin/Library/BookCreate'
import BookList from './pages/schooladmin/Library/ListBook'
import StudentCreate from './pages/schooladmin/Addstudents'
import StudentEdit from './pages/schooladmin/EditStudents'
import StaffCreateForm from './pages/schooladmin/Staffs/AddStaffs'
import StaffList from './pages/schooladmin/Staffs/StaffsList'
import AddBusForm from './pages/schooladmin/Transport/AddBus'
import BusList from './pages/schooladmin/Transport/BusList'
import AddHostel from './pages/schooladmin/Hostel/AddHostel'
import HostelList from './pages/schooladmin/Hostel/HostelList'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <AuthProvider>
    <Routes>

      <Route path='login' element={<Login/>}/>
      <Route path='/admin' element={<Layout/>}>
      <Route path='dashboard' element={<Dashboard/>}/>


    {/* VICEPRINCIPAL */}

      <Route path='add/viceprincipal' element={<AddVicePrincipal/>}/>
      <Route path='list/viceprincipal' element={<VicePrincipalList/>}/>
      <Route path='edit/viceprincipal/:id' element={<EditVicePrincipal/>}/>

    {/* {TEACHERS} */}

      <Route path='add/teachers' element={<AddTeachers/>}/>
      <Route path='list/teachers' element={<TeachersList/>}/>
      <Route path='edit/teacher/:id' element={<EditTeachers/>} />


    {/* {STUDENTS} */}
      <Route path='add/students' element={<StudentCreate/>}/>
      <Route path='list/students' element={<StudentList/>}/>
      <Route path='edit/students/:id' element={<StudentEdit/>}/>


    {/* {STANDARD} */}

      <Route path='createclass' element={<CreateClass/>}/>
      <Route path='standardlist' element={<StandardsList/>} />


    {/* {SUBJECTS} */}

      <Route path='create/subject' element={<CreateSubject/>} />
      <Route path='list/subjects' element={<SubjectList/>} />


    {/* LIBRARY */}
      <Route path='add/book' element={<BookCreateForm/>} />
      <Route path='list/books' element={<BookList/>} />


    {/* STAFFS */}

      <Route path='add/staff' element={<StaffCreateForm/>}/>
      <Route path='list/staffs' element={<StaffList/>}/>


    {/* TRANSPORT */}


      <Route path='add/bus' element={<AddBusForm/>}/>
      <Route path='list/bus' element={<BusList/>}/>


    {/* HOSTEL */}

      <Route path='add/hostel' element={<AddHostel/>}/>
      <Route path='list/hostel' element={<HostelList/>}/>


      </Route>

    <Route>

      {/* {teacherdashboard} */}
    
    </Route>
    
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>

    </>
  )
}

export default App





// import { Routes, Route } from "react-router-dom";
// import AdminLayout from './layout/schooladmin/Layout';
// import Dashboard from './pages/schooladmin/Dashboard';
// import Login from './pages/schooladmin/Login';
// import TeacherLayout from './layout/TeacherLayout';
// import TeacherLogin from './pages/teacher/Login';
// import StudentLayout from './layout/StudentLayout';
// import StudentLogin from './pages/student/Login';
// import ProtectedRoute from './components/ProtectedRoute';
// import { useState } from 'react';

// function App() {
//   const [currentRole, setCurrentRole] = useState(null); // "admin", "teacher", "student"

//   return (
//     <Routes>
//       {/* Admin */}
//       <Route path="/admin-login" element={<Login setCurrentRole={setCurrentRole} />} />
//       <Route path="/admin" element={
//         <ProtectedRoute role="admin" currentRole={currentRole}>
//           <AdminLayout />
//         </ProtectedRoute>
//       }>
//         <Route path="dashboard" element={<Dashboard />} />
//         {/* add other admin routes here */}
//       </Route>

//       {/* Teacher */}
//       <Route path="/teacher-login" element={<TeacherLogin setCurrentRole={setCurrentRole} />} />
//       <Route path="/teacher" element={
//         <ProtectedRoute role="teacher" currentRole={currentRole}>
//           <TeacherLayout />
//         </ProtectedRoute>
//       }>
//         <Route path="dashboard" element={<h1>Teacher Dashboard</h1>} />
//         {/* add teacher related pages here */}
//       </Route>

//       {/* Student */}
//       <Route path="/student-login" element={<StudentLogin setCurrentRole={setCurrentRole} />} />
//       <Route path="/student" element={
//         <ProtectedRoute role="student" currentRole={currentRole}>
//           <StudentLayout />
//         </ProtectedRoute>
//       }>
//         <Route path="dashboard" element={<h1>Student Dashboard</h1>} />
//         {/* add student related pages here */}
//       </Route>

//       {/* Default */}
//       <Route path="/" element={<h1>Welcome! Please login.</h1>} />
//     </Routes>
//   );
// }

// export default App;
