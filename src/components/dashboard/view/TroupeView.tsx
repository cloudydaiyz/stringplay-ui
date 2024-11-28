import { Troupe, UpdateTroupeRequest } from '@cloudydaiyz/stringplay-core/types/api';
import '../../../app/shared.css';
import { useEvents, useMetadata, useTroupe } from '../../../lib/api-client';
import { arrayToObject } from '../../../lib/helper';
import { defaultConfig } from '../../../lib/mock-data';
import { useDialogToggle } from '../../../lib/toggle-dialog';
import { PROPERTY_TYPES } from '../../../types/table-types';

import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Table from '../Table';
import { useConsoleNotifications, useTroupeNotifications } from '../../../lib/notifications';
import Notification from '../Notification';
import { visitedPages } from '../../../lib/global';
import { useState } from 'react';

const baseMemberProperties = ["Member ID", "First Name", "Last Name", "Email", "Birthday"] as const;
const basePointTypes = ["Total"] as const;

const MemberPropertyTypesTable = () => {
    const { loading } = useMetadata();
    const { troupe, updateTroupe } = useTroupe();
    const { openConfirmDialog } = useDialogToggle();

    const memberProperties = troupe 
        ? Object.keys(troupe?.memberPropertyTypes)
            .filter(t => !baseMemberProperties.includes(t as typeof baseMemberProperties[number])) 
        : [];

    const data = !loading && !troupe 
        ? Object.keys(defaultConfig.troupe.memberPropertyTypes).map(prop => [
            prop,
            defaultConfig.troupe.memberPropertyTypes[prop],
            defaultConfig.troupe.memberPropertyTypes[prop].endsWith("!"),
        ])
        : troupe 
            ? [
                ...baseMemberProperties.map(prop => [
                    prop,
                    troupe.memberPropertyTypes[prop].slice(0, -1),
                    troupe.memberPropertyTypes[prop].endsWith("!"),
                ]),
                ...memberProperties.map(prop => [
                    prop,
                    troupe.memberPropertyTypes[prop].slice(0, -1),
                    troupe.memberPropertyTypes[prop].endsWith("!"),
                ])
            ] 
            : [];

    return (
        <Table
            tableData={{
                columns: [
                    {
                        title: "Property",
                        type: "string!",
                        disableDelete: true,
                    },
                    {
                        title: "Type",
                        type: "string!",
                        disableDelete: true,
                    },
                    {
                        title: "Required",
                        type: "boolean!",
                        disableCreate: true,
                    },
                ],
                data,
                immutableRows: baseMemberProperties.map(() => true),
                validateData: (data, _, c) => {
                    if(c == 1) {
                        return PROPERTY_TYPES.some(t => t.slice(0, -1) === data);
                    }
                    return true;
                }
            }}
            tableHeader={{
                title: "Member Property Types",
                onDataCreate: (newRows) => openConfirmDialog({
                    title: newRows.length > 1 ? 'Confirm Create New Property Types' 
                        : 'Confirm Create New Property Type',
                    content: newRows.length > 1 ? 'Are you sure that you want to create these property types?' 
                        : 'Are you sure that you want to create this property type?',
                    onConfirm: () => {
                        type UTP = UpdateTroupeRequest['updateMemberProperties'];
                        return updateTroupe({
                            updateMemberProperties: arrayToObject(
                                newRows, 
                                (row) => [
                                    row[0] as keyof UTP, 
                                    row[1] + "?" as UTP[keyof UTP]
                                ]
                            )
                        });
                    }
                }),
                onDataUpdate: (updates) => openConfirmDialog({
                    title: 'Confirm Update Property Types',
                    content: 'Are you sure that you want to update these property types?',
                    onConfirm: () => {
                        type UMP = UpdateTroupeRequest['updateMemberProperties'];

                        const updateMemberProperties: UMP = {};
                        updates.forEach((row, r) => {
                            const isBaseMemberProp = baseMemberProperties.includes(
                                (row[0] || data[r][0]) as typeof baseMemberProperties[number]
                            );
                            if(!row || isBaseMemberProp) return;

                            const required = (row[2] !== undefined ? row[2] : data[r][2]) as boolean;
                            const prop = (row[0] || data[r][0]) as keyof UMP;
                            const newValue = (row[1] || data[r][1]) + (required ? "!" : "?") as UMP[keyof UMP];
                            updateMemberProperties[prop] = newValue;
                        });

                        return updateTroupe({ updateMemberProperties });
                    }
                }),
                onDataDelete: (deleteIndicies) => openConfirmDialog({
                    title: 'Confirm Delete Property Types',
                    content: 'Are you sure that you want to delete these property types?',
                    onConfirm: () => updateTroupe({
                        removeMemberProperties: data.filter((_, r) => deleteIndicies[r])
                            .map(row => row[0] as string),
                    }),
                }),
            }}
            loading={loading}
            useDataWhileLoading={troupe && loading}
        />
    );
}

const PointTypesTable = () => {
    const { loading } = useMetadata();
    const { troupe, updateTroupe } = useTroupe();
    const { openConfirmDialog } = useDialogToggle();

    const pointTypes = troupe 
        ? Object.keys(troupe?.pointTypes)
            .filter(t => !basePointTypes.includes(t as typeof basePointTypes[number])) 
        : [];

    const data = !loading && !troupe 
        ? [
            ...basePointTypes.map(t => [
                t,
                new Date(defaultConfig.troupe.pointTypes[t].startDate),
                new Date(defaultConfig.troupe.pointTypes[t].endDate),
            ]),
            ...pointTypes.map(t => [
                t,
                new Date(defaultConfig.troupe.pointTypes[t].startDate),
                new Date(defaultConfig.troupe.pointTypes[t].endDate),
            ]),
        ]
        : troupe 
            ? [
                ...basePointTypes.map(t => [
                    t,
                    new Date(troupe.pointTypes[t].startDate),
                    new Date(troupe.pointTypes[t].endDate),
                ]),
                ...pointTypes.map(t => [
                    t,
                    new Date(troupe.pointTypes[t].startDate),
                    new Date(troupe.pointTypes[t].endDate),
                ]),
            ] 
            : [];

    return (
        <Table
            tableData={{
                columns: [
                    {
                        title: "Title",
                        type: "string!",
                        disableDelete: true,
                    },
                    {
                        title: "Start Date",
                        type: "date!",
                        disableDelete: true,
                    },
                    {
                        title: "Finish Date",
                        type: "date!",
                        disableDelete: true,
                    },
                ],
                data,
                immutableRows: basePointTypes.map(() => true),
            }}
            tableHeader={{
                title: "Membership Point Types",
                onDataCreate: (newRows) => openConfirmDialog({
                    title: newRows.length > 1 ? 'Confirm Create New Point Types' 
                        : 'Confirm Create New Point Type',
                    content: newRows.length > 1 ? 'Are you sure that you want to create these membership point types?' 
                        : 'Are you sure that you want to create this membership point type?',
                    onConfirm: () => {
                        type UPT = UpdateTroupeRequest['updatePointTypes'];
                        return updateTroupe({
                            updatePointTypes: arrayToObject(
                                newRows, 
                                (row) => [
                                    row[0] as keyof UPT, 
                                    {
                                        startDate: (row[1] as Date).toISOString(),
                                        endDate: (row[2] as Date).toISOString(),
                                    } as UPT[keyof UPT]
                                ]
                            )
                        });
                    }
                }),
                onDataUpdate: (updates) => openConfirmDialog({
                    title: 'Confirm Update Point Types',
                    content: 'Are you sure that you want to update these membership point types?',
                    onConfirm: () => {
                        type UPT = UpdateTroupeRequest['updatePointTypes'];

                        const updatePointTypes: UPT = {};
                        updates.forEach((row, r) => {
                            const isBasePointType = basePointTypes.includes(
                                (row[0] || data[r][0]) as typeof basePointTypes[number]
                            );
                            if(isBasePointType) return;

                            updatePointTypes[(row[0] || data[r][0]) as string] = {
                                startDate: ((row[1] || data[r][1]) as Date).toISOString(),
                                endDate: ((row[2] || data[r][2]) as Date).toISOString(),
                            }
                        });

                        return updateTroupe({ updatePointTypes });
                    }
                }),
                onDataDelete: (deleteIndicies) => openConfirmDialog({
                    title: 'Confirm Delete Point Types',
                    content: 'Are you sure that you want to delete these membership point types?',
                    onConfirm: () => updateTroupe({
                        removePointTypes: data.filter((_, i) => deleteIndicies[i])
                            .map(row => row[0] as string)
                    })
                })
            }}
            loading={loading}
            useDataWhileLoading={troupe && loading}
        />
    );
}

const FieldMatchersTable = () => {
    const { loading } = useMetadata();
    const { troupe, updateTroupe } = useTroupe();
    const { openConfirmDialog } = useDialogToggle();

    const fieldMatchers = troupe 
        ? troupe.fieldMatchers
        : [];

    const data = !loading && !troupe 
        ? [
            ...defaultConfig.troupe.fieldMatchers.map(fm => [
                fm.priority,
                fm.fieldExpression,
                fm.filters.join(", "),
                fm.matchCondition,
                fm.memberProperty,
            ]),
        ]
        : troupe 
            ? [
                ...troupe.fieldMatchers.map(fm => [
                    fm.priority,
                    fm.fieldExpression,
                    fm.filters.join(","),
                    fm.matchCondition,
                    fm.memberProperty,
                ]),
            ]
            : [];

    return (
        <Table
            tableData={{
                columns: [
                    {
                        title: "Priority",
                        type: "number!",
                    },
                    {
                        title: "Field Expression",
                        type: "string!",
                    },
                    {
                        title: "Filters",
                        type: "string!",
                    },
                    {
                        title: "Match Condition",
                        type: "string!",
                    },
                    {
                        title: "Member Property",
                        type: "string!",
                    },
                ],
                data,
            }}
            tableHeader={{
                title: "Field Matchers",
                onDataCreate: (newRows) => openConfirmDialog({
                    title: 'Confirm Create New Field Matchers',
                    content: `Are you sure that you want to create the(se) field matcher(s) for this troupe?`,
                    onConfirm: () => {
                        const request: UpdateTroupeRequest = {};
                        request.updateFieldMatchers = [
                            ...fieldMatchers.map(() => null),
                            ...newRows.map<Troupe["fieldMatchers"][number]>((row) => ({
                                priority: row[0] as number,
                                fieldExpression: row[1] as string,
                                matchCondition: row[2] as Troupe["fieldMatchers"][number]["matchCondition"],
                                filters: (row[3] as string).split(",") as Troupe["fieldMatchers"][number]["filters"],
                                memberProperty: row[4] as string,
                            })),
                        ];
                        return updateTroupe(request);
                    }
                }),
                onDataDelete: (deleteIndicies) => openConfirmDialog({
                    title: 'Confirm Delete Source Folder URIs',
                    content: `Are you sure that you want to delete the(se) field matcher(s) for this troupe?`,
                    onConfirm: () => {
                        const request: UpdateTroupeRequest = {};
                        request.removeFieldMatchers = deleteIndicies.map((_, i) => i)
                            .filter((_, i) => deleteIndicies[i]);
                        return updateTroupe(request);
                    }
                }),
            }}
            loading={loading}
            useDataWhileLoading={troupe && loading} 
        />
    );
}

const SettingsTable = () => {
    const { loading } = useMetadata();
    const { events } = useEvents();
    const { troupe, updateTroupe, initiateSync } = useTroupe();
    const { openConfirmDialog } = useDialogToggle();

    return (
        <Table
            tableData={{
                columns: [
                    {
                        title: "Log Sheet URL",
                        type: "string!",
                        disableUpdate: true,
                    },
                    {
                        title: "Origin Event ID",
                        type: "string?",
                    },
                    {
                        title: "Sync Lock",
                        type: "boolean!",
                        disableUpdate: true,
                    },
                    {
                        title: "Manual Sync",
                        type: "action",
                        disableUpdate: true,
                    },
                ],
                data: !loading && !troupe 
                    ? [[
                        defaultConfig.troupe.logSheetUri, 
                        defaultConfig.troupe.originEventId || null, 
                        defaultConfig.troupe.syncLock, 
                        false,
                    ]] 
                    : [[
                        troupe?.logSheetUri || "err", 
                        troupe?.originEventId || null, 
                        troupe?.syncLock || false, 
                        troupe !== undefined && !troupe.syncLock,
                    ]],
                validateData: (data, _, c) => {
                    if(c == 1) {
                        return events?.some(e => e.id == data) || false;
                    }
                    return true;
                },
                onAction: (_, c) => {
                    if(c == 3) initiateSync();
                }
            }}
            tableHeader={{
                title: "Settings",
                onDataUpdate: (updates) => openConfirmDialog({
                    title: 'Confirm Update Settings',
                    content: 'Are you sure that you want to update these settings for the troupe?',
                    onConfirm: () => updateTroupe({
                        originEventId: updates[0][1] as string | null,
                    })
                }),
            }}
            loading={loading}
            useDataWhileLoading={troupe && loading}
        />
    );
}

const LimitsTable = () => {
    const { loading } = useMetadata();
    const { limits } = useTroupe();

    return (
        <Table
            tableData={{
                columns: [
                    {
                        title: "Get Operations Left",
                        type: "number!",
                    },
                    {
                        title: "Modify Operations Left",
                        type: "number!",
                    },
                    {
                        title: "Manual Syncs Left",
                        type: "number!",
                    },
                    {
                        title: "Property Types Left",
                        type: "number!",
                    },
                    {
                        title: "Point Types Left",
                        type: "number!",
                    },
                    {
                        title: "Field Matchers Left",
                        type: "number!",
                    },
                    {
                        title: "Event Types Left",
                        type: "number!",
                    },
                    {
                        title: "Source Folder URI Left",
                        type: "number!",
                    },
                    {
                        title: "Events Left",
                        type: "number!",
                    },
                    {
                        title: "Members Left",
                        type: "number!",
                    },
                ],
                data: !loading && !limits 
                    ? [[
                        defaultConfig.limits.getOperationsLeft,
                        defaultConfig.limits.modifyOperationsLeft,
                        defaultConfig.limits.manualSyncsLeft,
                        defaultConfig.limits.memberPropertyTypesLeft,
                        defaultConfig.limits.pointTypesLeft,
                        defaultConfig.limits.fieldMatchersLeft,
                        defaultConfig.limits.eventTypesLeft,
                        defaultConfig.limits.sourceFolderUrisLeft,
                        defaultConfig.limits.eventsLeft,
                        defaultConfig.limits.membersLeft,
                    ]] 
                    : [[
                        limits?.getOperationsLeft || -1,
                        limits?.modifyOperationsLeft || -1,
                        limits?.manualSyncsLeft || -1,
                        limits?.memberPropertyTypesLeft || -1,
                        limits?.pointTypesLeft || -1,
                        limits?.fieldMatchersLeft || -1,
                        limits?.eventTypesLeft || -1,
                        limits?.sourceFolderUrisLeft || -1,
                        limits?.eventsLeft || -1,
                        limits?.membersLeft || -1,
                    ]],
            }}
            tableHeader={{
                title: "Limits",
            }}
            loading={loading}
            useDataWhileLoading={limits && loading}
        />
    );
}

const TroupeView = () => {
    const { consoleNotif, removeConsoleNotif } = useConsoleNotifications();
    const { troupeNotif, removeTroupeNotif } = useTroupeNotifications();
    const { loading } = useMetadata();
    const { troupe } = useTroupe();
    const { openDialog, closeDialog } = useDialogToggle();
    const [ acknowledgedFailure, setAcknowledgedFailure ] = useState(false);

    if(!loading && !troupe && !acknowledgedFailure) {
        openDialog({
            title: "Unable to load data",
            content: "We are unable to load the data for this troupe at the moment. "
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
                <ContentHeader title='Troupe' />
                <div 
                    className='content-notifications' 
                    style={
                        (consoleNotif.length + troupeNotif.length) == 0 ? 
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
                        troupeNotif.map((props, i) => (
                            <Notification 
                                {...props} 
                                onClick={() => removeTroupeNotif(i)}
                                key={(i + consoleNotif.length) * Date.now()}
                            />
                        )) 
                    }
                </div>
                <div 
                    className={
                        'content-stats '
                        + (visitedPages.includes("TroupeView") ? "" : "init")
                    }
                    onAnimationStart={() => visitedPages.push("TroupeView")}
                >
                    <MemberPropertyTypesTable />
                    <PointTypesTable />
                    <FieldMatchersTable />
                    <SettingsTable />
                    <LimitsTable />
                </div>
            </div>
            <ContentFooter />
        </div>
    );
}

export default TroupeView;