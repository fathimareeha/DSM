import React from 'react'
import { Landmark } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { MonitorCheck } from 'lucide-react';
import { CircleDollarSign } from 'lucide-react';
import Institution_count from '../../components/super_admin/charts/institution_count';
import DashboardCard from '../../components/super_admin/dashboard/DashboardCard';
import Breadcrumbs from '../../components/super_admin/Breadcrumbs';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  console.log();
  const navigate=useNavigate()

  const handleAddClick=()=>{
      navigate('/admin/create_staff')
  }
  
  return (
    <div>
      <div className='flex justify-between'><div><Breadcrumbs /></div>
    <div className=''><button className=' py-2 px-4 shadow' onClick={handleAddClick}>+ Staff</button></div>
    </div>
      <div className='p-5'>


        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <DashboardCard icon={<Landmark />} title={'Institution'} value={0} />
          <DashboardCard icon={<UserRound />} title={'Admins'} value={0} />
          <DashboardCard icon={<MonitorCheck />} title={'Active'} value={0} />
          <DashboardCard icon={<CircleDollarSign />} title={'Earnings'} value={0} />


        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl bg-white shadow-md w-full h-full">
            <h1 className="font-bold mb-6 text-2xl sm:text-3xl">Institutions</h1>
            <Institution_count />
          </div>
        </div>



      </div></div>
  )
}

export default Dashboard