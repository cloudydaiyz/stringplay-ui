import '../../../app/shared.css';

import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Table from '../Table';

const SettingsView = () => {
  return (
    <div className='content-view'>
        <div className='content-inner-view'>
            <ContentHeader title='Troupe Settings' />
            <div className='content-notifications'>
                {/* <Notification notificationType='info' text="Hello world" /> */}
            </div>
            <div className='content-stats'>
                <Table
                    tableData={{
                        columns: [
                            {
                                title: "Log Sheet URL",
                                type: "string!",
                            },
                            {
                                title: "Origin Event ID",
                                type: "string!",
                            },
                            {
                                title: "Sync Lock",
                                type: "boolean!",
                            },
                        ],
                        data: [
                            ["https://google.com", "AA", true],
                        ]
                    }}
                    tableHeader={{
                        title: "Settings"
                    }}
                />
            </div>
        </div>
        <ContentFooter />
    </div>
  )
}

export default SettingsView;