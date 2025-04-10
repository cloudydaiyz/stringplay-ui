import { StringplayApiClient } from '@cloudydaiyz/stringplay-client';
import type { Attendee, BulkUpdateEventRequest, BulkUpdateEventTypeRequest, BulkUpdateMemberRequest, CreateEventRequest, CreateEventTypeRequest, CreateMemberRequest, EventType, PublicEvent, Troupe, TroupeDashboard, UpdateTroupeRequest } from '@cloudydaiyz/stringplay-core/types/api';
import { createContext, useContext, useEffect, useState } from 'react';
import { API_CLIENT_URL, DEFAULT_TROUPE_ID } from './constants';
import { useConsoleNotifications, useEventLogNotifications, useMemberLogNotifications, useTroupeNotifications } from './notifications';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { TroupeLimit } from '@cloudydaiyz/stringplay-core/types';
import { ApiError } from '../types/api-types';

export const api = new StringplayApiClient(API_CLIENT_URL);
export const rt = localStorage.getItem("rt");

if(rt) {
    api.refreshCredentials(rt).then(d => {
        api.addCredentials(d.data.accessToken, d.data.refreshToken);
    });
}

export function useClient() {

    // Invariant: `dashboard`, `limits`, `troupe`, `eventTypes`, `attendees`, `events`, and `lastUpdated` 
    // are only undefined on initial page load.
    const [dashboard, setDashboard] = useState<TroupeDashboard | undefined>(undefined);
    const [limits, setLimits] = useState<TroupeLimit | undefined>(undefined);
    const [troupe, setTroupe] = useState<Troupe | undefined>(undefined);
    const [eventTypes, setEventTypes] = useState<EventType[] | undefined>(undefined);
    const [attendees, setAttendees] = useState<Attendee[] | undefined>(undefined);
    const [events, setEvents] = useState<PublicEvent[] | undefined>(undefined);

    const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [eventsSortedOnce, setEventsSortedOnce] = useState<boolean>(false);

    const navigate = useNavigate();
    const { addConsoleNotif } = useConsoleNotifications();

    if(!eventsSortedOnce && events) {
        events.sort((a, b) => b.startDate.localeCompare(a.startDate));
        setEventsSortedOnce(true);
    }

    /** Wrapper over calls to the API client for standardized parameters */
    async function apiCall<T>(call: Promise<T>) {
        setLoading(true);
        return call.then(d => {
            setLastUpdated(new Date());
            setLoading(false);
            return d;
        });
    }

    const getConsoleData = () => apiCall(
        api.getConsoleData(DEFAULT_TROUPE_ID).then(d => { 
            setDashboard(d.data.dashboard);
            setTroupe(d.data.troupe);
            setEventTypes(d.data.eventTypes);
            setAttendees(d.data.attendees);
            setEvents(d.data.events);
            setLimits(d.data.limits);
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addConsoleNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details." 
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    useEffect(() => { getConsoleData() }, []);

    return { 
        apiCall, 
        lastUpdated,
        loading,
        getConsoleData,
        dashboard, setDashboard,
        limits, setLimits,
        troupe, setTroupe,
        eventTypes, setEventTypes,
        attendees, setAttendees,
        events, setEvents,
    };
}

export const ApiClientContext = createContext<ReturnType<typeof useClient> | undefined>(undefined);

export const ApiClientProvider = ({ children }: { children: React.ReactNode }) => {
    const client = useClient();
    return (
        <ApiClientContext.Provider value={client}>
            {children}
        </ApiClientContext.Provider>
    );
}

export function useClientContext(): ReturnType<typeof useClient> {
    const client = useContext(ApiClientContext);
    if(client === undefined) {
        throw new Error("Invalid state. Make sure that you're using `ApiClientProvider` correctly.");
    }
    return client;
}

export function useMetadata() {
    const { lastUpdated, loading, getConsoleData } = useClientContext();
    return { lastUpdated, loading, getConsoleData };
}

export function useTroupe() {
    const { apiCall, troupe, dashboard, limits, setTroupe } = useClientContext();
    const { addTroupeNotif } = useTroupeNotifications();
    const navigate = useNavigate();

    const getTroupe = () => apiCall(
        api.getTroupe(DEFAULT_TROUPE_ID).then(d => {
            setTroupe(d.data);
        }).catch(e => {
            const err = e as AxiosError;
            
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }
            addTroupeNotif({ notificationType: "error", text: err.message });
        })
    );

    const updateTroupe = (request: UpdateTroupeRequest) => apiCall(
        api.updateTroupe(DEFAULT_TROUPE_ID, request).then(d => {
            setTroupe(d.data);
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addTroupeNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    const initiateSync = () => apiCall(
        api.initiateSync(DEFAULT_TROUPE_ID).then(() => {
            const newTroupe = structuredClone(troupe);
            if(newTroupe) {
                newTroupe.syncLock = true;
                setTroupe(newTroupe);
            }
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addTroupeNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    return { troupe, dashboard, limits, getTroupe, updateTroupe, initiateSync };
}

export function useEvents() {
    const { apiCall, events, setEvents } = useClientContext();
    const { addEventLogNotif } = useEventLogNotifications();
    const navigate = useNavigate();

    const createEvents = (requests: CreateEventRequest[]) => apiCall(
        api.createEvents(DEFAULT_TROUPE_ID, requests).then(d => {
            console.log('create');
            setEvents(events?.concat(d.data));
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addEventLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    const getEvents = () => apiCall(
        api.getEvents(DEFAULT_TROUPE_ID).then(d => {
            setEvents(d.data);
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addEventLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    const updateEvents = (request: BulkUpdateEventRequest) => apiCall(
        api.updateEvents(DEFAULT_TROUPE_ID, request).then(d => {
            setEvents(events?.map(e => e.id in d.data ? d.data[e.id] : e));
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addEventLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    const deleteEvents = (eventIds: string[]) => apiCall(
        api.deleteEvents(DEFAULT_TROUPE_ID, eventIds).then(() => {
            setEvents(events?.filter(e => !eventIds.includes(e.id)));
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addEventLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    return { events, createEvents, getEvents, updateEvents, deleteEvents };
}

export function useEventTypes() {
    const { apiCall, eventTypes, setEventTypes } = useClientContext();
    const { addEventLogNotif } = useEventLogNotifications();
    const navigate = useNavigate();

    const createEventTypes = (requests: CreateEventTypeRequest[]) => apiCall(
        api.createEventTypes(DEFAULT_TROUPE_ID, requests).then(d => {
            setEventTypes(eventTypes?.concat(d.data))
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addEventLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    const getEventTypes = () => apiCall(
        api.getEventTypes(DEFAULT_TROUPE_ID).then(d => {
            setEventTypes(d.data);
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addEventLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });
            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    const updateEventTypes = (request: BulkUpdateEventTypeRequest) => apiCall(
        api.updateEventTypes(DEFAULT_TROUPE_ID, request).then(d => {
            console.log('setting event types');
            setEventTypes(eventTypes?.map(et => et.id in d.data ? d.data[et.id] : et));
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addEventLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    const deleteEventTypes = (eventTypeIds: string[]) => apiCall(
        api.deleteEventTypes(DEFAULT_TROUPE_ID, eventTypeIds).then(() => {
            setEventTypes(eventTypes?.filter(et => !eventTypeIds.includes(et.id)));
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addEventLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    return { eventTypes, createEventTypes, getEventTypes, updateEventTypes, deleteEventTypes };
}

export function useAttendees() {
    const { apiCall, attendees, setAttendees } = useClientContext();
    const { addMemberLogNotif } = useMemberLogNotifications();
    const navigate = useNavigate();

    const createMembers = (requests: CreateMemberRequest[]) => apiCall(
        api.createMembers(DEFAULT_TROUPE_ID, requests).then(d => {
            setAttendees(attendees?.concat(
                d.data.map(m => ({ ...m, eventsAttended: [] })))
            );
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addMemberLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    const getAttendees = () => apiCall(
        api.getAttendees(DEFAULT_TROUPE_ID).then(d => {
            setAttendees(d.data)
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addMemberLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    const updateMembers = (request: BulkUpdateMemberRequest) => apiCall(
        api.updateMembers(DEFAULT_TROUPE_ID, request).then(d => {
            setAttendees(attendees?.map(a => a.id in d.data 
                ? { ...d.data[a.id], eventsAttended: a.eventsAttended } : a
            ));
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addMemberLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });
            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    const deleteMembers = (memberIds: string[]) => apiCall(
        api.deleteMembers(DEFAULT_TROUPE_ID, memberIds).then(() => {
            setAttendees(attendees?.filter(a => !memberIds.includes(a.id)));
        }).catch(e => {
            const err = e as AxiosError<ApiError>;
            if(err.status == 503) {
                navigate("/no-service");
                return;
            }

            addMemberLogNotif({ 
                notificationType: "error", 
                text: err.response?.data?.error || 
                    "An unexpected error has occurred. Check the browser console for details."
            });

            if(!err.response?.data?.error) {
                console.log("An unexpected error has occurred. Details:");
                console.log(err);
            }
        })
    );

    return { attendees, createMembers, getAttendees, updateMembers, deleteMembers };
}