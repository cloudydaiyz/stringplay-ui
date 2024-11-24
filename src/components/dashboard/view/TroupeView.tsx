import { UpdateTroupeRequest } from '@cloudydaiyz/stringplay-core/types/api';
import '../../../app/shared.css';
import { useEvents, useMetadata, useTroupe } from '../../../lib/api-client';
import { arrayToObject } from '../../../lib/helper';
import { defaultConfig } from '../../../lib/mock-data';
import { useDialogToggle } from '../../../lib/toggle-dialog';
import { PROPERTY_TYPES } from '../../../types/table-types';

import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Table from '../Table';
import { useTroupeNotifications } from '../../../lib/notifications';
import Notification from '../Notification';
import { visitedPages } from '../../../lib/global';

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

const SettingsTable = () => {
    const { loading } = useMetadata();
    const { events } = useEvents();
    const { troupe, updateTroupe } = useTroupe();
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
                        true,
                    ]] 
                    : [[
                        troupe?.logSheetUri || "err", 
                        troupe?.originEventId || null, 
                        troupe?.syncLock || false, 
                        true,
                    ]],
                validateData: (data, _, c) => {
                    if(c == 1) {
                        return events?.some(e => e.id == data) || false;
                    }
                    return true;
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

const TroupeView = () => {
    const { troupeNotif, removeTroupeNotif } = useTroupeNotifications();

    return (
        <div className='content-view'>
            <div className='content-inner-view'>
                <ContentHeader title='Troupe' />
                <div className='content-notifications' style={troupeNotif.length == 0 ? {display: 'none'} : {}}>
                    { 
                        troupeNotif.map((props, i) => (
                            <Notification 
                                {...props} 
                                onClick={() => { setTimeout(() => removeTroupeNotif(i), 1000) }}
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
                    <SettingsTable />
                </div>
            </div>
            <ContentFooter />
        </div>
    );
}

export default TroupeView;