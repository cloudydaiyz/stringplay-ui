import { StringplayApiClient } from '@cloudydaiyz/stringplay-client';
import type { Attendee, BulkUpdateEventRequest, BulkUpdateEventTypeRequest, BulkUpdateMemberRequest, CreateEventRequest, CreateEventTypeRequest, CreateMemberRequest, EventType, PublicEvent, Troupe, TroupeDashboard, UpdateTroupeRequest } from '@cloudydaiyz/stringplay-core/types/api';
import { createContext, useContext, useState } from 'react';
import { API_CLIENT_URL, DEFAULT_TROUPE_ID } from './constants';

export const api = new StringplayApiClient(API_CLIENT_URL);

export function useClient() {
    // Invariant: `dashboard`, `troupe`, `eventTypes`, `attendees`, `events`, and `lastUpdated` are only undefined on initial page load.
    const [dashboard, setDashboard] = useState<TroupeDashboard | undefined>(undefined);
    const [troupe, setTroupe] = useState<Troupe | undefined>(undefined);
    const [eventTypes, setEventTypes] = useState<EventType[] | undefined>(undefined);
    const [attendees, setAttendees] = useState<Attendee[] | undefined>(undefined);
    const [events, setEvents] = useState<PublicEvent[] | undefined>(undefined);

    const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

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
        }).catch(() => {
            // show error notification 
        })
    );

    return { 
        apiCall, 
        lastUpdated,
        loading,
        getConsoleData,
        dashboard, setDashboard,
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
    const { lastUpdated, loading } = useClientContext();
    return { lastUpdated, loading };
}

export function useTroupe() {
    const { apiCall, troupe, dashboard, setTroupe } = useClientContext();

    const getTroupe = () => apiCall(
        api.getTroupe(DEFAULT_TROUPE_ID).then(d => {
            setTroupe(d.data);
        }).catch(() => {
            // show error notification 
        })
    );

    const updateTroupe = (request: UpdateTroupeRequest) => apiCall(
        api.updateTroupe(DEFAULT_TROUPE_ID, request).then(d => {
            setTroupe(d.data);
        }).catch(() => {
            // show error notification 
        })
    );

    return { troupe, dashboard, getTroupe, updateTroupe };
}

export function useEvents() {
    const { apiCall, events, setEvents } = useClientContext();

    const createEvents = (requests: CreateEventRequest[]) => {
        console.log('creating events');
        console.log(api);
        return apiCall(
            api.createEvents(DEFAULT_TROUPE_ID, requests).then(d => {
                console.log('create');
                setEvents(events?.concat(d.data));
            }).catch(() => {
                console.log('create failed');
                // show error notification 
            })
        )
    };

    const getEvents = () => apiCall(
        api.getEvents(DEFAULT_TROUPE_ID).then(d => {
            setEvents(d.data);
        }).catch(() => {
            // show error notification 
        })
    );

    const updateEvents = (request: BulkUpdateEventRequest) => apiCall(
        api.updateEvents(DEFAULT_TROUPE_ID, request).then(d => {
            setEvents(events?.map(e => e.id in d.data ? d.data[e.id] : e));
        }).catch(() => {
            // show error notification 
        })
    );

    const deleteEvents = (eventIds: string[]) => apiCall(
        api.deleteEvents(DEFAULT_TROUPE_ID, eventIds).then(() => {
            setEvents(events?.filter(e => !eventIds.includes(e.id)));
        }).catch(() => {
            // show error notification 
        })
    );

    return { events, createEvents, getEvents, updateEvents, deleteEvents };
}

export function useEventTypes() {
    const { apiCall, eventTypes, setEventTypes } = useClientContext();

    const createEventTypes = (requests: CreateEventTypeRequest[]) => apiCall(
        api.createEventTypes(DEFAULT_TROUPE_ID, requests).then(d => {
            setEventTypes(eventTypes?.concat(d.data))
        }).catch(() => {
            // show error notification 
        })
    );

    const getEventTypes = () => apiCall(
        api.getEventTypes(DEFAULT_TROUPE_ID).then(d => {
            setEventTypes(d.data);
        }).catch(() => {
            // show error notification 
        })
    );

    const updateEventTypes = (request: BulkUpdateEventTypeRequest) => apiCall(
        api.updateEventTypes(DEFAULT_TROUPE_ID, request).then(d => {
            setEventTypes(eventTypes?.map(et => et.id in d.data ? d.data[et.id] : et));
        }).catch(() => {
            // show error notification 
        })
    );

    const deleteEventTypes = (eventTypeIds: string[]) => apiCall(
        api.deleteEventTypes(DEFAULT_TROUPE_ID, eventTypeIds).then(() => {
            setEventTypes(eventTypes?.filter(et => !eventTypeIds.includes(et.id)));
        }).catch(() => {
            // show error notification 
        })
    );

    return { eventTypes, createEventTypes, getEventTypes, updateEventTypes, deleteEventTypes };
}

export function useAttendees() {
    const { apiCall, attendees, setAttendees } = useClientContext();

    const createMembers = (requests: CreateMemberRequest[]) => apiCall(
        api.createMembers(DEFAULT_TROUPE_ID, requests).then(d => {
            setAttendees(attendees?.concat(
                d.data.map(m => ({ ...m, eventsAttended: [] })))
            );
        }).catch(() => {
            // show error notification 
        })
    );

    const getAttendees = () => apiCall(
        api.getAttendees(DEFAULT_TROUPE_ID).then(d => {
            setAttendees(d.data)
        }).catch(() => {
            // show error notification 
        })
    );

    const updateMembers = (request: BulkUpdateMemberRequest) => apiCall(
        api.updateMembers(DEFAULT_TROUPE_ID, request).then(d => {
            setAttendees(attendees?.map(a => a.id in d.data 
                ? { ...d.data[a.id], eventsAttended: a.eventsAttended } : a
            ));
        }).catch(() => {
            // show error notification 
        })
    );

    const deleteMembers = (memberIds: string[]) => apiCall(
        api.deleteMembers(DEFAULT_TROUPE_ID, memberIds).then(() => {
            setAttendees(attendees?.filter(a => !memberIds.includes(a.id)));
        }).catch(() => {
            // show error notification 
        })
    );

    return { attendees, createMembers, getAttendees, updateMembers, deleteMembers };
}