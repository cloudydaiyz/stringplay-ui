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

/** Converts entity data to data parsable by the `CategoricalStatistics` component */
function convertCategoricalData(percentagesObj: TroupeDashboard['attendeePercentageByEventType'] | undefined) {
    if(!percentagesObj) return undefined;

    const data: CategoricalStatisticProps['data'] = [];
    for(const id in data) {
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
    ])
    : [];
}

const DashboardView = () => {
    const { lastUpdated, loading } = useMetadata();
    const { dashboard } = useTroupe();

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
    
    const cumulativeStatistics = <div className='dashboard-cumulative'>
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
            statistic='attendees' 
            value={
                !loading && !dashboard
                ? defaultConfig.dashboard.totalAttendees
                : dashboard?.totalAttendees
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
    </div>;

    const categoricalStatistics = <div className="dashboard-categorical">
        <CategoricalStatistic
            data={
                !loading && !dashboard
                ? convertCategoricalData(defaultConfig.dashboard.attendeePercentageByEventType)!
                // : mockCategoricalStatistics1
                : convertCategoricalData(dashboard?.attendeePercentageByEventType)
            }
            title='% of attendees by Event Type'
            loading={loading}
        />
        <CategoricalStatistic
            data={
                !loading && !dashboard
                ? convertCategoricalData(defaultConfig.dashboard.eventPercentageByEventType)!
                // : mockCategoricalStatistics2
                : convertCategoricalData(dashboard?.eventPercentageByEventType)
            }
            title='% of events by Event Type'
            loading={loading}
        />
    </div>;

    let eventTypeTable = <Table 
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
            ],
            data: !loading && !dashboard
                ? getDashboardTableData(defaultConfig.dashboard)
                // : mockEventTypeTable
                : getDashboardTableData(dashboard),
        }}
        loading={loading}
        useDataWhileLoading={dashboard && loading} 
    />;

    return (
        <div className='content-view'>
            <div className='content-inner-view'>
                <ContentHeader title="Dashboard" lastUpdated={lastUpdated} />
                <div className='content-notifications'>
                    {/* <Notification notificationType='info' text="Hello world" /> */}
                </div>
                <div className='content-stats'>
                    { upcomingBirthdays }
                    { cumulativeStatistics }
                    { categoricalStatistics }
                    { eventTypeTable }
                </div>
            </div>
            <ContentFooter />
        </div>
    )
}

export default DashboardView;