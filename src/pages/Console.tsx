// import React from 'react'

import { useState } from 'react';
import Header from '../components/dashboard/layout/Header';
import Navbar, { NavPage } from '../components/dashboard/layout/Navbar';
import DashboardView from '../components/dashboard/view/DashboardView';
import './Console.css';
import TroupeView from '../components/dashboard/view/TroupeView';
import EventLogView from '../components/dashboard/view/EventLogView';
import MemberLogView from '../components/dashboard/view/MemberLogView';
import SettingsView from '../components/dashboard/view/SettingsView';

const Console = () => {
  const [view, setView] = useState<NavPage>('dashboard')

  return (
    <div className='console-vert'>
      <Header username='blahblah' />
      <div className='console-hori'>
        <Navbar 
          initialPage='dashboard' 
          onNavigate={(_, page, setPage) => {
            setPage(page);
            setView(page);
          }} 
        />
        {
          view == 'troupe' 
            ? <TroupeView />
            : view == 'event-log'
            ? <EventLogView />
            : view == 'member-log'
            ? <MemberLogView />
            : view == 'settings'
            ? <SettingsView />
            : <DashboardView />
        }
      </div>
    </div>
  )
}

export default Console;