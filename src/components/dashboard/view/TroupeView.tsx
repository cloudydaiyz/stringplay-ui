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
                        type UTP = UpdateTroupeRequest['updateMemberProperties'];

                        const updateMemberProperties: UTP = {};
                        updates.forEach((row, r) => {
                            if(!row) return;
                            const required = (row[2] !== undefined ? row[2] : data[r][2]) as boolean;
                            const prop = (row[0] || data[r][0]) as keyof UTP;
                            const newValue = (row[1] || data[r][1]) + (required ? "!" : "?") as UTP[keyof UTP];
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
                        return updateTroupe({
                            updatePointTypes: arrayToObject(
                                updates, 
                                (row, r) => [
                                    (row[0] || data[r][0]) as keyof UPT, 
                                    {
                                        startDate: ((row[1] || data[r][1]) as Date).toISOString(),
                                        endDate: ((row[2] || data[r][2]) as Date).toISOString(),
                                    } as UPT[keyof UPT]
                                ]
                            )
                        });
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
                ],
                data: !loading && !troupe 
                    ? [[
                        defaultConfig.troupe.logSheetUri, 
                        defaultConfig.troupe.originEventId || null, 
                        defaultConfig.troupe.syncLock, 
                    ]] 
                    : [[
                        troupe?.logSheetUri || "err", 
                        troupe?.originEventId || null, 
                        troupe?.syncLock || false, 
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
    const { lastUpdated } = useMetadata();

    return (
        <div className='content-view'>
            <div className='content-inner-view'>
                <ContentHeader title='Troupe' lastUpdated={lastUpdated} />
                <div className='content-notifications'>
                    {/* <Notification notificationType='info' text="Hello world" /> */}
                </div>
                <div className='content-stats'>
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