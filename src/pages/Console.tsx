import './Console.css';

import { useState } from 'react';
import Header from '../components/dashboard/layout/Header';
import Navbar, { NavPage } from '../components/dashboard/layout/Navbar';
import DashboardView from '../components/dashboard/view/DashboardView';
import TroupeView from '../components/dashboard/view/TroupeView';
import EventLogView from '../components/dashboard/view/EventLogView';
import MemberLogView from '../components/dashboard/view/MemberLogView';
import { ContextDialog } from '../components/common/Dialog';
import { useDialogProps } from '../lib/toggle-dialog';
import LoadingBackground from '../components/LoadingBackground';
import { api, useMetadata, useTroupe } from '../lib/api-client';
import Logo from '../components/svg/Logo';
import { useNavigate } from 'react-router-dom';
import SourcesView from '../components/dashboard/view/SourcesView';

export const Console = () => {
    const [ view, setView ] = useState<NavPage>('dashboard');
    const [ doneLoading, setDoneLoading ] = useState(false);
    const { loading } = useMetadata();
    const { lastOpened } = useDialogProps();
    const { dashboard } = useTroupe();
    const navigate = useNavigate();

    if(!api.credentials) navigate("/login");

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
                        animated={!doneLoading} 
                    />
                    <h3>Loading...</h3>
                </div>
            </LoadingBackground>
            <Header 
                username={''}
                onLogOut={() => { api.credentials = undefined; navigate("/login") }} 
            />
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
                        : view == 'sources'
                        ? <SourcesView />
                        : <DashboardView />
                }
            </div>
            <ContextDialog key={lastOpened.toISOString()} />
        </div>
    )
}