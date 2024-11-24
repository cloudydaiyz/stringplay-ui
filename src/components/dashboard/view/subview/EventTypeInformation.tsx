import { BulkUpdateEventTypeRequest } from "@cloudydaiyz/stringplay-core/types/api";
import { useMetadata, useEventTypes } from "../../../../lib/api-client";
import { useDialogToggle } from "../../../../lib/toggle-dialog";
import { EventTypeInformationProps, SetEventLogSubview } from "../../../../types/view-types";
import { useEventLogNotifications } from "../../../../lib/notifications";
import Notification from '../../Notification';
import Button from "../../../common/Button";
import LeftArrow from "../../../svg/LeftArrow";
import ContentHeader from "../../layout/ContentHeader";
import Table from "../../Table";

export const EventTypeInformation = ({ eventTypeId, setSubview }: EventTypeInformationProps & SetEventLogSubview) => {
    const { loading } = useMetadata();
    const { eventTypes, updateEventTypes } = useEventTypes();
    const { openConfirmDialog } = useDialogToggle();
    const { eventLogNotif, removeEventLogNotif } = useEventLogNotifications();
    const eventType = eventTypes!.find(et => et.id == eventTypeId)!;    

    return (
        <div className='event-information content-inner-view'>
            <ContentHeader title='Event Log' />
            <div className='content-notifications' style={eventLogNotif.length == 0 ? {display: 'none'} : {}}>
                { 
                    eventLogNotif.map((props, i) => (
                        <Notification 
                            {...props} 
                            onClick={() => { setTimeout(() => removeEventLogNotif(i), 1000) }}
                        />
                    )) 
                }
            </div>
            <h3>Event Type Information for { eventType.title }</h3>
            <Button 
                buttonType={3}
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
            <div 
                className={
                    'content-stats '
                    // + (visitedPages.includes("EventTypeInformation") ? "" : "init")
                }
                // onAnimationStart={() => visitedPages.push("EventTypeInformation")}
            >
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
                        onDataUpdate: (updates) => openConfirmDialog({
                            title: 'Confirm Update Event Types',
                            content: `Are you sure that you want to update event type ${eventType.title}?`,
                            onConfirm: () => {
                                const request: BulkUpdateEventTypeRequest = {};
                                updates.forEach((row, _) => {
                                    row.forEach((col, c) => {
                                        if(!col) return;

                                        const eventTypeId = eventType.id;
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
                        onDataCreate: (newRows) => openConfirmDialog({
                            title: 'Confirm Create Source Folder URIs',
                            content: `Are you sure that you want to create the(se) source folder URI(s) for event type ${eventType.title}?`,
                            onConfirm: () => {
                                const request: BulkUpdateEventTypeRequest = {};
                                request[eventTypeId] = {
                                    addSourceFolderUris: newRows.map(row => (row[0] as string))
                                };
                                return updateEventTypes(request);
                            }
                        }),
                        onDataDelete: (deleteIndicies) => openConfirmDialog({
                            title: 'Confirm Delete Source Folder URIs',
                            content: `Are you sure that you want to delete the(se) source folder URI(s) for event type ${eventType.title}?`,
                            onConfirm: () => {
                                const request: BulkUpdateEventTypeRequest = {};
                                request[eventTypeId] = {
                                    removeSourceFolderUris: eventType.sourceFolderUris.filter((_, i) => deleteIndicies[i])
                                }
                                return updateEventTypes(request);
                            }
                        }),
                    }}
                    loading={loading}
                    useDataWhileLoading={eventTypes && loading} 
                />
            </div>
        </div>
    )
}