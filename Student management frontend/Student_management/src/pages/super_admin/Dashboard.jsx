import React, { useContext, useEffect } from 'react'
import { Landmark } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { MonitorCheck } from 'lucide-react';
import { CircleDollarSign } from 'lucide-react';
import Institution_count from '../../components/super_admin/charts/institution_count';
import DashboardCard from '../../components/super_admin/dashboard/DashboardCard';
import Breadcrumbs from '../../components/super_admin/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { SuperadminContext } from '../../context/super_admin/Superadmin_Context';
import ActiveTable from '../../components/super_admin/table/ActiveTable';
import InstitutionStatusBarChart from '../../components/super_admin/charts/active_inactive_chart';
import Payment_chart from '../../components/super_admin/charts/Payment_chart';

function Dashboard() {
  console.log();
  const navigate=useNavigate()
  const {totalInstitutions,totalActive,fetchInstitutionCount,totalAmount,totalStaff}=useContext(SuperadminContext)
  
  
  useEffect(()=>{
    fetchInstitutionCount()
  },[])
  return (
    <div>
      <div className='flex justify-between'><div><Breadcrumbs /></div>
    
    </div>
      <div className='p-5'>


        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <DashboardCard icon={<Landmark />} title={'Institution'} value={totalInstitutions} />
          <DashboardCard icon={<UserRound />} title={'Staff'} value={totalStaff} onClick={()=>navigate('/admin/list_staff')} />
          <DashboardCard icon={<MonitorCheck />} title={'Active'} value={totalActive} />
          <DashboardCard icon={<CircleDollarSign />} title={'Earnings'} value={totalAmount} />


        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {/* Chart box 1 - Institution Count */}
  <div className="col-span-1 p-6 rounded-xl bg-white shadow-md w-full h-[350px] sm:h-[400px]">
    <h1 className="font-bold mb-4 text-xl sm:text-2xl">Institutions</h1>
    <Institution_count />
  </div>

  {/* Chart box 2 - Bar Chart */}
  <div className="col-span-1 lg:col-span-2 p-6 rounded-xl bg-white shadow-md w-full sm:h-[250px] lg:h-[400px]">
    <InstitutionStatusBarChart />
  </div>
</div>
<div className='mt-6'>
<Payment_chart/>

</div>

        <div className='mt-6'><ActiveTable/></div>
        



      </div></div>
  )
}

export default Dashboard