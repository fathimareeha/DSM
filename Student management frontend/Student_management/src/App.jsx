import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes,Route} from 'react-router-dom'
import './App.css'
import Navbar from './layout/super_admin/Navbar'
import Dashboard from './pages/super_admin/Dashboard'
import Layout from './layout/super_admin/Layout'

import Institutions from './pages/super_admin/Institutions'
import Form from './components/super_admin/forms/SchoolForm'
import Createadmin_form from './components/super_admin/forms/Createadmin_form'
import School from './pages/super_admin/School'
import College from './pages/super_admin/College'
import Details from './pages/super_admin/Details'
import SchoolForm from './components/super_admin/forms/SchoolForm'
import CollegeForm from './components/super_admin/forms/CollegeForm'
import Institution_form from './pages/super_admin/Institution_form'
import Login from './components/super_admin/forms/Login'
import { SuperadminProvider } from './context/super_admin/Superadmin_Context'
import Payment_option from './pages/super_admin/payment_option'
import New_page from './pages/college/New_page'
import Institution_login from './components/college/Institution_login'
import RazorpayPayment from './pages/super_admin/Checkout'
import Institution_adminHomepage from './pages/super_admin/Institution_adminHomepage'
import DashboardLoader from './pages/super_admin/DashboardLoader'
import Create_packages from './components/super_admin/forms/Create_packages'
import Create_staff from './components/super_admin/forms/Create_staff'
import Packages_list from './components/super_admin/list/Packages_list'
import Package_edit from './components/super_admin/forms/Package_edit'
import { ToastContainer } from 'react-toastify'
import Institution_admin from './pages/super_admin/Institution_admin'
import School_edit from './components/super_admin/forms/School_edit'
import College_edit from './components/super_admin/forms/College_edit'
import Edit_institutionForm from './pages/super_admin/Edit_institutionForm'
import ForgotPassword from './components/college/Forget_password'
import ResetPassword from './components/college/Reset_password'
import School_detail from './components/super_admin/detail/school_detail'
import College_details from './components/super_admin/detail/College_details'
import { Search_provider } from './context/super_admin/Search_context'
import Staff from './pages/super_admin/Staff'
import SchoolHomepage from './pages/super_admin/School_homepage'
import CollegeHomepage from './pages/super_admin/College_homepage'
import CourseForm from './components/super_admin/forms/CourseForm'
import CreateDepartment from './components/super_admin/forms/DepartmentForm'
import CreateSemester from './components/super_admin/forms/SemesterForm'
import CreateSubject from './components/super_admin/forms/SubjectForm'
import UniversityForm from './components/super_admin/forms/UniversityForm'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer/>
     <SuperadminProvider>
      <Search_provider>
    <Routes>
      
     
      <Route path='login' element={<Login/>}/>

      <Route path="/admin" element={<Layout/>}>
      
      <Route path='dashboard' element={<Dashboard/>}/>
     
      <Route path='institutions' element={<Institutions/>}/>
      <Route path='school' element={<School/>}/>
      <Route path='college' element={<College/>}/>
      <Route path='school_form' element={<SchoolForm/>}/>
      <Route path='college_form' element={<CollegeForm/>}/>
      <Route path='admin_form' element={<Createadmin_form/>}/>
      <Route path='create_staff' element={<Create_staff/>}/>
      <Route path='list_staff' element={<Staff/>}/>
      <Route path='institution_form' element={<Institution_form/>}/>
      <Route path='details/:institution_id' element={<Details/>}/>
      <Route path='school_details/:institution_id' element={<School_detail/>}/>
      <Route path='college_details/:institution_id' element={<College_details/>}/>
      <Route path='create_package' element={<Create_packages/>}/>
      <Route path='list_package' element={<Packages_list/>}/>
      <Route path='package_edit/:id' element={<Package_edit/>}/>
      <Route path='institution_admin' element={<Institution_admin/>}/>
      <Route path='school_edit/:institution_id' element={<School_edit/>}/>
      <Route path='college_edit/:institution_id' element={<College_edit/>}/>
      <Route path='edit_institution_form/:institution_id/' element={<Edit_institutionForm/>}/>
      <Route path='university' element={<UniversityForm/>}/>
      <Route path='course' element={<CourseForm/>}/>
      <Route path='department' element={<CreateDepartment/>}/>
      <Route path='semester' element={<CreateSemester/>}/>
      <Route path='subject' element={<CreateSubject/>}/>



      </Route>
      <Route path='institution_login' element={<Institution_login/>}/>
      <Route path='forgot_password' element={<ForgotPassword/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path='payment_option' element={<Payment_option/>}/>
      <Route path='new_page' element={<New_page/>}/>
      <Route path='checkout' element={<RazorpayPayment/>}/>
      <Route path='institution_homepage' element={<Institution_adminHomepage/>}/>
      <Route path='school_homepage' element={<SchoolHomepage/>}/>
      <Route path='college_homepage' element={<CollegeHomepage/>}/>
      <Route path='dashboard_loader' element={<DashboardLoader/>}/>
    </Routes>
    </Search_provider>
     </SuperadminProvider>

    </>
  )
}

export default App
