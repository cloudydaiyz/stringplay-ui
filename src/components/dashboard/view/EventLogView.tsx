import '../../../app/shared.css';

import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Table from '../Table';

const EventLogView = () => {
  return (
    <div className='content-view'>
        <div className='content-inner-view'>
            <ContentHeader title='Event Log' />
            <div className='content-notifications'>
                {/* <Notification notificationType='info' text="Hello world" /> */}
            </div>
            <div className='content-stats'>
                <Table
                    tableData={{
                        columns: [
                            {
                                title: "Type ID",
                                type: "string!",
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
                        data: [
                            ["A", "General Meeting", 1],
                            ["B", "Social", 2],
                            ["C", "Technical Workshop", 3],
                            ["D", "Corporate", 2],
                            ["E", "Outreach", 3],
                        ]
                    }}
                    tableHeader={{
                        title: "Event Types"
                    }}
                />
                <Table
                    tableData={{
                        columns: [
                            {
                                title: "Event ID",
                                type: "string!",
                            },
                            {
                                title: "Type ID",
                                type: "string!",
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
                                type: "number!",
                            },
                            {
                                title: "Source URI",
                                type: "string!",
                            },
                        ],
                        data: [
                            ["AA", "A", "General Meeting 1", new Date('08-16-2024'), 1, "https://google.com"],
                            ["AA", "A", "General Meeting 2", new Date('08-23-2024'), 1, "https://google.com"],
                        ]
                    }}
                    tableHeader={{
                        title: "Events"
                    }}
                />
            </div>
        </div>
        <ContentFooter />
    </div>
  )
}

export default EventLogView;