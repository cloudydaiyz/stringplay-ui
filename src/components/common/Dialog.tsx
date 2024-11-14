import '../../app/shared.css';
import './Dialog.css';

import type { DialogProps } from '../../types/dialog-types';
import Button from './Button';
import { useDialogProps } from '../../lib/toggle-dialog';

/** Dialog that uses the `useDialogProps` function inherently */
export const ContextDialog = () => {
    const { props, lastOpened } = useDialogProps();
    const { title, content, actions, active } = props;

    const actionButtons = actions.map((action, i) => (
        <Button 
            style={{backgroundColor: action.color}}
            onClick={() => action.onClick()}
            text={action.label}
            key={i}
        />
    ));

    return (
        <div key={lastOpened.toISOString()} className={`app-dialog-overlay ${active ? 'active' : ''}`}>
            <div className='app-dialog'>
                <h3>
                    { title }
                </h3>
                { content }
                <div className='app-dialog-actions'>
                    { actionButtons }
                </div>
            </div>
        </div>
    );
}

const Dialog = ({ title, content, actions, active }: DialogProps) => {
    const actionButtons = actions.map((action, i) => (
        <Button 
            style={{backgroundColor: action.color}}
            onClick={() => action.onClick()}
            text={action.label}
            key={i}
        />
    ));

    return (
        <div className={`app-dialog-overlay ${active ? 'active' : ''}`}>
            <div className='app-dialog'>
                <h3>
                    { title }
                </h3>
                { content }
                <div className='app-dialog-actions'>
                    { actionButtons }
                </div>
            </div>
        </div>
    );
}

export default Dialog;