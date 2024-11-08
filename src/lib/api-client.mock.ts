// Defines handlers to mocks the remote calls to the API from the API client, 
// integrating functionality with MSW

import { http, HttpResponse, delay } from 'msw';
import { Attendee, CreateEventRequest, CreateEventTypeRequest, CreateMemberRequest, EventType, Paths, PublicEvent, UpdateEventRequest, UpdateEventTypeRequest, UpdateMemberRequest, UpdateTroupeRequest } from '@cloudydaiyz/stringplay-core/types/api';
import { populateConfigAsOneConsole, defaultConfig } from '@cloudydaiyz/stringplay-core/test-config';
import path from "path";
import { API_CLIENT_URL } from './constants';

type ParsedPathParams = { [param: string]: string };

const mockConsole = populateConfigAsOneConsole(defaultConfig, "A", false);

export const mockGetConsoleData = () => http.get(
    path.join(API_CLIENT_URL, Paths.Console), 
    async () => {
        await delay(800);
        return HttpResponse.json(mockConsole);
    }
);

export const mockGetTroupe = () => http.get(
    path.join(API_CLIENT_URL, Paths.Troupe),
    async () => {
        return HttpResponse.json(mockConsole.troupe);
    }
);

export const mockUpdateTroupe = () => http.put(
    path.join(API_CLIENT_URL, Paths.Troupe),
    async ({ request }) => {
        const body = await request.json() as UpdateTroupeRequest;
        if(body.name) mockConsole.troupe.name = body.name;
        if(body.updateMemberProperties) {
            // Skipping since this would impact multiple views and require more than surface level mocking
            console.warn("Skipping member properties update");
        }
        if(body.removeMemberProperties) {
            // Theoretically, the UI shouldn't let you remove the base member properties
            for(const prop of body.removeMemberProperties) {
                delete mockConsole.troupe.memberPropertyTypes[prop];
                for(const attendee of mockConsole.attendees) {
                    delete attendee.properties[prop];
                }
            }
        }
        if(body.updatePointTypes) {
            for(const pointType in body.updatePointTypes) {
                mockConsole.troupe.pointTypes[pointType] = {
                    startDate: body.updatePointTypes[pointType].startDate,
                    endDate: body.updatePointTypes[pointType].endDate,
                }
            }
        }
        if(body.removePointTypes) {
            // Theoretically, the UI shouldn't let you remove the base point types
            for(const pointType of body.removePointTypes) {
                delete mockConsole.troupe.pointTypes[pointType];
                for(const attendee of mockConsole.attendees) {
                    delete attendee.points[pointType];
                }
            }
        }
    }
);

export const mockCreateEvent = () => http.post(
    path.join(API_CLIENT_URL, Paths.Events),
    async ({ request }) => {
        const body = await request.json() as CreateEventRequest;
        const newEvent: PublicEvent = {
            id: Date.now().toString(16),
            troupeId: mockConsole.troupe.id,
            lastUpdated: (new Date()).toISOString(),
            title: body.title,
            source: '',
            synchronizedSource: '',
            sourceUri: body.sourceUri,
            synchronizedSourceUri: '',
            startDate: body.startDate,
            fieldToPropertyMap: {},
            synchronizedFieldToPropertyMap: {},
            value: body.value || 0,
        };
        mockConsole.events.push(newEvent);
        return HttpResponse.json(newEvent);
    }
);

export const mockGetEvents = () => http.get(
    path.join(API_CLIENT_URL, Paths.Events),
    async () => {
        return HttpResponse.json(mockConsole.events);
    }
);

export const mockUpdateEvent = () => http.put(
    path.join(API_CLIENT_URL, Paths.Event),
    async ({ params, request }) => {
        const { eventId } = params as ParsedPathParams;
        const body = await request.json() as UpdateEventRequest;
        const event = mockConsole.events.find(e => e.id == eventId);
        if(!event) {
            throw new Error('mockUpdateEvent: Invalid event');
        }

        if(body.eventTypeId) event.eventTypeId = body.eventTypeId;
        if(body.sourceUri) event.sourceUri = body.sourceUri;
        if(body.startDate) event.startDate = body.startDate;
        if(body.title) event.title = body.title;
        if(body.value) event.value = body.value;
        return HttpResponse.json(event);
    }
);

export const mockDeleteEvent = () => http.delete(
    path.join(API_CLIENT_URL, Paths.Event),
    async ({ params }) => {
        const { eventId } = params as ParsedPathParams;
        mockConsole.events = mockConsole.events.filter(e => e.id != eventId);
    }
);

export const mockCreateEventType = () => http.post(
    path.join(API_CLIENT_URL, Paths.EventTypes),
    async ({ request }) => {
        const body = await request.json() as CreateEventTypeRequest;
        const newEventType: EventType = {
            id: Date.now().toString(16),
            lastUpdated: (new Date()).toISOString(),
            title: body.title,
            value: body.value,
            sourceFolderUris: body.sourceFolderUris,
            synchronizedSourceFolderUris: [],
        };
        mockConsole.eventTypes.push(newEventType);
        return HttpResponse.json(mockConsole);
    }
);

export const mockGetEventTypes = () => http.get(
    path.join(API_CLIENT_URL, Paths.EventTypes),
    async () => {
        return HttpResponse.json(mockConsole.eventTypes);
    }
);

export const mockUpdateEventType = () => http.put(
    path.join(API_CLIENT_URL, Paths.EventType),
    async ({ params, request }) => {
        const { eventTypeId } = params as ParsedPathParams;
        const body = await request.json() as UpdateEventTypeRequest;
        const eventType = mockConsole.eventTypes.find(et => et.id == eventTypeId);
        if(!eventType) {
            throw new Error('mockUpdateEventType: Invalid event type');
        }

        if(body.title) eventType.title = body.title;
        if(body.value) eventType.value = body.value;
        if(body.addSourceFolderUris) {
            eventType.sourceFolderUris.push(...body.addSourceFolderUris);
        }
        if(body.removeSourceFolderUris) {
            eventType.sourceFolderUris.filter(uri => !body.removeSourceFolderUris!.includes(uri));
        }
        return HttpResponse.json(eventType);
    }
);

export const mockDeleteEventType = () => http.delete(
    path.join(API_CLIENT_URL, Paths.EventType),
    async ({ params }) => {
        const { eventTypeId } = params as ParsedPathParams;
        mockConsole.eventTypes = mockConsole.eventTypes.filter(et => et.id != eventTypeId);
    }
);

export const mockCreateMember = () => http.post(
    path.join(API_CLIENT_URL, Paths.Audience),
    async ({ request }) => {
        const body = await request.json() as CreateMemberRequest;
        const properties = {} as Attendee['properties'];
        for(const property in body.properties) {
            properties[property] = {
                value: body.properties[property],
                override: true,
            };
        }

        const newMember: Attendee = {
            id: Date.now().toString(16),
            troupeId: mockConsole.troupe.id,
            lastUpdated: (new Date()).toISOString(),
            points: {
                'Total': 0,
            },
            properties,
            eventsAttended: [],
        };
        mockConsole.attendees.push(newMember);
        return HttpResponse.json(newMember);
    }
);

export const mockGetAttendees = () => http.get(
    path.join(API_CLIENT_URL, Paths.Attendees),
    async () => {
        return HttpResponse.json(mockConsole.attendees);
    }
)

export const mockUpdateMember = () => http.put(
    path.join(API_CLIENT_URL, Paths.Member),
    async ({ params, request }) => {
        const { memberId } = params as ParsedPathParams;
        const body = await request.json() as UpdateMemberRequest;
        const member = mockConsole.attendees.find(m => m.id == memberId);
        if(!member) {
            throw new Error('mockUpdateMember: Invalid event');
        }

        for(const property in body.updateProperties) {
            const value = body.updateProperties[property].value;
            const override = body.updateProperties[property].override;
            if(property in member.properties) {
                if(value) member.properties[property].value = value;
                if(override) member.properties[property].override = override;
            } else {
                if(!value) {
                    throw new Error('mockUpdateMember: Invalid properties');
                }
                member.properties[property] = {
                    value,
                    override: override || false,
                }
            }
        }

        for(const property of body.removeProperties || []) {
            delete member.properties[property];
        }

        return HttpResponse.json(member);
    }
);

export const mockDeleteMember = () => http.delete(
    path.join(API_CLIENT_URL, Paths.Member),
    async ({ params }) => {
        const { memberId } = params as ParsedPathParams;
        mockConsole.attendees = mockConsole.attendees.filter(m => m.id != memberId);
    }
);