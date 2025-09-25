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
import AddCoordinators from './pages/schooladmin/Addcoordinators'
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




function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <AuthProvider>
    <Routes>

      <Route path='login' element={<Login/>}/>
      <Route path='/admin' element={<Layout/>}>
      <Route path='dashboard' element={<Dashboard/>}/>
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


      {/* Library */}
      <Route path='add/book' element={<BookCreateForm/>} />
      <Route path='list/books' element={<BookList/>} />
      </Route>

   
      
      
      <Route path='/addcoordinators' element={<AddCoordinators/>}/>
     


    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>

    </>
  )
}

export default App
