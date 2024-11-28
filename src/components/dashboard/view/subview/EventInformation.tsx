import { FieldToPropertyMap } from "@cloudydaiyz/stringplay-core/types";
import { BulkUpdateEventRequest, PublicEvent } from "@cloudydaiyz/stringplay-core/types/api";
import { useMetadata, useTroupe, useEventTypes, useEvents } from "../../../../lib/api-client";
import { objectToArray } from "../../../../lib/helper";
import { useDialogToggle } from "../../../../lib/toggle-dialog";
import { EventInformationProps, SetEventLogSubview } from "../../../../types/view-types";
import { useConsoleNotifications, useEventLogNotifications } from "../../../../lib/notifications";
import Notification from '../../Notification';
import Button from "../../../common/Button";
import LeftArrow from "../../../svg/LeftArrow";
import ContentHeader from "../../layout/ContentHeader";
import Table from "../../Table";

interface EventInformationTableProps extends EventInformationProps {
    event: PublicEvent;
}

function GeneralInformationTable({ event }: EventInformationTableProps) {
    const { loading } = useMetadata();
    const { eventTypes } = useEventTypes();
    const { updateEvents } = useEvents();
    const { openConfirmDialog } = useDialogToggle();
    
    return (
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
                onDataUpdate: (updates) => openConfirmDialog({
                    title: 'Confirm Update Event',
                    content: `Are you sure that you want to update event ${event.title}?`,
                    onConfirm: () => {
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
                }),
            }}
            loading={loading}
            useDataWhileLoading={true} 
        />
    );
}

function FieldToPropertyMapTable({ event, eventId }: EventInformationTableProps) {
    const { loading } = useMetadata();
    const { troupe } = useTroupe();
    const { updateEvents } = useEvents();
    const { openConfirmDialog } = useDialogToggle();

    const fieldPropMap: [keyof FieldToPropertyMap, string, string|null][] = objectToArray(
        event.fieldToPropertyMap, 
        (fieldId, fieldInfo) => ([fieldId, fieldInfo.field, fieldInfo.property])
    );

    return (
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
                validateData: (data, _, c) => {
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
                onDataUpdate: (updates) => openConfirmDialog({
                    title: 'Confirm Update Field to Property Map',
                    content: `Are you sure that you want to update the field to property map for event ${event.title}?`,
                    onConfirm: () => {
                        const updateProperties: BulkUpdateEventRequest[string]['updateProperties'] = {};
                        const removeProperties: BulkUpdateEventRequest[string]['removeProperties'] = [];
                        updates.forEach((row, r) => {
                            if(row[2] === null) {
                                removeProperties.push(fieldPropMap[r][0]! as string);
                            } else if(row[2] !== undefined) {
                                updateProperties[fieldPropMap[r][0]!].property = row[2] as string;
                            }
                        });

                        return updateEvents({
                            [eventId]: {
                                updateProperties,
                                removeProperties,
                            }
                        });
                    },
                }) 
            }}
            loading={loading}
            useDataWhileLoading={true}
        />
    );
}

/** Subview that shows detailed information about one event */
export const EventInformation = ({ eventId, setSubview }: EventInformationProps & SetEventLogSubview) => {
    const { events } = useEvents();
    const { consoleNotif, removeConsoleNotif } = useConsoleNotifications();
    const { eventLogNotif, removeEventLogNotif } = useEventLogNotifications();
    const event = events!.find(e => e.id == eventId!)!;

    return (
        <div className='event-information content-inner-view'>
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
            <h3>Event Information for { event.title }</h3>
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
            <div className="content-stats">
                <GeneralInformationTable event={event} eventId={eventId} />
                <FieldToPropertyMapTable event={event} eventId={eventId} />
            </div>
        </div>
    );
}