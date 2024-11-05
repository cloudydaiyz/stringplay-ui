// import React from 'react'

import Header from '../components/dashboard/layout/Header';
import Navbar from '../components/dashboard/layout/Navbar';
import DashboardView from '../components/dashboard/view/DashboardView';
import './Console.css';

const Console = () => {
  return (
    <div className='console-vert'>
      <Header username='blahblah' />
      <div className='console-hori'>
        <Navbar initialPage='dashboard' onNavigate={() => {}} />
        <DashboardView />
      </div>
    </div>
  )
}

export default Console;