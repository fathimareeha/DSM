import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/schooladmin/Layout'
import Dashboard from './pages/schooladmin/Dashboard'
import Login from './pages/schooladmin/Login'
import ManageFaculty from './pages/schooladmin/Facultymanagement'
import AddCoordinators from './pages/schooladmin/Addcoordinators'
import AddTeachers from './pages/schooladmin/Addteachers'
import AddVicePrincipal from './pages/schooladmin/Addviceprincipal'
import CreateClass from './pages/schooladmin/Createclasses'
import VicePrincipalList from './pages/schooladmin/Viceprincipallist'
import AddStudent from './pages/schooladmin/Addstudents'
import { Autprovider } from './context/institution/Authcontext'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Autprovider>

    <Routes>

      <Route path='/admin' element={<Layout/>}>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='add/viceprincipal' element={<AddVicePrincipal/>}/>
      <Route path='list/viceprincipal' element={<VicePrincipalList/>}/>
      <Route path='createclass' element={<CreateClass/>}/>
      </Route>

   
      <Route path='/login' element={<Login/>}/>
      
      <Route path='/facultymanagement' element={<ManageFaculty/>}/>
      <Route path='/addcoordinators' element={<AddCoordinators/>}/>
      <Route path='/addteachers' element={<AddTeachers/>}/>
      <Route path='/addstudents' element={<AddStudent/>}/>


    </Routes>
    </Autprovider>

    </>
  )
}

export default App
