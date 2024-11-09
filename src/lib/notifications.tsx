import { useState } from "react";
import { NotificationProps } from "../components/dashboard/Notification";

interface AllNotifications {
    dashboard: NotificationProps[],
    eventLog: NotificationProps[],
    memberLog: NotificationProps[],
    troupe: NotificationProps[],
}

// Notifications for each view and the corresponding Context for all notifications
export function useNotifications() {
    const [dashboardNotif, setDashboardNotif] = useState<NotificationProps[]>([]);
    const [eventLogNotif, setEventLogNotif] = useState<NotificationProps[]>([]);
    const [memberLogNotif, setMemberLogNotif] = useState<NotificationProps[]>([]);
    const [troupeNotif, setTroupeNotif] = useState<NotificationProps[]>([]);
}