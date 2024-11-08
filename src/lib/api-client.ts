import { StringplayApiClient } from '@cloudydaiyz/stringplay-client';
import { Attendee, CreateEventRequest, CreateEventTypeRequest, CreateMemberRequest, EventType, PublicEvent, Troupe, TroupeDashboard, UpdateEventRequest, UpdateEventTypeRequest, UpdateMemberRequest, UpdateTroupeRequest } from '@cloudydaiyz/stringplay-core/types/api';
import { createContext, useContext, useEffect, useState } from 'react';
import { API_CLIENT_URL, DEFAULT_TROUPE_ID } from './constants';

export const api = new StringplayApiClient(API_CLIENT_URL);

export function useClient() {
    const [dashboard, setDashboard] = useState<TroupeDashboard | undefined>(undefined);
    const [troupe, setTroupe] = useState<Troupe | undefined>(undefined);
    const [eventTypes, setEventTypes] = useState<EventType[] | undefined>(undefined);
    const [attendees, setAttendees] = useState<Attendee[] | undefined>(undefined);
    const [events, setEvents] = useState<PublicEvent[] | undefined>(undefined);

    const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    /** Wrapper over calls to the API client for standardized parameters */
    function apiCall(call: Promise<void>) {
        setLoading(true);
        call.finally(() => {
            setLastUpdated(new Date());
            setLoading(false);
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

    /** Get the initial console data */
    useEffect(() => getConsoleData(), []);

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

export const ApiClientContext = createContext(useClient());

export function useTroupe() {
    const { apiCall, troupe, setTroupe } = useContext(ApiClientContext);

    const getTroupe = () => apiCall(
        api.getTroupe(DEFAULT_TROUPE_ID).then(d => {
            setTroupe(d.data);
        }).catch(() => {
            // show error notification 
        })
    );

    const updateTroupe = () => (request: UpdateTroupeRequest) => apiCall(
        api.updateTroupe(DEFAULT_TROUPE_ID, request).then(d => {
            setTroupe(d.data);
        }).catch(() => {
            // show error notification 
        })
    );

    return { troupe, getTroupe, updateTroupe };
}

export function useEvents() {
    const { apiCall, events, setEvents } = useContext(ApiClientContext);

    const createEvent = (request: CreateEventRequest) => apiCall(
        api.createEvent(DEFAULT_TROUPE_ID, request).then(d => {
            setEvents(events?.concat(d.data));
        }).catch(() => {
            // show error notification 
        })
    );

    const getEvents = () => apiCall(
        api.getEvents(DEFAULT_TROUPE_ID).then(d => {
            setEvents(d.data);
        }).catch(() => {
            // show error notification 
        })
    );

    const updateEvent = (eventId: string, request: UpdateEventRequest) => apiCall(
        api.updateEvent(DEFAULT_TROUPE_ID, eventId, request).then(d => {
            setEvents(events?.map(e => e.id == eventId ? d.data : e));
        }).catch(() => {
            // show error notification 
        })
    );

    const deleteEvent = (eventId: string) => apiCall(
        api.deleteEvent(DEFAULT_TROUPE_ID, eventId).then(() => {
            setEvents(events?.filter(e => e.id != eventId));
        }).catch(() => {
            // show error notification 
        })
    );

    return { events, createEvent, getEvents, updateEvent, deleteEvent };
}

export function useEventTypes() {
    const { apiCall, eventTypes, setEventTypes } = useContext(ApiClientContext);

    const createEventType = (request: CreateEventTypeRequest) => apiCall(
        api.createEventType(DEFAULT_TROUPE_ID, request).then(d => {
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

    const updateEventTypes = (eventTypeId: string, request: UpdateEventTypeRequest) => apiCall(
        api.updateEventType(DEFAULT_TROUPE_ID, eventTypeId, request).then(d => {
            setEventTypes(eventTypes?.map(et => et.id == eventTypeId ? d.data : et));
        }).catch(() => {
            // show error notification 
        })
    );

    const deleteEventType = (eventTypeId: string) => apiCall(
        api.deleteEventType(DEFAULT_TROUPE_ID, eventTypeId).then(() => {
            setEventTypes(eventTypes?.filter(et => et.id != eventTypeId));
        }).catch(() => {
            // show error notification 
        })
    );

    return { eventTypes, createEventType, getEventTypes, updateEventTypes, deleteEventType };
}

export function useAttendees() {
    const { apiCall, attendees, setAttendees } = useContext(ApiClientContext);

    const createMember = (request: CreateMemberRequest) => apiCall(
        api.createMember(DEFAULT_TROUPE_ID, request).then(d => {
            setAttendees(attendees?.concat({ ...d.data, eventsAttended: [] }));
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

    const updateMember = (memberId: string, request: UpdateMemberRequest) => apiCall(
        api.updateMember(DEFAULT_TROUPE_ID, memberId, request).then(d => {
            setAttendees(attendees?.map(a => a.id == memberId 
                ? { ...d.data, eventsAttended: a.eventsAttended } : a
            ));
        }).catch(() => {
            // show error notification 
        })
    );

    const deleteMember = (memberId: string) => apiCall(
        api.deleteMember(DEFAULT_TROUPE_ID, memberId).then(() => {
            setAttendees(attendees?.filter(a => a.id != memberId));
        }).catch(() => {
            // show error notification 
        })
    );

    return { attendees, createMember, getAttendees, updateMember, deleteMember };
}