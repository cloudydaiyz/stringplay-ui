import { BulkUpdateEventRequest } from '@cloudydaiyz/stringplay-core/types/api';
import '../../../app/shared.css';
import './EventLogView.css';
import { useEvents, useEventTypes, useMetadata, useTroupe } from '../../../lib/api-client';
import { defaultConfig } from '../../../lib/mock-data';

import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Table from '../Table';

import { useDialogToggle } from '../../../lib/toggle-dialog';
import { useState } from 'react';
import Button from '../../common/Button';
import { SetEventLogSubview, EventInformationProps, EventLogSubview, EventTypeInformationProps } from '../../../types/view-types';
import LeftArrow from '../../svg/LeftArrow';
import { objectToArray } from '../../../lib/helper';
import { FieldToPropertyMap } from '@cloudydaiyz/stringplay-core/types';

/** Subview that shows an overview of events and event types */
const EventLog = ({ setSubview }: SetEventLogSubview) => {
    const { lastUpdated, loading } = useMetadata();
    const { eventTypes, createEventTypes } = useEventTypes();
    const { events, createEvents, deleteEvents, updateEvents } = useEvents();
    const { openDialog, closeDialog } = useDialogToggle();

    return (
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
                            {
                                title: "More",
                                type: "action",
                            },
                        ],
                        data: !loading && !eventTypes 
                            ? defaultConfig.eventTypes.map(et => [et.id, et.title, et.value, null])
                            : eventTypes?.map(et => [et.id, et.title, et.value, null]) || [],
                        onAction: (r) => {
                            setSubview({ subviewId: 'event-type-info', props: { eventTypeId: eventTypes![r].id }});
                        }
                    }}
                    tableHeader={{
                        title: "Event Types",
                        onDataCreate: (newRows) => openDialog({
                            title: 'Confirm Create Event Type',
                            content: 'Are you sure that you want to create the(se) event type(s)?',
                            actions: [
                                {
                                    label: 'CANCEL',
                                    color: 'var(--g2)',
                                    onClick: async () => closeDialog(),
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
                                    },
                                },
                            ]
                        }),
                        onDataUpdate: (updates) => {
                            
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
                            {
                                title: "More",
                                type: "action",
                            }
                        ],
                        data: !loading && !events
                            ? defaultConfig.events.map(e => [e.id, e.eventTypeId || null, e.title, new Date(e.startDate), e.value, e.source, e.sourceUri, null])
                            : events?.map(e => [e.id, e.eventTypeId || null, e.title, new Date(e.startDate), e.value, e.source, e.sourceUri, null]) || [],
                        validateData: (data, _, c) => {
                            if(c == 1 && data && !eventTypes?.find(et => et.id == data)) {
                                return false;
                            }
                            return true;
                        },
                        onAction: (r) => {
                            setSubview({ subviewId: 'event-info', props: { eventId: events![r].id }});
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
    )
}

/** Subview that shows detailed information about one event */
const EventInformation = ({ eventId, setSubview }: EventInformationProps & SetEventLogSubview) => {
    const { lastUpdated, loading } = useMetadata();
    const { troupe } = useTroupe();
    const { eventTypes } = useEventTypes();
    const { events, updateEvents } = useEvents();
    const { openDialog, closeDialog } = useDialogToggle();
    const event = events!.find(e => e.id == eventId!)!;

    const fieldPropMap: [keyof FieldToPropertyMap, string, string|null][] = objectToArray(
        event.fieldToPropertyMap, 
        (fieldId, fieldInfo) => ([fieldId, fieldInfo.field, fieldInfo.property])
    );

    return (
        <div className='event-information content-inner-view'>
            <ContentHeader title='Event Log' lastUpdated={lastUpdated} />
            <div className='content-notifications'>
                {/* <Notification notificationType='info' text="Hello world" /> */}
            </div>
            <h3>Event Information for { event.title }</h3>
            <Button 
                buttonType={1}
                text={
                    <>
                        <div style={{width:'20px', height:'20px'}}>
                            <LeftArrow />
                        </div>
                        &nbsp;Return to Event Log
                    </>
                }
                onClick={() => setSubview({ subviewId: 'event-log', props: {} })}
                className='event-log-return'
            />
            <Table
                tableData={{
                    columns: [
                        {
                            title: "Event ID",
                            type: "string!",
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
                            disableUpdate: true,
                        },
                        {
                            title: "Source URI",
                            type: "string!",
                        },
                    ],
                    data: [[event.id, event.eventTypeId || null, event.title, new Date(event.startDate), event.value, event.source, event.sourceUri]],
                    validateData: (data, _, c) => {
                        if(c == 1 && data && !eventTypes?.find(et => et.id == data)) {
                            return false;
                        }
                        return true;
                    }
                }}
                tableHeader={{
                    title: "General Information",
                    onDataUpdate: async (updates) => {
                        const request: BulkUpdateEventRequest = {};
                        updates.forEach((row, _) => {
                            row.forEach((col, c) => {
                                if(!col) return;

                                const eventId = event.id;
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
                    },
                }}
                loading={loading}
                useDataWhileLoading={true} 
            />
            <Table
                tableData={{
                    columns: [
                        {
                            title: 'Field ID',
                            type: 'string!',
                            disableUpdate: true,
                        },
                        {
                            title: 'Field',
                            type: 'string?',
                            disableUpdate: true,
                        },
                        {
                            title: 'Property',
                            type: 'string?',
                        }
                    ],
                    data: fieldPropMap,
                    validateData: (data, r, c) => {
                        if(c == 2 
                            && data !== null 
                            && data !== "" 
                            && !((data as string) in troupe!.memberPropertyTypes)
                        ) {
                            return false;
                        }
                        return true;
                    }
                }}
                tableHeader={{
                    title: 'Field to Property Map',
                    onDataUpdate: (updates) => openDialog({
                        title: 'Confirm Update Field to Property Map',
                        content: `Are you sure that you want to update the field to property map for event ${event.title}?`,
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

                                    const updateProperties: BulkUpdateEventRequest[string]['updateProperties'] = {};
                                    const removeProperties: BulkUpdateEventRequest[string]['removeProperties'] = [];
                                    updates.forEach((row, r) => {
                                        if(row[2] === null) {
                                            removeProperties.push(fieldPropMap[r][0]! as string);
                                        } else if(row[2] !== undefined) {
                                            updateProperties[fieldPropMap[r][0]!] = row[2] as string;
                                        }
                                    })

                                    updateEvents({
                                        [eventId]: {
                                            updateProperties,
                                            removeProperties,
                                        }
                                    });
                                }
                            },
                        ]
                    }) 
                }}
                loading={loading}
                useDataWhileLoading={true}
            />
        </div>
    )
}

const EventTypeInformation = ({ eventTypeId, setSubview }: EventTypeInformationProps & SetEventLogSubview) => {
    const { lastUpdated, loading } = useMetadata();
    const { eventTypes } = useEventTypes();
    // const { openDialog, closeDialog } = useDialogToggle();
    const eventType = eventTypes!.find(et => et.id == eventTypeId)!;    

    return (
        <div className='event-information content-inner-view'>
            <ContentHeader title='Event Log' lastUpdated={lastUpdated} />
            <div className='content-notifications'>
                {/* <Notification notificationType='info' text="Hello world" /> */}
            </div>
            <h3>Event Type Information for { eventType.title }</h3>
            <Button 
                buttonType={1}
                text={
                    <>
                        <div style={{width:'20px', height:'20px'}}>
                            <LeftArrow />
                        </div>
                        &nbsp;Return to Event Log
                    </>
                }
                onClick={() => setSubview({ subviewId: 'event-log', props: {} })}
                className='event-log-return'
            />
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
                    data: [[eventType.id, eventType.title, eventType.value]],
                }}
                tableHeader={{
                    title: "Event Types",
                }}
                loading={loading}
                useDataWhileLoading={eventTypes && loading} 
            />
            <Table
                tableData={{
                    columns: [
                        {
                            title: "URI",
                            type: "string!",
                        },
                    ],
                    data: eventType.sourceFolderUris.map(uri => [uri]),
                }}
                tableHeader={{
                    title: "Source Folder URIs",
                }}
                loading={loading}
                useDataWhileLoading={eventTypes && loading} 
            />
        </div>
    )
}

const EventLogView = () => {
    const [{ subviewId, props }, setSubview] = useState<EventLogSubview>({ subviewId: 'event-log', props: {} });
    return (
        <div className='content-view'>
            {
                subviewId == "event-info"
                    ? <EventInformation setSubview={setSubview} {...props} />
                    : subviewId == "event-type-info"
                    ? <EventTypeInformation setSubview={setSubview} {...props} />
                    : <EventLog setSubview={setSubview} />
            }
            <ContentFooter />
        </div>
    )
}

export default EventLogView;