import './Console.css';

import { useState } from 'react';
import Header from '../components/dashboard/layout/Header';
import Navbar, { NavPage } from '../components/dashboard/layout/Navbar';
import DashboardView from '../components/dashboard/view/DashboardView';
import TroupeView from '../components/dashboard/view/TroupeView';
import EventLogView from '../components/dashboard/view/EventLogView';
import MemberLogView from '../components/dashboard/view/MemberLogView';
import SettingsView from '../components/dashboard/view/SettingsView';
import Dialog from '../components/common/Dialog';
import { useDialogProps } from '../lib/toggle-dialog';

const Console = () => {
  const [ view, setView ] = useState<NavPage>('dashboard');
  const { lastOpened, props } = useDialogProps();

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
      <Dialog key={lastOpened.toISOString()} {...props} />
    </div>
  )
}

export default Console;