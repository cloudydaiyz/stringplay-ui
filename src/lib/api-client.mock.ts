// Defines handlers to mocks the remote calls to the API from the API client, integrating functionality with MSW

import { http, HttpResponse, delay } from 'msw';
import type { Attendee, BulkUpdateEventRequest, BulkUpdateEventResponse, BulkUpdateEventTypeRequest, BulkUpdateEventTypeResponse, BulkUpdateMemberRequest, BulkUpdateMemberResponse, ConsoleData, CreateEventRequest, CreateEventTypeRequest, CreateMemberRequest, EventType, PublicEvent, UpdateTroupeRequest } from '@cloudydaiyz/stringplay-core/types/api';
import { API_CLIENT_URL } from './constants';
import { defaultConfig } from './mock-data';
import { api } from './api-client';

function getUrl(uri: string, path: string) {
    return (new URL(path, uri)).href;
}

api.addCredentials("example", "tokens");
const defaultMockConsole = structuredClone(defaultConfig);

export const mockGetConsoleData = (mockData: ConsoleData = defaultMockConsole) => http.get(
    getUrl(API_CLIENT_URL, "/t/:troupeId/console"), 
    async () => {
        await delay(800);
        return HttpResponse.json(mockData);
    }
);

export const mockGetTroupe = (mockData: ConsoleData = defaultMockConsole) => http.get(
    getUrl(API_CLIENT_URL, "/t/:troupeId"),
    async () => {
        await delay(800);
        return HttpResponse.json(mockData.troupe);
    }
);

export const mockUpdateTroupe = (mockData: ConsoleData = defaultMockConsole) => http.put(
    getUrl(API_CLIENT_URL, "/t/:troupeId"),
    async ({ request }) => {
        const body = await request.json() as UpdateTroupeRequest;
        if(body.name) mockData.troupe.name = body.name;
        if(body.updateMemberProperties) {
            // Skipping since this would impact multiple views and require more than surface level mocking
            console.warn("Skipping member properties update");
        }
        if(body.removeMemberProperties) {
            // Theoretically, the UI shouldn't let you remove the base member properties
            for(const prop of body.removeMemberProperties) {
                delete mockData.troupe.memberPropertyTypes[prop];
                for(const attendee of mockData.attendees) {
                    delete attendee.properties[prop];
                }
            }
        }
        if(body.updatePointTypes) {
            for(const pointType in body.updatePointTypes) {
                mockData.troupe.pointTypes[pointType] = {
                    startDate: body.updatePointTypes[pointType].startDate,
                    endDate: body.updatePointTypes[pointType].endDate,
                }
            }
        }
        if(body.removePointTypes) {
            // Theoretically, the UI shouldn't let you remove the base point types
            for(const pointType of body.removePointTypes) {
                delete mockData.troupe.pointTypes[pointType];
                for(const attendee of mockData.attendees) {
                    delete attendee.points[pointType];
                }
            }
        }
        await delay(800);
        return HttpResponse.json(mockData.troupe);
    }
);

export const mockCreateEvents = (mockData: ConsoleData = defaultMockConsole) => http.post(
    getUrl(API_CLIENT_URL, "/t/:troupeId/e/bulk"),
    async ({ request }) => {
        console.log('mocking')
        const body = await request.json() as CreateEventRequest[];
        const newEvents = body.map(item => {
            const event: PublicEvent = {
                id: Date.now().toString(16),
                troupeId: mockData.troupe.id,
                lastUpdated: (new Date()).toISOString(),
                title: item.title,
                eventTypeId: item.eventTypeId,
                eventTypeTitle: item.eventTypeId 
                    ? mockData.eventTypes.find(et => et.id == item.eventTypeId)?.title 
                    : undefined,
                source: '',
                synchronizedSource: '',
                sourceUri: item.sourceUri,
                synchronizedSourceUri: '',
                startDate: item.startDate,
                fieldToPropertyMap: {},
                synchronizedFieldToPropertyMap: {},
                value: item.value || 0,
            };
            mockData.events.push(event);
            return event;
        });
        await delay(800);
        return HttpResponse.json(newEvents);
    }
);

export const mockGetEvents = (mockData: ConsoleData = defaultMockConsole) => http.get(
    getUrl(API_CLIENT_URL, "/t/:troupeId/e"),
    async () => {
        await delay(800);
        return HttpResponse.json(mockData.events);
    }
);

export const mockUpdateEvents = (mockData: ConsoleData = defaultMockConsole) => http.put(
    getUrl(API_CLIENT_URL, "/t/:troupeId/e/bulk"),
    async ({ request }) => {
        const body = await request.json() as BulkUpdateEventRequest;
        const updates = {} as BulkUpdateEventResponse;
        console.log(body);
        for(const id in body) {
            const event = mockData.events.find(e => e.id == id);
            if(!event) {
                console.error(`mockUpdateEvent: Invalid event ${id}, skipping`);
                continue;
            }

            if(body[id].sourceUri) event.sourceUri = body[id].sourceUri;
            if(body[id].startDate) event.startDate = body[id].startDate;
            if(body[id].title) event.title = body[id].title;
            if(body[id].value) event.value = body[id].value;
            if(body[id].updateProperties) {
                for(const field in body[id].updateProperties) {
                    if(field in event.fieldToPropertyMap) {
                        event.fieldToPropertyMap[field].property = body[id].updateProperties[field];
                    }
                }
            }
            if(body[id].removeProperties) {
                for(const field of body[id].removeProperties) {
                    if(field in event.fieldToPropertyMap) {
                        event.fieldToPropertyMap[field].property = null;
                    }
                }
            }
            if(body[id].eventTypeId) {
                event.eventTypeId = body[id].eventTypeId;
                event.value = mockData.eventTypes.find(et => et.id == event.eventTypeId)!.value;
            }
            
            updates[id] = { ...event };
        }
        await delay(800);
        return HttpResponse.json(updates);
    }
);

export const mockDeleteEvents = (mockData: ConsoleData = defaultMockConsole) => http.post(
    getUrl(API_CLIENT_URL, "/t/:troupeId/e/bulk/delete"),
    async ({ request }) => {
        console.log('deleting');
        const body = await request.json() as string[];
        mockData.events = mockData.events.filter(e => !body.includes(e.id));
        await delay(800);
        return HttpResponse.json();
    }
);

export const mockCreateEventTypes = (mockData: ConsoleData = defaultMockConsole) => http.post(
    getUrl(API_CLIENT_URL, "/t/:troupeId/et/bulk"),
    async ({ request }) => {
        const body = await request.json() as CreateEventTypeRequest[];
        const newEventTypes = body.map(item => {
            const newEventType: EventType = {
                id: Date.now().toString(16),
                lastUpdated: (new Date()).toISOString(),
                title: item.title,
                value: item.value,
                sourceFolderUris: item.sourceFolderUris,
                synchronizedSourceFolderUris: [],
            };
            mockData.eventTypes.push(newEventType);
            return newEventType;
        });
        await delay(800);
        return HttpResponse.json(newEventTypes);
    }
);

export const mockGetEventTypes = (mockData: ConsoleData = defaultMockConsole) => http.get(
    getUrl(API_CLIENT_URL, "/t/:troupeId/et"),
    async () => {
        await delay(800);
        return HttpResponse.json(mockData.eventTypes);
    }
);

export const mockUpdateEventTypes = (mockData: ConsoleData = defaultMockConsole) => http.put(
    getUrl(API_CLIENT_URL, "/t/:troupeId/et/bulk"),
    async ({ request }) => {
        const body = await request.json() as BulkUpdateEventTypeRequest;
        const updates = {} as BulkUpdateEventTypeResponse;
        for(const id in body) {
            const eventType = mockData.eventTypes.find(et => et.id == id);
            if(!eventType) {
                console.error(`mockUpdateEventType: Invalid event ${id}, skipping type`);
                continue;
            }
    
            if(body[id].title) eventType.title = body[id].title;
            if(body[id].value) eventType.value = body[id].value;
            if(body[id].addSourceFolderUris) {
                eventType.sourceFolderUris.push(...body[id].addSourceFolderUris);
            }
            if(body[id].removeSourceFolderUris) {
                eventType.sourceFolderUris = eventType.sourceFolderUris.filter(uri => !body[id].removeSourceFolderUris!.includes(uri));
            }
            updates[id] = eventType;
        }
        await delay(800);
        return HttpResponse.json(updates);
    }
);

export const mockDeleteEventTypes = (mockData: ConsoleData = defaultMockConsole) => http.post(
    getUrl(API_CLIENT_URL, "/t/:troupeId/et/bulk/delete"),
    async ({ request }) => {
        const body = await request.json() as string[];
        mockData.eventTypes = mockData.eventTypes.filter(e => !body.includes(e.id));
        await delay(800);
        return HttpResponse.json();
    }
);

export const mockCreateMembers = (mockData: ConsoleData = defaultMockConsole) => http.post(
    getUrl(API_CLIENT_URL, "/t/:troupeId/a/bulk"),
    async ({ request }) => {
        const body = await request.json() as CreateMemberRequest[];
        const newMembers = body.map(item => {
            const properties = {} as Attendee['properties'];
            for(const property in item.properties) {
                properties[property] = {
                    value: item.properties[property],
                    override: true,
                };
            }
    
            const newMember: Attendee = {
                id: Date.now().toString(16),
                troupeId: mockData.troupe.id,
                lastUpdated: (new Date()).toISOString(),
                points: {
                    'Total': 0,
                },
                properties,
                eventsAttended: [],
            };
            mockData.attendees.push(newMember);
            return newMember;
        });
        await delay(800);
        return HttpResponse.json(newMembers);
    }
);

export const mockGetAttendees = (mockData: ConsoleData = defaultMockConsole) => http.get(
    getUrl(API_CLIENT_URL, "/t/:troupeId/a"),
    async () => {
        await delay(800);
        return HttpResponse.json(mockData.attendees);
    }
)

export const mockUpdateMembers = (mockData: ConsoleData = defaultMockConsole) => http.put(
    getUrl(API_CLIENT_URL, "/t/:troupeId/m/bulk"),
    async ({ request }) => {
        const body = await request.json() as BulkUpdateMemberRequest;
        const updates = {} as BulkUpdateMemberResponse;
        for(const id in body) {
            const member = mockData.attendees.find(m => m.id == id);
            if(!member) {
                console.error(`mockUpdateMember: Invalid member ${id}, skipping member`);
                continue;
            }
    
            for(const property in body[id].updateProperties) {
                const value = body[id].updateProperties[property].value;
                const override = body[id].updateProperties[property].override;
                if(property in member.properties) {
                    if(value) member.properties[property].value = value;
                    if(override) member.properties[property].override = override;
                } else {
                    if(!value) {
                        throw new Error(`mockUpdateMember: Invalid property for member ${id}`);
                    }
                    member.properties[property] = {
                        value,
                        override: override || false,
                    }
                }
            }
    
            for(const property of body[id].removeProperties || []) {
                delete member.properties[property];
            }
        }
        await delay(800);
        return HttpResponse.json(updates);
    }
);

export const mockDeleteMembers = (mockData: ConsoleData = defaultMockConsole) => http.post(
    getUrl(API_CLIENT_URL, "/t/:troupeId/m/bulk/delete"),
    async ({ request }) => {
        const body = await request.json() as string[];
        mockData.attendees = mockData.attendees.filter(m => !body.includes(m.id));
        await delay(800);
        return HttpResponse.json();
    }
);

export const mockInitiateSync = () => http.post(
    getUrl(API_CLIENT_URL, "/t/:troupeId/sync"),
    async () => {
        await delay(800);
        return new HttpResponse(null, { status: 204 });
    }
);