import { createContext, useContext, useReducer } from "react";
import { NotificationProps } from "../components/dashboard/Notification";

type NotificationsDispatchAction = { action: 'add', notif: NotificationProps } 
    | { action: 'remove', index: number }

function notificationsDispatch(
    notifications: NotificationProps[], 
    action: NotificationsDispatchAction
) {
    const newNotifications = [ ...notifications ];
    if(action.action == 'add') {
        return newNotifications.concat(action.notif);
    } else {
        newNotifications.splice(action.index, 1);
        return newNotifications;
    }
}

// Notifications for each view and the corresponding Context for all notifications
export function useNotifications() {
    const [dashboardNotif, dashboardNotifDispatch] = useReducer(notificationsDispatch, []);
    const [troupeNotif, troupeNotifDispatch] = useReducer(notificationsDispatch, []);
    const [eventLogNotif, eventLogNotifDispatch] = useReducer(notificationsDispatch, []);
    const [memberLogNotif, memberLogNotifDispatch] = useReducer(notificationsDispatch, []);

    return {
        dashboardNotif, dashboardNotifDispatch,
        troupeNotif, troupeNotifDispatch,
        eventLogNotif, eventLogNotifDispatch,
        memberLogNotif, memberLogNotifDispatch
    };
}

export const NotificationsContext = createContext<ReturnType<typeof useNotifications> | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
    const notifications = useNotifications();
    return (
        <NotificationsContext.Provider value={notifications}>
            {children}
        </NotificationsContext.Provider>
    );
}

export function useNotificationsContext(): ReturnType<typeof useNotifications> {
    const client = useContext(NotificationsContext);
    if(client === undefined) {
        throw new Error("Invalid state. Make sure that you're using `ApiClientProvider` correctly.");
    }
    return client;
}

export function useDashboardNotifications() {
    const { dashboardNotif, dashboardNotifDispatch } = useNotificationsContext();
    return {
        dashboardNotif,
        addDashboardNotif: (notif: NotificationProps) => dashboardNotifDispatch({ action: 'add', notif }),
        removeDashboardNotif: (index: number) => dashboardNotifDispatch({ action: 'remove', index }),
    }
}

export function useTroupeNotifications() {
    const { troupeNotif, troupeNotifDispatch } = useNotificationsContext();
    return {
        troupeNotif,
        addTroupeNotif: (notif: NotificationProps) => troupeNotifDispatch({ action: 'add', notif }),
        removeTroupeNotif: (index: number) => troupeNotifDispatch({ action: 'remove', index }),
    }
}

export function useEventLogNotifications() {
    const { eventLogNotif, eventLogNotifDispatch } = useNotificationsContext();
    return {
        eventLogNotif,
        addEventLogNotif: (notif: NotificationProps) => eventLogNotifDispatch({ action: 'add', notif }),
        removeEventLogNotif: (index: number) => eventLogNotifDispatch({ action: 'remove', index }),
    }
}

export function useMemberLogNotifications() {
    const { memberLogNotif, memberLogNotifDispatch } = useNotificationsContext();
    return {
        memberLogNotif,
        addMemberLogNotif: (notif: NotificationProps) => memberLogNotifDispatch({ action: 'add', notif }),
        removeMemberLogNotif: (index: number) => memberLogNotifDispatch({ action: 'remove', index }),
    }
}