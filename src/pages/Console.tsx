import './Console.css';

import { useEffect, useState } from 'react';
import Header from '../components/dashboard/layout/Header';
import Navbar, { NavPage } from '../components/dashboard/layout/Navbar';
import DashboardView from '../components/dashboard/view/DashboardView';
import TroupeView from '../components/dashboard/view/TroupeView';
import EventLogView from '../components/dashboard/view/EventLogView';
import MemberLogView from '../components/dashboard/view/MemberLogView';
import { ContextDialog } from '../components/common/Dialog';
import { useDialogProps } from '../lib/toggle-dialog';
import LoadingBackground from '../components/LoadingBackground';
import { useClient, useMetadata, useTroupe } from '../lib/api-client';
import Logo from '../components/svg/Logo';

export const Console = () => {
    const [ view, setView ] = useState<NavPage>('dashboard');
    const [ doneLoading, setDoneLoading ] = useState(false);
    const { loading } = useMetadata();
    const { lastOpened } = useDialogProps();
    const { dashboard } = useTroupe();
    const { getConsoleData } = useClient();

    /** Get the initial console data */
    useEffect(() => { getConsoleData() }, []);

    if(!doneLoading && dashboard !== undefined || !loading) {
        setTimeout(() => setDoneLoading(true), 1000);
    }

    return (
        <div className='console-vert'>
            <LoadingBackground 
                className={`loading-background ${doneLoading && 'done-loading'}`} 
                doneLoading={doneLoading}
            >
                <div className={`loading-logo`}>
                    <Logo 
                        stroke={false} 
                        size="l" 
                        animated={loading} 
                    />
                    <h3>Loading...</h3>
                </div>
            </LoadingBackground>
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
                        : <DashboardView />
                }
            </div>
            <ContextDialog key={lastOpened.toISOString()} />
        </div>
    )
}