import { useState } from 'react';
import '../../../app/shared.css';

import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import ContentNav from '../layout/ContentNav';
import Table from '../Table';

type MemberLogTable = 'membership-info'|'membership-points'|'events-attended';

const MemberLogView = () => {
    const [table, setTable] = useState<MemberLogTable>('membership-info');

    return (
        <div className='content-view'>
            <div className='content-inner-view'>
                <ContentHeader title='Member Log' />
                <div className='content-notifications'>
                    {/* <Notification notificationType='info' text="Hello world" /> */}
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
                <div className='content-stats'>
                    {
                        table == 'membership-points'
                        ? <Table
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
                                    {
                                        title: "Fall Semester",
                                        type: "number!",
                                    },
                                    {
                                        title: "Spring Semester",
                                        type: "number!",
                                    },
                                ],
                                data: [
                                    ["a", "Kylan", "Duncan", 45, 25, 20],
                                    ["b", "Kylan", "Duncan", 25, 5, 20],
                                    ["c", "Kylan", "Duncan", 20, 0, 20],
                                    ["d", "Kylan", "Duncan", 25, 20, 5],
                                    ["e", "Kylan", "Duncan", 15, 10, 5],
                                    ["f", "Kylan", "Duncan", 5, 5, 0],
                                ]
                            }}
                            tableHeader={{
                                title: "Membership Points"
                            }}
                        />
                        : table == 'events-attended'
                        ? <Table
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
                                        title: "AA",
                                        type: "boolean!",
                                    },
                                    {
                                        title: "AB",
                                        type: "boolean!",
                                    },
                                ],
                                data: [
                                    ["a", "Kylan", "Duncan", true, true],
                                    ["b", "Kylan", "Duncan", true, true],
                                    ["c", "Kylan", "Duncan", false, true],
                                    ["d", "Kylan", "Duncan", true, false],
                                    ["e", "Kylan", "Duncan", false, false],
                                    ["f", "Kylan", "Duncan", true, false],
                                ]
                            }}
                            tableHeader={{
                                title: "Events Attended"
                            }}
                        />
                        : <Table
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
                                        title: "Email",
                                        type: "string!",
                                    },
                                    {
                                        title: "Birthday",
                                        type: "date?",
                                    },
                                ],
                                data: [
                                    ["a", "Kylan", "Duncan", "kduncan@utexas.edu", new Date('04-22-2003')],
                                    ["b", "Kylan", "Duncan", "kduncan@utexas.edu", new Date('04-22-2003')],
                                    ["c", "Kylan", "Duncan", "kduncan@utexas.edu", new Date('04-22-2003')],
                                    ["d", "Kylan", "Duncan", "kduncan@utexas.edu", new Date('04-22-2003')],
                                    ["e", "Kylan", "Duncan", "kduncan@utexas.edu", new Date('04-22-2003')],
                                    ["f", "Kylan", "Duncan", "kduncan@utexas.edu", new Date('04-22-2003')],
                                ]
                            }}
                            tableHeader={{
                                title: "Membership Information"
                            }}
                        />
                    }
                </div>
            </div>
            <ContentFooter />
        </div>
    )
}

export default MemberLogView;