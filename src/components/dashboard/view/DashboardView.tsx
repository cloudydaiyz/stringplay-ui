import '../../../app/shared.css';
import './DashboardView.css';

import CategoricalStatistic from '../CategoricalStatistic';
import CumulativeStatistic from '../CumulativeStatistic';
import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Table from '../Table';
import UpcomingBirthdays from '../UpcomingBirthdays';
import { useClient, useTroupe } from '../../../lib/api-client';

const DashboardView = () => {
    const { dashboard } = useClient();

    return (
        <div className='content-view'>
            <div className='content-inner-view'>
                <ContentHeader title='Dashboard' />
                {/* <ContentHeader title={ dashboard ? dashboard.troupeId : 'Dashboard' } /> */}
                <div className='content-notifications'>
                    {/* <Notification notificationType='info' text="Hello world" /> */}
                </div>
                <div className='content-stats'>
                    <UpcomingBirthdays
                        birthdays={[
                            {
                                firstName: "Kylan",
                                lastName: "Duncan",
                                birthday: new Date(),
                            },
                            {
                                firstName: "Kylan",
                                lastName: "Duncan",
                                birthday: new Date(),
                            },
                            {
                                firstName: "Kylan",
                                lastName: "Duncan",
                                birthday: new Date(),
                            },
                            {
                                firstName: "Kylan",
                                lastName: "Duncan",
                                birthday: new Date(),
                            },
                            {
                                firstName: "Kylan",
                                lastName: "Duncan",
                                birthday: new Date(),
                            },
                        ]}
                        loading={false}
                    />
                    <div className='dashboard-cumulative'>
                        <CumulativeStatistic accumulator='total' statistic='blah' value={6} loading={false} />
                        <CumulativeStatistic accumulator='total' statistic='blah' value={6} loading={false} />
                        <CumulativeStatistic accumulator='total' statistic='blah' value={6} loading={false} />
                        <CumulativeStatistic accumulator='total' statistic='blah' value={6} loading={false} />
                        <CumulativeStatistic accumulator='total' statistic='blah' value={6} loading={false} />
                    </div>
                    <div className="dashboard-categorical">
                        <CategoricalStatistic
                            data={[
                                {name: 'person 1', value: 10},
                                {name: 'person 2', value: 10},
                                {name: 'person 3', value: 10},
                                {name: 'person 4', value: 10},
                                {name: 'person 5', value: 10},
                                {name: 'person 6', value: 10},
                                {name: 'person 7', value: 10},
                                {name: 'person 8', value: 10},
                            ]}
                            title='statistic 1'
                            loading={false}
                        />
                        <CategoricalStatistic
                            data={[
                                {name: 'person 1', value: 10},
                                {name: 'person 2', value: 10},
                                {name: 'person 3', value: 10},
                            ]}
                            title='statistic 2'
                            loading={false}
                        />
                        <CategoricalStatistic
                            data={[
                                {name: 'person 1', value: 10},
                                {name: 'person 2', value: 10},
                                {name: 'person 3', value: 10},
                                {name: 'person 4', value: 10},
                                {name: 'person 5', value: 10},
                                {name: 'person 6', value: 10},
                                {name: 'person 7', value: 10},
                            ]}
                            title='statistic 3'
                            loading={false}
                        />
                        <CategoricalStatistic
                            data={[
                                {name: 'person 1', value: 10},
                                {name: 'person 2', value: 10},
                                {name: 'person 3', value: 10},
                                {name: 'person 4', value: 10},
                                {name: 'person 5', value: 10},
                            ]}
                            title='statistic 4'
                            loading={false}
                        />
                    </div>
                    <Table
                        tableData={{
                            columns: [
                                {
                                    title: "Hello world",
                                    type: "string!",
                                },
                                {
                                    title: "Hello world",
                                    type: "number!",
                                },
                                {
                                    title: "Hello world",
                                    type: "boolean!",
                                },
                            ],
                            data: [
                                ["Hello", 123, true],
                                ["Hello", 123, true],
                                ["Hello", 123, true],
                                ["Hello", 123, true],
                                ["Hello", 123, true],
                                ["Hello", 123, true],
                            ]
                        }}
                    />
                </div>
            </div>
            <ContentFooter />
        </div>
    )
}

export default DashboardView;