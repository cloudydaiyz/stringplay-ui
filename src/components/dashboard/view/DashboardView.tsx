import '../../../app/shared.css';
import ContentFooter from '../layout/ContentFooter';
import ContentHeader from '../layout/ContentHeader';
import Notification from '../Notification';
// import Notification from '../Notification';
import UpcomingBirthdays from '../UpcomingBirthdays';
import './DashboardView.css';

const DashboardView = () => {
  return (
    <div className='dashboard-view'>
        <div className='dashboard-inner-view'>
            <ContentHeader title='Content at a glance' />
            <div className='dashboard-notifications'>
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
                <Notification notificationType='info' text="Hello world" />
            </div>
            <UpcomingBirthdays
                birthdays={[
                    {
                        firstName: "Kylan",
                        lastName: "Duncan",
                        birthday: new Date(),
                    }
                ]}
            />
        </div>
        <ContentFooter />
    </div>
  )
}

export default DashboardView;