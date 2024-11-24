import { useState } from 'react';
import '../../../app/shared.css';

import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import ContentNav from '../layout/ContentNav';
import Table from '../Table';
import { useAttendees, useEvents, useMetadata, useTroupe } from '../../../lib/api-client';
import { defaultConfig } from '../../../lib/mock-data';
import { useDialogToggle } from '../../../lib/toggle-dialog';
import { BulkUpdateMemberRequest } from '@cloudydaiyz/stringplay-core/types/api';
import { TableData } from '../../../types/table-types';
import { arrayToObject } from '../../../lib/helper';
import { useMemberLogNotifications } from '../../../lib/notifications';
import Notification from '../Notification';
import { visitedPages } from '../../../lib/global';

const baseMemberProperties = ["Member ID", "First Name", "Last Name", "Email", "Birthday"] as const;
const basePointTypes = ["Total"] as const;

type MemberLogTable = 'membership-info' | 'membership-points' | 'events-attended';

const MembershipInformationTable = () => {
    const { loading } = useMetadata();
    const { troupe } = useTroupe();
    const { attendees, createMembers, updateMembers, deleteMembers } = useAttendees();
    const { openConfirmDialog } = useDialogToggle();

    const memberProperties = troupe 
        ? Object.keys(troupe?.memberPropertyTypes)
            .filter(t => !baseMemberProperties.includes(t as typeof baseMemberProperties[number])) 
        : [];

    const columns: TableData['columns'] = [
        {
            title: "Member ID",
            type: "string!",
        },
        {
            title: "First Name",
            type: "string!",
        },
        {
            title: "Last Name",
            type: "string!",
        },
        {
            title: "Email",
            type: "string!",
        },
        {
            title: "Birthday",
            type: "date?",
        },
        ...(
            troupe 
                ? memberProperties.map(p => ({
                    title: p,
                    type: troupe?.memberPropertyTypes[p],
                })) 
                : []
        )
    ];

    return (
        <Table
            tableData={{
                columns,
                data: !loading && !attendees
                    ? defaultConfig.attendees.map(a => [
                        a.properties["Member ID"].value, 
                        a.properties["First Name"].value, 
                        a.properties["Last Name"].value, 
                        a.properties["Email"].value, 
                        a.properties["Birthday"].value,
                    ]) 
                    : attendees?.map(a => [
                        a.properties["Member ID"].value, 
                        a.properties["First Name"].value, 
                        a.properties["Last Name"].value, 
                        a.properties["Email"].value, 
                        a.properties["Birthday"].value,
                        ...memberProperties.map(p => a.properties[p].value)
                    ]) || []
            }}
            tableHeader={{
                title: "Membership Information",
                onDataCreate: (newRows) => openConfirmDialog({
                    title: newRows.length > 1 ? 'Confirm Create New Members' 
                        : 'Confirm Create New Member',
                    content: newRows.length > 1 ? 'Are you sure that you want to create these members?' 
                        : 'Are you sure that you want to create this member?',
                    onConfirm: () => createMembers(
                        newRows.map(row => ({
                                properties: {
                                    ...arrayToObject(
                                        row.slice(5).map((prop) => (prop instanceof Date ? prop.toISOString() : prop)),
                                        (val, c) => [columns[c + 5].title, val]
                                    ),
                                    "Member ID": row[0] as string,
                                    "First Name": row[1] as string,
                                    "Last Name": row[2] as string,
                                    "Email": row[3] as string,
                                    "Birthday": row[4] instanceof Date ? row[4].toISOString() : null,
                                }
                            })
                        )
                    ),
                }),
                onDataUpdate: async (updates) => openConfirmDialog({
                    title: 'Confirm Update Members',
                    content: 'Are you sure that you want to update the(se) member(s)?',
                    onConfirm: () => {
                        const request: BulkUpdateMemberRequest = {};
                        updates.forEach((row, r) => {
                            row.forEach((col, c) => {
                                if(!col) return;

                                const memberId = attendees![r].id;
                                const property = columns[c].title;
                                const value = col instanceof Date ? col.toISOString() : col;
                                if(!request[memberId]) request[memberId] = { updateProperties: {} };

                                col ? request[memberId].updateProperties![property] = { value, override: true } 
                                    : request[memberId].removeProperties!.push(property);
                            });
                        });
                        return updateMembers(request);
                    }
                }),
                onDataDelete: async (deleteIndicies) => openConfirmDialog({
                    title: 'Confirm Delete Members',
                    content: 'Are you sure that you want to delete these members?',
                    onConfirm: () => deleteMembers(
                        attendees?.filter((_, i) => deleteIndicies[i]).map(a => a.id) || []
                    )
                }),
            }}
            loading={loading}
            useDataWhileLoading={attendees && loading}
        />
    );
}

const MembershipPointsTable = () => {
    const { loading } = useMetadata();
    const { attendees } = useAttendees();
    const { troupe } = useTroupe();
    
    const pointTypes = troupe 
        ? Object.keys(troupe?.pointTypes)
            .filter(t => !basePointTypes.includes(t as typeof basePointTypes[number])) 
        : [];

    return (
        <Table
            tableData={{
                columns: [
                    {
                        title: "Member ID",
                        type: "string!",
                    },
                    {
                        title: "First Name",
                        type: "string!",
                    },
                    {
                        title: "Last Name",
                        type: "string!",
                    },
                    {
                        title: "Total",
                        type: "number!",
                    },
                    ...pointTypes.map(p => ({ title: p, type: "number!" as const })),
                ],
                data: !loading && !attendees 
                    ? defaultConfig.attendees.map(a => [
                        a.properties["Member ID"].value,
                        a.properties["First Name"].value,
                        a.properties["Last Name"].value,
                        a.points["Total"],
                        ...pointTypes.map(t => a.points[t])
                    ])
                    : attendees?.map(a => [
                        a.properties["Member ID"].value,
                        a.properties["First Name"].value,
                        a.properties["Last Name"].value,
                        a.points["Total"],
                        ...pointTypes.map(t => a.points[t])
                    ]) || []
            }}
            tableHeader={{
                title: "Membership Points",
            }}
            loading={loading}
            useDataWhileLoading={attendees && loading}
        />
    );
}

const EventsAttendedTable = () => {
    const { loading } = useMetadata();
    const { events } = useEvents();
    const { attendees } = useAttendees();
    
    return (
        <Table
            tableData={{
                columns: [
                    {
                        title: "Member ID",
                        type: "string!",
                    },
                    {
                        title: "First Name",
                        type: "string!",
                    },
                    {
                        title: "Last Name",
                        type: "string!",
                    },
                    ...(events?.map(e => ({ title: e.title, type: "boolean!" as const })) || [])
                ],
                data: !loading && !attendees 
                    ? defaultConfig.attendees.map(a => [
                        a.properties["Member ID"].value,
                        a.properties["First Name"].value,
                        a.properties["Last Name"].value,
                        ...(events?.map(e => a.eventsAttended.includes(e.id)) || [])
                    ])
                    : attendees?.map(a => [
                        a.properties["Member ID"].value,
                        a.properties["First Name"].value,
                        a.properties["Last Name"].value,
                        ...(events?.map(e => a.eventsAttended.includes(e.id)) || [])
                    ]) || []
            }}
            tableHeader={{
                title: "Events Attended",
            }}
            loading={loading}
            useDataWhileLoading={attendees && loading}
        />
    );
}

const MemberLogView = () => {
    const [ table, setTable ] = useState<MemberLogTable>('membership-info');
    const { memberLogNotif, removeMemberLogNotif } = useMemberLogNotifications();

    return (
        <div className='content-view'>
            <div className='content-inner-view'>
                <ContentHeader title='Member Log' />
                <div className='content-notifications' style={memberLogNotif.length == 0 ? {display: 'none'} : {}}>
                    { 
                        memberLogNotif.map((props, i) => (
                            <Notification 
                                {...props} 
                                onClick={() => { setTimeout(() => removeMemberLogNotif(i), 1000) }}
                            />
                        )) 
                    }
                </div>
                <ContentNav
                    pageIdToTitleMap={[
                        {
                            key: 'membership-info',
                            title: 'Membership Information'
                        },
                        {
                            key: 'membership-points',
                            title: 'Membership Points'
                        },
                        {
                            key: 'events-attended',
                            title: 'Events Attended'
                        },
                    ]}
                    initialPageId='membership-info'
                    onClick={(key) => setTable(key as MemberLogTable)}
                />
                <div 
                    className={
                        'content-stats '
                        + (visitedPages.includes("MemberLogView") ? "" : "init")
                    }
                    onAnimationStart={() => visitedPages.push("MemberLogView")}
                >
                    {
                        table == 'membership-points'
                        ? <MembershipPointsTable />
                        : table == 'events-attended'
                        ? <EventsAttendedTable />
                        : <MembershipInformationTable />
                    }
                </div>
            </div>
            <ContentFooter />
        </div>
    )
}

export default MemberLogView;