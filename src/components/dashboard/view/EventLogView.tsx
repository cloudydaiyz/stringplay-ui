import '../../../app/shared.css';
import { useEvents, useEventTypes, useMetadata } from '../../../lib/api-client';
import { defaultConfig } from '../../../lib/mock-data';

import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Table from '../Table';

const EventLogView = () => {
    const { lastUpdated, loading } = useMetadata();
    const { eventTypes } = useEventTypes();
    const { events, createEvents } = useEvents();

    return (
    <div className='content-view'>
        <div className='content-inner-view'>
            <ContentHeader title='Event Log' lastUpdated={lastUpdated} />
            <div className='content-notifications'>
                {/* <Notification notificationType='info' text="Hello world" /> */}
            </div>
            <div className='content-stats'>
                <Table
                    tableData={{
                        columns: [
                            {
                                title: "Type ID",
                                type: "string!",
                            },
                            {
                                title: "Title",
                                type: "string!",
                            },
                            {
                                title: "Value",
                                type: "number!",
                            },
                        ],
                        data: !loading && !eventTypes 
                            ? defaultConfig.eventTypes.map(et => [et.id, et.title, et.value])
                            : eventTypes?.map(et => [et.id, et.title, et.value]) || []
                    }}
                    tableHeader={{
                        title: "Event Types"
                    }}
                    loading={loading}
                    useDataWhileLoading={eventTypes && loading} 
                />
                <Table
                    tableData={{
                        columns: [
                            {
                                title: "Event ID",
                                type: "string!",
                            },
                            {
                                title: "Type ID",
                                type: "string?",
                            },
                            {
                                title: "Title",
                                type: "string!",
                            },
                            {
                                title: "Start Date",
                                type: "date!",
                            },
                            {
                                title: "Value",
                                type: "number!",
                            },
                            {
                                title: "Source",
                                type: "string?",
                                disableUpdate: true,
                            },
                            {
                                title: "Source URI",
                                type: "string!",
                            },
                        ],
                        data: !loading && !events
                        ? defaultConfig.events.map(e => [e.id, e.eventTypeId || null, e.title, new Date(e.startDate), e.value, e.source, e.sourceUri])
                        : events?.map(e => [e.id, e.eventTypeId || null, e.title, new Date(e.startDate), e.value, e.source, e.sourceUri]) || [],
                    }}
                    tableHeader={{
                        title: "Events",
                        onDataCreate: async (newRows) => createEvents(
                            newRows.map(row => ({
                                title: row[2] as string,
                                startDate: (row[3] as Date).toISOString(),
                                sourceUri: row[4] as string,
                            }))
                        )
                    }}
                    loading={loading}
                    useDataWhileLoading={events && loading} 
                />
            </div>
        </div>
        <ContentFooter />
    </div>
  )
}

export default EventLogView;