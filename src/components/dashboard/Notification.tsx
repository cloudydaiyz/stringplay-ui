import '../../app/shared.css';
import './Notification.css';

import Button from '../common/Button';
import Error from '../svg/Error';
import Info from '../svg/Info';
import Warning from '../svg/Warning';
import Check from '../svg/Check';

import { useState } from 'react';

export interface NotificationProps {
    notificationType: 'info' | 'warning' | 'error' | 'success';
    text: string;
}

const Notification = ({ notificationType, text, onClick }: NotificationProps & { onClick: () => void }) => {
    const [done, setDone] = useState(false);

    return (
        <div className={`app-notification content-unit ${notificationType} ${done && 'done'}`}>
            <div className='app-notification-icon'>
                { notificationType == 'info' && <Info /> }
                { notificationType == 'warning' && <Warning /> }
                { notificationType == 'error' && <Error /> }
                { notificationType == 'success' && <Check /> }
            </div>
            <div className='app-notification-content'>
                { notificationType == 'info' && <h3>FYI</h3> }
                { notificationType == 'warning' && <h3>Heads up!</h3> }
                { notificationType == 'error' && <h3>An error has occurred.</h3> }
                { notificationType == 'success' && <h3>Success!</h3> }
                <p>{ text }</p>
            </div>
            <Button 
                buttonType={2} 
                text={<h3>CLOSE</h3>}
                onClick={() => { setDone(true); onClick() }} 
            />
        </div>
    )
}

export default Notification;