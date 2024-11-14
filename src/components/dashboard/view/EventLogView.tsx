import { BulkUpdateEventRequest } from '@cloudydaiyz/stringplay-core/types/api';
import '../../../app/shared.css';
import { useEvents, useEventTypes, useMetadata } from '../../../lib/api-client';
import { defaultConfig } from '../../../lib/mock-data';

import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Table from '../Table';
import { useDialogToggle } from '../../../lib/toggle-dialog';

const EventLogView = () => {
    const { lastUpdated, loading } = useMetadata();
    const { eventTypes, createEventTypes } = useEventTypes();
    const { events, createEvents, deleteEvents, updateEvents } = useEvents();
    const { openDialog, closeDialog } = useDialogToggle();

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
                                disableCreate: true,
                                disableUpdate: true,
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
                            : eventTypes?.map(et => [et.id, et.title, et.value]) || [],
                    }}
                    tableHeader={{
                        title: "Event Types",
                        onDataCreate: (newRows) => {
                            console.log("opening dialog");
                            openDialog({
                                title: 'Confirm Create Event Type',
                                content: 'Are you sure that you want to create these event types?',
                                actions: [
                                    {
                                        label: 'CANCEL',
                                        color: 'var(--g2)',
                                        onClick: async () => closeDialog()
                                    },
                                    {
                                        label: 'CONFIRM',
                                        color: 'var(--success)',
                                        onClick: async () => {
                                            closeDialog();
                                            createEventTypes(
                                                newRows.map(row => ({
                                                    title: row[1] as string,
                                                    value: row[2] as number,
                                                    sourceFolderUris: [],
                                                }))
                                            )
                                        }
                                    },
                                ]
                            }) 
                        }
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
                                disableCreate: true,
                                disableUpdate: true,
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
                                type: "number?",
                            },
                            {
                                title: "Source",
                                type: "string?",
                                disableCreate: true,
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
                        validateData: (data, _, c) => {
                            if(c == 1 && data && !eventTypes?.find(et => et.id == data)) {
                                return false;
                            }
                            return true;
                        }
                    }}
                    tableHeader={{
                        title: "Events",
                        onDataCreate: (newRows) => createEvents(
                            newRows.map(row => ({
                                eventTypeId: row[1] as string || undefined,
                                title: row[2] as string,
                                startDate: (row[3] as Date).toISOString(),
                                value: (row[4] as number),
                                sourceUri: row[6] as string,
                            }))
                        ),
                        onDataDelete: (deleteIndicies) => deleteEvents(
                            events?.filter((_, i) => deleteIndicies[i]).map(e => e.id) || []
                        ),
                        onDataUpdate: async (updates) => {
                            const request: BulkUpdateEventRequest = {};
                            updates.forEach((row, r) => {
                                row.forEach((col, c) => {
                                    if(!col) return;

                                    const eventId = events![r].id;
                                    if(!request[eventId]) request[eventId] = {};
                                    
                                    switch(c) {
                                        case 1:
                                            request[eventId].eventTypeId = col as string;
                                            break;
                                        case 2:
                                            request[eventId].title = col as string;
                                            break;
                                        case 3:
                                            request[eventId].startDate = (col as Date).toISOString();
                                            break;
                                        case 4:
                                            request[eventId].value = col as number;
                                            break;
                                        case 6:
                                            request[eventId].sourceUri = col as string;
                                            break;
                                        default:
                                            break;
                                    }
                                });
                            });
                            return updateEvents(request);
                        }
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