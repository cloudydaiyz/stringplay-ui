import '../../../app/shared.css';
import './DashboardView.css';

import CategoricalStatistic, { CategoricalStatisticProps } from '../CategoricalStatistic';
import CumulativeStatistic from '../CumulativeStatistic';
import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Table from '../Table';
import UpcomingBirthdays from '../UpcomingBirthdays';
import { useMetadata, useTroupe } from '../../../lib/api-client';
import { defaultConfig } from '../../../lib/mock-data';
import { TroupeDashboard } from '@cloudydaiyz/stringplay-core/types/api';
import { useConsoleNotifications, useDashboardNotifications } from '../../../lib/notifications';
import Notification from '../Notification';
import { visitedPages } from '../../../lib/global';
import { useDialogToggle } from '../../../lib/toggle-dialog';
import { useState } from 'react';

/** Converts entity data to data parsable by the `CategoricalStatistics` component */
function convertCategoricalData(percentagesObj: TroupeDashboard['attendeePercentageByEventType'] | undefined) {
    if(!percentagesObj) return undefined;

    const data: CategoricalStatisticProps['data'] = [];
    for(const id in percentagesObj) {
        data.push({
            name: percentagesObj[id].title,
            value: percentagesObj[id].value,
        });
    }
    return data;
}

/** Converts event type data from the dashboard to row data parsable by the `Table` component */
function getDashboardTableData(dashboard: TroupeDashboard | undefined) {
    return dashboard 
    ? Object.keys(dashboard.totalAttendeesByEventType).map(key => [
        dashboard.totalEventsByEventType[key].title,
        dashboard.totalEventsByEventType[key].value,
        dashboard.totalAttendeesByEventType[key].value,
        dashboard.avgAttendeesByEventType[key].value,
        dashboard.attendeePercentageByEventType[key].percent * 100 + '%',
        dashboard.eventPercentageByEventType[key].percent * 100 + '%',
    ])
    : [];
}

function DashboardCumulativeStatistics() {
    const { loading } = useMetadata();
    const { dashboard } = useTroupe();
    return (
        <div className='dashboard-cumulative'>
            <CumulativeStatistic 
                accumulator='total' 
                statistic='members' 
                value={
                    !loading && !dashboard
                    ? defaultConfig.dashboard.totalMembers
                    : dashboard?.totalMembers
                } 
                loading={loading} 
                useDataWhileLoading={dashboard && loading} 
            />
            <CumulativeStatistic 
                accumulator='total' 
                statistic='events' 
                value={
                    !loading && !dashboard
                    ? defaultConfig.dashboard.totalEvents
                    : dashboard?.totalEvents
                } 
                loading={loading} 
                useDataWhileLoading={dashboard && loading} 
            />
            <CumulativeStatistic 
                accumulator='total' 
                statistic='event types' 
                value={
                    !loading && !dashboard
                    ? defaultConfig.dashboard.totalEventTypes
                    : dashboard?.totalEventTypes
                } 
                loading={loading} 
                useDataWhileLoading={dashboard && loading} 
            />
            <CumulativeStatistic 
                accumulator='average' 
                statistic='attendees per event' 
                value={
                    !loading && !dashboard
                    ? defaultConfig.dashboard.avgAttendeesPerEvent
                    : dashboard?.avgAttendeesPerEvent
                } 
                loading={loading} 
                useDataWhileLoading={dashboard && loading} 
            />
        </div>
    );
}

function DashboardCategoricalStatistics() {
    const { loading } = useMetadata();
    const { dashboard } = useTroupe();

    const data1 = !loading && !dashboard
        ? convertCategoricalData(defaultConfig.dashboard.attendeePercentageByEventType)!
        : convertCategoricalData(dashboard?.attendeePercentageByEventType);

    const data2 = !loading && !dashboard
        ? convertCategoricalData(defaultConfig.dashboard.eventPercentageByEventType)!
        : convertCategoricalData(dashboard?.eventPercentageByEventType);

    console.log(dashboard);
    console.log("data1", data1);
    console.log("data2", data2);

    return (
        <div className="dashboard-categorical">
            <CategoricalStatistic
                data={data1}
                title='% of attendees by Event Type'
                loading={loading}
            />
            <CategoricalStatistic
                data={data2}
                title='% of events by Event Type'
                loading={loading}
            />
        </div>
    );
}

function EventTypeStatsTable() {
    const { loading } = useMetadata();
    const { dashboard } = useTroupe();
    return (
        <Table 
            tableData={{
                columns: [
                    {
                        title: 'Event Type',
                        type: 'string!',
                    },
                    {
                        title: 'Total Events',
                        type: 'number!',
                    },
                    {
                        title: 'Total Attendees',
                        type: 'number!',
                    },
                    {
                        title: 'Average Attendees',
                        type: 'number!',
                    },
                    {
                        title: '% of attendees',
                        type: 'string!',
                    },
                    {
                        title: '% of events',
                        type: 'string!',
                    },
                ],
                data: !loading && !dashboard
                    ? getDashboardTableData(defaultConfig.dashboard)
                    : getDashboardTableData(dashboard),
            }}
            loading={loading}
            useDataWhileLoading={dashboard && loading} 
        />
    );
}

const DashboardView = () => {
    const { loading } = useMetadata();
    const { dashboard } = useTroupe();
    const { consoleNotif, removeConsoleNotif } = useConsoleNotifications();
    const { dashboardNotif, removeDashboardNotif } = useDashboardNotifications();
    const { openDialog, closeDialog } = useDialogToggle();
    const [ acknowledgedFailure, setAcknowledgedFailure ] = useState(false);

    if(!loading && !dashboard && !acknowledgedFailure) {
        openDialog({
            title: "Unable to load data",
            content: "We are unable to load dashboard data for this troupe at the moment. "
                + "Please try navigating to another view or refreshing your page.",
            actions: [{
                label: "OKAY",
                color: 'var(--g2)',
                onClick: async () => { closeDialog(); setAcknowledgedFailure(true) },
            }],
        })
    }

    const upcomingBirthdays = <UpcomingBirthdays 
        birthdays={
            !loading && !dashboard 
            ? defaultConfig.dashboard.upcomingBirthdays.members.map(m => ({
                firstName: m.firstName,
                lastName: m.lastName,
                birthday: new Date(m.birthday),
            }))
            : dashboard?.upcomingBirthdays.members.map(m => ({
                firstName: m.firstName,
                lastName: m.lastName,
                birthday: new Date(m.birthday),
            }))
        }
        loading={loading}
        useDataWhileLoading={dashboard && loading}
    />;
    
    return (
        <div className='content-view'>
            <div className='content-inner-view'>
                <ContentHeader title="Content at a glance" />
                <div 
                    className='content-notifications' 
                    style={
                        (consoleNotif.length + dashboardNotif.length) == 0 ? 
                            {display: 'none'} : 
                            {}
                    }
                >
                    { 
                        consoleNotif.map((props, i) => (
                            <Notification 
                                {...props} 
                                onClick={() => removeConsoleNotif(i)}
                                key={i * Date.now()}
                            />
                        )) 
                    }
                    { 
                        dashboardNotif.map((props, i) => (
                            <Notification 
                                {...props} 
                                onClick={() => removeDashboardNotif(i)}
                                key={(i + consoleNotif.length) * Date.now()}
                            />
                        ))
                    }
                </div>
                <div 
                    className={
                        'content-stats '
                        + (visitedPages.includes("DashboardView") ? "" : "init")
                    }
                    onAnimationStart={() => visitedPages.push("DashboardView")}
                >
                    { upcomingBirthdays }
                    <DashboardCumulativeStatistics />
                    <DashboardCategoricalStatistics />
                    <EventTypeStatsTable />
                </div>
            </div>
            <ContentFooter />
        </div>
    );
}

export default DashboardView;