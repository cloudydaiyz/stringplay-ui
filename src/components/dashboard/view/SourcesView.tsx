import { BulkUpdateEventRequest, BulkUpdateEventTypeRequest } from "@cloudydaiyz/stringplay-core/types/api";
import { useMetadata, useEvents, useEventTypes } from "../../../lib/api-client";
import { defaultConfig } from "../../../lib/mock-data";
import { useDialogToggle } from "../../../lib/toggle-dialog";
import ContentHeader from "../layout/ContentHeader";
import Table from "../Table";
import Notification from '../Notification';
import { TableDataType } from "../../../types/table-types";
import { useState } from "react";
import { visitedPages } from "../../../lib/global";
import { useConsoleNotifications, useEventLogNotifications } from "../../../lib/notifications";
import ContentFooter from "../layout/ContentFooter";

const SourceFilesTable = () => {
    const { loading } = useMetadata();
    const { events, createEvents, updateEvents, deleteEvents, } = useEvents();
    const { openConfirmDialog } = useDialogToggle();

    return (
        <Table 
            tableData={{
                columns: [
                    {
                        title: "Source File URI",
                        type: "string!",
                    },
                    {
                        title: "Start Date",
                        type: "date!",
                    },
                    {
                        title: "Source Type",
                        type: "string!",
                        disableCreate: true,
                        disableUpdate: true,
                    },
                    {
                        title: "Event ID",
                        type: "string!",
                        disableCreate: true,
                        disableUpdate: true,
                    },
                ],
                data: !loading && !events 
                    ? defaultConfig.events.map(e => [e.sourceUri, new Date(e.startDate), e.source, e.id])
                    : events?.map(e => [e.sourceUri, new Date(e.startDate), e.source, e.id]) || [],
                validateData: (data, _, c) => {
                    if(c == 0 && data && events?.find(e => e.sourceUri == data)) {
                        return false;
                    }
                    return true;
                }
            }}
            tableHeader={{
                title: "Source Files",
                onDataCreate: (newRows) => openConfirmDialog({
                    title: "Confirm File Addition",
                    content: "Are you sure that you want to add these source files? This will automatically create new events.",
                    onConfirm: () => createEvents(
                        newRows.map(row => ({
                            title: "Untitled Event",
                            sourceUri: row[0] as string,
                            startDate: (row[1] as Date).toISOString(),
                        }))
                    )
                }),
                onDataUpdate: (updates) => openConfirmDialog({
                    title: "Confirm File Update",
                    content: "Are you sure that you want to update these source files? This will update the events associated with the files.",
                    onConfirm: () => {
                        const request: BulkUpdateEventRequest = {};
                        updates.forEach((row, r) => {
                            row.forEach((col, c) => {
                                if(!col) return;

                                const eventId = events![r].id;
                                if(!request[eventId]) request[eventId] = {};
                                
                                switch(c) {
                                    case 0:
                                        request[eventId].sourceUri = col as string;
                                        break;
                                    case 1:
                                        request[eventId].startDate = (col as Date).toISOString();
                                        break;
                                    default:
                                        break;
                                }
                            });
                        });
                        return updateEvents(request);
                    },
                }),
                onDataDelete: (deleteIndicies) => openConfirmDialog({
                    title: "Confirm File Deletion",
                    content: "Are you sure that you want to delete these source files? This will delete the events associated with the files.",
                    onConfirm: () => deleteEvents(
                        events?.filter((_, i) => deleteIndicies[i]).map(e => e.id) || []
                    ),
                }),
            }}
            loading={loading}
            useDataWhileLoading={events && loading}
        />
    )
}

const SourceFoldersTable = () => {
    const { loading } = useMetadata();
    const { eventTypes, createEventTypes, updateEventTypes, } = useEventTypes();
    const { openConfirmDialog } = useDialogToggle();

    const data: TableDataType[][] = [];
    const tableEventTypes = !loading && !eventTypes ? defaultConfig.eventTypes : eventTypes || [];
    for(const eventType of tableEventTypes) {
        eventType.sourceFolderUris.forEach(uri => data.push([uri, eventType.id]));
    }

    return (
        <Table 
            tableData={{
                columns: [
                    {
                        title: "Source Folder URI",
                        type: "string!",
                    },
                    {
                        title: "Event Type ID",
                        type: "string!",
                        disableCreate: true,
                        disableUpdate: true,
                    },
                ],
                data,
                validateData: (data, _, c) => {
                    if(c == 0 && data && eventTypes?.find(et => et.sourceFolderUris.includes(data as string))) {
                        return false;
                    }
                    return true;
                }
            }}
            tableHeader={{
                title: "Source Folders",
                onDataCreate: (newRows) => openConfirmDialog({
                    title: "Confirm Folder Addition",
                    content: "Are you sure that you want to add these source files? " +
                        "This will automatically create new event types.",
                    onConfirm: () => createEventTypes(
                        newRows.map(row => ({
                            title: "Untitled Event Type",
                            sourceFolderUris: [row[0] as string],
                            value: 0,
                        }))
                    )
                }),
                onDataUpdate: (updates) => openConfirmDialog({
                    title: "Confirm Folder Update",
                    content: "Are you sure that you want to update these source folders? " +
                        "This will update the event types associated with the folders.",
                    onConfirm: () => {
                        const request: BulkUpdateEventTypeRequest = {};
                        updates.forEach((row, r) => {
                            row.forEach((col, c) => {
                                if(!col) return;

                                const eventId = data[r][1] as string;
                                if(!request[eventId]) request[eventId] = {};
                                
                                switch(c) {
                                    case 0:
                                        request[eventId].addSourceFolderUris?.push(col as string);
                                        request[eventId].removeSourceFolderUris?.push(data[r][0] as string);
                                        break;
                                    default:
                                        break;
                                }
                            });
                        });
                        return updateEventTypes(request);
                    },
                }),
                // events?.filter((_, i) => deleteIndicies[i]).map(e => e.id) || []
                onDataDelete: (deleteIndicies) => openConfirmDialog({
                    title: "Confirm File Deletion",
                    content: "Are you sure that you want to delete these source folders? " + 
                        "This will remove the folders from their associated event type. " + 
                        "This will NOT remove the associated event type.",
                    onConfirm: () => {
                        const request: BulkUpdateEventTypeRequest = {};
                        deleteIndicies.forEach((deleteRow, r) => {
                            if(!deleteRow) return;

                            const eventId = data[r][1] as string;
                            if(!request[eventId]) request[eventId] = {};
                            request[eventId].removeSourceFolderUris?.push(data[r][0] as string);
                        });
                        return updateEventTypes(request);
                    }
                }),
            }}
            loading={loading}
            useDataWhileLoading={eventTypes && loading}
        />
    )
}

const SourcesView = () => {
    const { consoleNotif, removeConsoleNotif } = useConsoleNotifications();
    const { eventLogNotif, removeEventLogNotif } = useEventLogNotifications();
    const { loading } = useMetadata();
    const { events } = useEvents();
    const { eventTypes } = useEventTypes();
    const { openDialog, closeDialog } = useDialogToggle();
    const [ acknowledgedFailure, setAcknowledgedFailure ] = useState(false);

    if(!loading && (!events || !eventTypes) && !acknowledgedFailure) {
        openDialog({
            title: "Unable to load data",
            content: "We are unable to load member data for this troupe at the moment. "
                + "Please try navigating to another view or refreshing your page.",
            actions: [{
                label: "OKAY",
                color: 'var(--g2)',
                onClick: async () => { closeDialog(); setAcknowledgedFailure(true) },
            }],
        })
    }

    return (
        <div className='content-view'>
            <div className='content-inner-view'>
                <ContentHeader title='Collect Responses' />
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
                        + (visitedPages.includes("Sources") ? "" : "init")
                    }
                    onAnimationStart={() => visitedPages.push("Sources")}
                >
                    <SourceFilesTable />
                    <SourceFoldersTable />
                </div>
            </div>
            <ContentFooter />
        </div>
    );
}

export default SourcesView;