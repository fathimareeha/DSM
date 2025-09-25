import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/schooladmin/Layout'
import Dashboard from './pages/schooladmin/Dashboard'
import Login from './pages/schooladmin/Login'
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './context/institution/Authcontext'


// {VP}

import AddVicePrincipal from './pages/schooladmin/Addviceprincipal'
import VicePrincipalList from './pages/schooladmin/Viceprincipallist'
import EditVicePrincipal from './pages/schooladmin/EditVicePrincipal'

// {TEACHERS}

import AddTeachers from './pages/schooladmin/Teachers/AddTeachers'
import TeachersList from './pages/schooladmin/Teachers/Teacherslist'
import EditTeacher from './pages/schooladmin/Teachers/EditTeachers'


// {STD&SECTIONS}

import StandardSectionCreateForm from './pages/schooladmin/Standard&Section/StandardSectionCreateForm'
import StandardSectionList from './pages/schooladmin/Standard&Section/Standard&SectionList'


// {LIBRARY}

import BookCreateForm from './pages/schooladmin/Library/BookCreate'
import BookList from './pages/schooladmin/Library/ListBook'

// {SUBJECTS}

import CreateSubject from './pages/schooladmin/Subject/SubjectCreate'
import SubjectList from './pages/schooladmin/Subject/Subjectslist'
import SubjectAssign from './pages/schooladmin/Subject/SubjectAssign'




import StaffCreateForm from './pages/schooladmin/Staffs/AddStaffs'
import StaffList from './pages/schooladmin/Staffs/StaffsList'
import AddBusForm from './pages/schooladmin/Transport/AddBus'
import BusList from './pages/schooladmin/Transport/BusList'
import AddHostel from './pages/schooladmin/Hostel/AddHostel'
import HostelList from './pages/schooladmin/Hostel/HostelList'
import ExamTable from './pages/schooladmin/Exam/Exams'
// import EditStandardSection from './pages/schooladmin/Standard&Section/EditSection'
import BookEdit from './pages/schooladmin/Library/EditBook'

// {STUDENTS}
import StudentCreate from './pages/schooladmin/Students/Addstudents'
import StudentList from './pages/schooladmin/Students/StudentsList'
import StudentEdit from './pages/schooladmin/Students/EditStudents'
import EditStaff from './pages/schooladmin/Staffs/EditStaffs'
import StaffView from './pages/schooladmin/Staffs/StaffView'





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
      <Route path='edit/teacher/:id' element={<EditTeacher/>}/>
      {/* <Route path='list/teachers' element={<TeachersList/>}/>
      <Route path='edit/teacher/:id' element={<EditTeachers/>} /> */}


    {/* {STUDENTS} */}

      <Route path='add/students' element={<StudentCreate/>}/>
      <Route path='list/students' element={<StudentList/>}/>
      <Route path='edit/students/:id' element={<StudentEdit/>}/>
      {/* <Route path='list/students' element={<StudentList/>}/>
      <Route path='edit/students/:id' element={<StudentEdit/>}/> */}


    {/* {STANDARD & SECTIONS} */}

      <Route path='create/std&sec' element={<StandardSectionCreateForm/>}/>
      <Route path='list/standard&section' element={<StandardSectionList/>} />
      {/* <Route path='edit/standard&section/:id' element={<EditStandardSection/>}/> */}


    {/* {SECTION} */}
{/* 
      <Route path='create/section' element={<SectionCreate/>}/>
      <Route path='list/sections' element={<SectionList/>}/> */}

    {/* {SUBJECTS} */}

      <Route path='create/subject' element={<CreateSubject/>}/>
      <Route path='list/subjects' element={<SubjectList/>}/>
      <Route path='assign/subject/:teacherId' element={<SubjectAssign/>}/>


    {/* LIBRARY */}
      <Route path='add/book' element={<BookCreateForm/>} />
      <Route path='list/books' element={<BookList/>} />
      <Route path='edit/book/:id' element={<BookEdit/>}/>

    {/* STAFFS */}

      <Route path='add/staff' element={<StaffCreateForm/>}/>
      <Route path='list/staffs' element={<StaffList/>}/>
      <Route path='edit/staffs/:id' element={<EditStaff/>}/>
      <Route path='view/staffs/:id' element={<StaffView/>}/>


    {/* TRANSPORT */}


      <Route path='add/bus' element={<AddBusForm/>}/>
      <Route path='list/bus' element={<BusList/>}/>


    {/* HOSTEL */}

      <Route path='add/hostel' element={<AddHostel/>}/>
      <Route path='list/hostel' element={<HostelList/>}/>


    {/* {EXAMS} */}

    <Route path='list/exam' element={<ExamTable/>}/>
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
