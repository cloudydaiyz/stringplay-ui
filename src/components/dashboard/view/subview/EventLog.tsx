import { BulkUpdateEventRequest, BulkUpdateEventTypeRequest } from "@cloudydaiyz/stringplay-core/types/api";
import { useMetadata, useEventTypes, useEvents } from "../../../../lib/api-client";
import { defaultConfig } from "../../../../lib/mock-data";
import { useDialogToggle } from "../../../../lib/toggle-dialog";
import { SetEventLogSubview } from "../../../../types/view-types";
import ContentHeader from "../../layout/ContentHeader";
import Table from "../../Table";
import { useConsoleNotifications, useEventLogNotifications } from "../../../../lib/notifications";
import Notification from '../../Notification';
import { visitedPages } from "../../../../lib/global";
import { useState } from "react";

function EventTypesTable({ setSubview }: SetEventLogSubview) {
    const { loading } = useMetadata();
    const { eventTypes, createEventTypes, updateEventTypes, deleteEventTypes } = useEventTypes();
    const { openConfirmDialog } = useDialogToggle();

    return (
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
                onDataCreate: (newRows) => openConfirmDialog({
                    title: 'Confirm Create Event Types',
                    content: 'Are you sure that you want to create the(se) event type(s)?',
                    onConfirm: () => createEventTypes(
                        newRows.map(row => ({
                            title: row[1] as string,
                            value: row[2] as number,
                            sourceFolderUris: [],
                        }))
                    )
                }),
                onDataUpdate: (updates) => openConfirmDialog({
                    title: 'Confirm Update Event Types',
                    content: 'Are you sure that you want to update the(se) event type(s)?',
                    onConfirm: () => {
                        const request: BulkUpdateEventTypeRequest = {};
                        updates.forEach((row, r) => {
                            row.forEach((col, c) => {
                                if(!col) return;

                                const eventTypeId = eventTypes![r].id;
                                if(!request[eventTypeId]) request[eventTypeId] = {};
                                
                                switch(c) {
                                    case 1:
                                        request[eventTypeId].title = col as string;
                                        break;
                                    case 2:
                                        request[eventTypeId].value = col as number;
                                        break;
                                    default:
                                        break;
                                }
                            });
                        });
                        return updateEventTypes(request);
                    }
                }),
                onDataDelete: (deleteIndicies) => openConfirmDialog({
                    title: 'Confirm Delete Event Types',
                    content: 'Are you sure that you want to delete the(se) event types(s)?',
                    onConfirm: () => deleteEventTypes(
                        eventTypes?.filter((_, i) => deleteIndicies[i]).map(et => et.id) || []
                    ),
                }),
            }}
            loading={loading}
            useDataWhileLoading={eventTypes && loading} 
        />
    );
}

function EventsTable({ setSubview }: SetEventLogSubview) {
    const { loading } = useMetadata();
    const { eventTypes } = useEventTypes();
    const { events, createEvents, updateEvents, deleteEvents, } = useEvents();
    const { openConfirmDialog } = useDialogToggle();

    return (
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
                onDataCreate: (newRows) => openConfirmDialog({
                    title: 'Confirm Create Events',
                    content: 'Are you sure that you want to create the(se) event(s)?',
                    onConfirm: () => createEvents(
                        newRows.map(row => ({
                            eventTypeId: row[1] as string || undefined,
                            title: row[2] as string,
                            startDate: (row[3] as Date).toISOString(),
                            value: (row[4] as number),
                            sourceUri: row[6] as string,
                        }))
                    ),
                }),
                onDataUpdate: async (updates) => openConfirmDialog({
                    title: 'Confirm Update Events',
                    content: 'Are you sure that you want to update the(se) event(s)?',
                    onConfirm: () => {
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
                }),
                onDataDelete: (deleteIndicies) => openConfirmDialog({
                    title: 'Confirm Delete Events',
                    content: 'Are you sure that you want to delete the(se) event(s)?',
                    onConfirm: () => deleteEvents(
                        events?.filter((_, i) => deleteIndicies[i]).map(e => e.id) || []
                    ),
                }),
            }}
            loading={loading}
            useDataWhileLoading={events && loading} 
        />
    );
}

/** Subview that shows an overview of events and event types */
export const EventLog = ({ setSubview }: SetEventLogSubview) => {
    const { consoleNotif, removeConsoleNotif } = useConsoleNotifications();
    const { eventLogNotif, removeEventLogNotif } = useEventLogNotifications();
    const { loading } = useMetadata();
    const { events } = useEvents();
    const { openDialog, closeDialog } = useDialogToggle();
    const [ acknowledgedFailure, setAcknowledgedFailure ] = useState(false);

    if(!loading && !events && !acknowledgedFailure) {
        openDialog({
            title: "Unable to load data",
            content: "We are unable to load event data for this troupe at the moment. "
                + "Please try navigating to another view or refreshing your page.",
            actions: [{
                label: "OKAY",
                color: 'var(--g2)',
                onClick: async () => { closeDialog(); setAcknowledgedFailure(true) },
            }],
        })
    }

    return (
        <div className='content-inner-view'>
            <ContentHeader title='Event Log' />
                <div 
                    className='content-notifications' 
                    style={
                        (consoleNotif.length + eventLogNotif.length) == 0 ? 
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
                        eventLogNotif.map((props, i) => (
                            <Notification 
                                {...props} 
                                onClick={() => removeEventLogNotif(i)}
                                key={(i + consoleNotif.length) * Date.now()}
                            />
                        )) 
                    }
                </div>
            <div 
                className={
                    'content-stats '
                    + (visitedPages.includes("EventLog") ? "" : "init")
                }
                onAnimationStart={() => visitedPages.push("EventLog")}
            >
                <EventTypesTable setSubview={setSubview} />
                <EventsTable setSubview={setSubview} />
            </div>
        </div>
    );
}