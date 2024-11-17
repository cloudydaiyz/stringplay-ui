import '../../../app/shared.css';
import './EventLogView.css';

import ContentFooter from '../layout/ContentFooter';

import { useState } from 'react';
import { EventLogSubview } from '../../../types/view-types';
import { EventInformation } from './subview/EventInformation';
import { EventTypeInformation } from './subview/EventTypeInformation';
import { EventLog } from './subview/EventLog';

const EventLogView = () => {
    const [{ subviewId, props }, setSubview] = useState<EventLogSubview>({ subviewId: 'event-log', props: {} });
    
    return (
        <div className='content-view'>
            {
                subviewId == "event-info"
                    ? <EventInformation setSubview={setSubview} {...props} />
                    : subviewId == "event-type-info"
                    ? <EventTypeInformation setSubview={setSubview} {...props} />
                    : <EventLog setSubview={setSubview} />
            }
            <ContentFooter />
        </div>
    )
}

export default EventLogView;