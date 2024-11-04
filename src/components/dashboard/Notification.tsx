import { useState } from 'react';
import '../../app/shared.css';
import Button from '../common/Button';
import Error from '../svg/Error';
import Info from '../svg/Info';
import Warning from '../svg/Warning';
import XMark from '../svg/XMark';
import './Notification.css';

interface NotificationProps {
    notificationType: 'info' | 'warning' | 'error';
    text: string;
}

const Notification = ({ notificationType, text }: NotificationProps) => {
    const [done, setDone] = useState(false);

    return (
        <div className={`app-notification content-unit ${notificationType} ${done && 'done'}`}>
            <div className='app-notification-icon'>
            {
                notificationType == 'warning' ? <Warning />
                : notificationType == 'error' ? <Error />
                : <Info />
            }
            </div>
            <p>{ text }</p>
            <Button buttonType={2} text={<XMark />} onClick={() => setDone(true)} />
        </div>
    )
}

export default Notification;