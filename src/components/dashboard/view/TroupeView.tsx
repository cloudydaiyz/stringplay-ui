import '../../../app/shared.css';

import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Table from '../Table';

const TroupeView = () => {
  return (
    <div className='content-view'>
        <div className='content-inner-view'>
            <ContentHeader title='Troupe' />
            <div className='content-notifications'>
                {/* <Notification notificationType='info' text="Hello world" /> */}
            </div>
            <div className='content-stats'>
                <Table
                    tableData={{
                        columns: [
                            {
                                title: "Property",
                                type: "string!",
                            },
                            {
                                title: "Type",
                                type: "string!",
                            },
                            {
                                title: "Required",
                                type: "boolean!",
                            },
                        ],
                        data: [
                            ["First Name", "string", true],
                            ["Last Name", "string", true],
                            ["Member ID", "string", true],
                            ["Email", "string", true],
                            ["Birthday", "date", false],
                        ]
                    }}
                    tableHeader={{
                        title: "Member Property Types"
                    }}
                />
                <Table
                    tableData={{
                        columns: [
                            {
                                title: "Title",
                                type: "string!",
                            },
                            {
                                title: "Start Date",
                                type: "date!",
                            },
                            {
                                title: "Finish Date",
                                type: "date!",
                            },
                        ],
                        data: [
                            ["Total", new Date('08-16-2024'), new Date('08-30-2024')],
                            ["Fall Semester", new Date('08-16-2024'), new Date('08-30-2024')],
                            ["Spring Semester", new Date('08-16-2024'), new Date('08-30-2024')],
                        ]
                    }}
                    tableHeader={{
                        title: "Point Types"
                    }}
                />
            </div>
        </div>
        <ContentFooter />
    </div>
  )
}

export default TroupeView;