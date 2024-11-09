import type { ConsoleData } from "@cloudydaiyz/stringplay-core/types/api";

export const defaultConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-09T12:00:02.206Z",
        "name": "test troupe",
        "logSheetUri": "https://example.com",
        "syncLock": false,
        "memberPropertyTypes": {
            "Member ID": "string!",
            "First Name": "string!",
            "Last Name": "string!",
            "Email": "string!",
            "Birthday": "date?",
            "New Prop": "string?"
        },
        "synchronizedMemberPropertyTypes": {
            "Member ID": "string!",
            "First Name": "string!",
            "Last Name": "string!",
            "Email": "string!",
            "Birthday": "date?"
        },
        "pointTypes": {
            "Total": {
                "startDate": "1970-01-01T00:00:00.000Z",
                "endDate": "2065-01-24T05:20:00.000Z"
            },
            "Fall": {
                "startDate": "2024-10-14T01:42:21.961Z",
                "endDate": "2024-12-01T01:42:21.961Z"
            }
        },
        "synchronizedPointTypes": {
            "Total": {
                "startDate": "1970-01-01T00:00:00.000Z",
                "endDate": "2065-01-24T05:20:00.000Z"
            }
        },
        "id": "672f4ec2"
    },
    "dashboard": {
        "troupeId": "672f4ec2",
        "lastUpdated": "2024-11-09T12:00:02.206Z",
        "upcomingBirthdays": {
            "frequency": "monthly",
            "desiredFrequency": "monthly",
            "members": []
        },
        "totalMembers": 0,
        "totalEvents": 0,
        "totalAttendees": 0,
        "totalEventTypes": 0,
        "avgAttendeesPerEvent": 0,
        "avgAttendeesByEventType": {},
        "attendeePercentageByEventType": {},
        "eventPercentageByEventType": {},
        "totalAttendeesByEventType": {},
        "totalEventsByEventType": {},
        "id": "672f4ec2"
    },
    "eventTypes": [],
    "events": [
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.206Z",
            "title": "test event 1",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/first",
            "synchronizedSourceUri": "https://example.com/first",
            "startDate": "2024-11-09T12:00:02.206Z",
            "eventTypeId": "672f4ec2",
            "eventTypeTitle": "Test Event Type - cool events",
            "value": 10,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4ec2"
        },
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.206Z",
            "title": "test event 2",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/second",
            "synchronizedSourceUri": "https://example.com/second",
            "startDate": "2024-10-14T04:29:01.961Z",
            "eventTypeId": "672f4ec2",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4ec2"
        },
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.206Z",
            "title": "test event 3",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/third",
            "synchronizedSourceUri": "https://example.com/third",
            "startDate": "2024-11-09T12:00:02.206Z",
            "eventTypeId": "672f4ec2",
            "eventTypeTitle": "Test Event Type - uncool events",
            "value": -7,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4ec2"
        },
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.206Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fourth",
            "synchronizedSourceUri": "https://example.com/fourth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "value": 4,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4ec2"
        },
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.206Z",
            "title": "test event 5",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fifth",
            "synchronizedSourceUri": "https://example.com/fifth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "eventTypeId": "672f4ec2",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4ec2"
        },
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.206Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/sixth",
            "synchronizedSourceUri": "https://example.com/sixth",
            "startDate": "2024-11-09T12:00:02.206Z",
            "value": -2,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4ec2"
        },
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.206Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/seventh",
            "synchronizedSourceUri": "https://example.com/seventh",
            "startDate": "2024-11-09T12:00:02.206Z",
            "value": 7,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4ec2"
        }
    ],
    "attendees": [
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.207Z",
            "properties": {
                "First Name": {
                    "value": "John",
                    "override": false
                },
                "Last Name": {
                    "value": "Doe",
                    "override": false
                },
                "Member ID": {
                    "value": "1",
                    "override": false
                },
                "Email": {
                    "value": "1@stringplay.com",
                    "override": false
                },
                "Birthday": {
                    "value": "Sat Nov 09 2024 06:00:02 GMT-0600 (Central Standard Time)",
                    "override": false
                },
                "New Prop": {
                    "value": "",
                    "override": false
                }
            },
            "points": {
                "Total": 10,
                "Fall": 10
            },
            "eventsAttended": [
                "672f4ec2"
            ],
            "id": "672f4ec2"
        },
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.207Z",
            "properties": {
                "First Name": {
                    "value": "Hello",
                    "override": false
                },
                "Last Name": {
                    "value": "World",
                    "override": false
                },
                "Member ID": {
                    "value": "2",
                    "override": false
                },
                "Email": {
                    "value": "2@stringplay.com",
                    "override": false
                },
                "Birthday": {
                    "value": "Sat Nov 09 2024 06:00:02 GMT-0600 (Central Standard Time)",
                    "override": false
                },
                "New Prop": {
                    "value": "",
                    "override": false
                }
            },
            "points": {
                "Total": 10,
                "Fall": 10
            },
            "eventsAttended": [
                "672f4ec2"
            ],
            "id": "672f4ec2"
        },
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.207Z",
            "properties": {
                "First Name": {
                    "value": "Hello",
                    "override": false
                },
                "Last Name": {
                    "value": "World",
                    "override": false
                },
                "Member ID": {
                    "value": "3",
                    "override": false
                },
                "Email": {
                    "value": "3@stringplay.com",
                    "override": false
                },
                "Birthday": {
                    "value": "Sat Nov 09 2024 06:00:02 GMT-0600 (Central Standard Time)",
                    "override": false
                },
                "New Prop": {
                    "value": "",
                    "override": false
                }
            },
            "points": {
                "Total": 3,
                "Fall": 3
            },
            "eventsAttended": [
                "672f4ec2"
            ],
            "id": "672f4ec2"
        },
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.207Z",
            "properties": {
                "First Name": {
                    "value": "Hello",
                    "override": false
                },
                "Last Name": {
                    "value": "World",
                    "override": false
                },
                "Member ID": {
                    "value": "4",
                    "override": false
                },
                "Email": {
                    "value": "4@stringplay.com",
                    "override": false
                },
                "Birthday": {
                    "value": "Sat Nov 09 2024 06:00:02 GMT-0600 (Central Standard Time)",
                    "override": false
                },
                "New Prop": {
                    "value": "",
                    "override": false
                }
            },
            "points": {
                "Total": -7,
                "Fall": -7
            },
            "eventsAttended": [
                "672f4ec2"
            ],
            "id": "672f4ec2"
        },
        {
            "troupeId": "672f4ec2",
            "lastUpdated": "2024-11-09T12:00:02.207Z",
            "properties": {
                "First Name": {
                    "value": "Hello",
                    "override": false
                },
                "Last Name": {
                    "value": "World",
                    "override": false
                },
                "Member ID": {
                    "value": "5",
                    "override": false
                },
                "Email": {
                    "value": "5@stringplay.com",
                    "override": false
                },
                "Birthday": {
                    "value": "Sat Nov 09 2024 06:00:02 GMT-0600 (Central Standard Time)",
                    "override": false
                },
                "New Prop": {
                    "value": "",
                    "override": false
                }
            },
            "points": {
                "Total": 10,
                "Fall": 10
            },
            "eventsAttended": [
                "672f4ec2"
            ],
            "id": "672f4ec2"
        }
    ]
};

export const noMembersConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-09T12:02:20.149Z",
        "name": "test troupe",
        "logSheetUri": "https://example.com",
        "syncLock": false,
        "memberPropertyTypes": {
            "Member ID": "string!",
            "First Name": "string!",
            "Last Name": "string!",
            "Email": "string!",
            "Birthday": "date?",
            "New Prop": "string?"
        },
        "synchronizedMemberPropertyTypes": {
            "Member ID": "string!",
            "First Name": "string!",
            "Last Name": "string!",
            "Email": "string!",
            "Birthday": "date?"
        },
        "pointTypes": {
            "Total": {
                "startDate": "1970-01-01T00:00:00.000Z",
                "endDate": "2065-01-24T05:20:00.000Z"
            },
            "Fall": {
                "startDate": "2024-10-14T01:42:21.961Z",
                "endDate": "2024-12-01T01:42:21.961Z"
            }
        },
        "synchronizedPointTypes": {
            "Total": {
                "startDate": "1970-01-01T00:00:00.000Z",
                "endDate": "2065-01-24T05:20:00.000Z"
            }
        },
        "id": "672f4f4c"
    },
    "dashboard": {
        "troupeId": "672f4f4c",
        "lastUpdated": "2024-11-09T12:02:20.149Z",
        "upcomingBirthdays": {
            "frequency": "monthly",
            "desiredFrequency": "monthly",
            "members": []
        },
        "totalMembers": 0,
        "totalEvents": 0,
        "totalAttendees": 0,
        "totalEventTypes": 0,
        "avgAttendeesPerEvent": 0,
        "avgAttendeesByEventType": {},
        "attendeePercentageByEventType": {},
        "eventPercentageByEventType": {},
        "totalAttendeesByEventType": {},
        "totalEventsByEventType": {},
        "id": "672f4f4c"
    },
    "eventTypes": [],
    "events": [
        {
            "troupeId": "672f4f4c",
            "lastUpdated": "2024-11-09T12:02:20.149Z",
            "title": "test event 1",
            "source": "Google Forms",
            "synchronizedSource": "",
            "sourceUri": "https://docs.google.com/forms/d/1zmXsG53ymMTY16OoPR0VD7mqqP94HcPILskiOA7lOA4",
            "synchronizedSourceUri": "https://example.com/first",
            "startDate": "2024-11-09T12:02:20.149Z",
            "eventTypeId": "672f4f4c",
            "eventTypeTitle": "Test Event Type - cool events",
            "value": 10,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4f4c"
        },
        {
            "troupeId": "672f4f4c",
            "lastUpdated": "2024-11-09T12:02:20.149Z",
            "title": "test event 2",
            "source": "Google Sheets",
            "synchronizedSource": "",
            "sourceUri": "https://docs.google.com/spreadsheets/d/1Ita-QOxFBd37i-_7xxKtTOh4FghBknFY5WO9Yrqc2nE/edit",
            "synchronizedSourceUri": "https://example.com/second",
            "startDate": "2024-10-14T04:29:01.961Z",
            "eventTypeId": "672f4f4c",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4f4c"
        },
        {
            "troupeId": "672f4f4c",
            "lastUpdated": "2024-11-09T12:02:20.149Z",
            "title": "test event 3",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/third",
            "synchronizedSourceUri": "https://example.com/third",
            "startDate": "2024-11-09T12:02:20.149Z",
            "eventTypeId": "672f4f4c",
            "eventTypeTitle": "Test Event Type - uncool events",
            "value": -7,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4f4c"
        },
        {
            "troupeId": "672f4f4c",
            "lastUpdated": "2024-11-09T12:02:20.149Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fourth",
            "synchronizedSourceUri": "https://example.com/fourth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "value": 4,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4f4c"
        },
        {
            "troupeId": "672f4f4c",
            "lastUpdated": "2024-11-09T12:02:20.149Z",
            "title": "test event 5",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fifth",
            "synchronizedSourceUri": "https://example.com/fifth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "eventTypeId": "672f4f4c",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4f4c"
        },
        {
            "troupeId": "672f4f4c",
            "lastUpdated": "2024-11-09T12:02:20.149Z",
            "title": "test event 6 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/sixth",
            "synchronizedSourceUri": "https://example.com/sixth",
            "startDate": "2024-11-09T12:02:20.149Z",
            "value": -2,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4f4c"
        },
        {
            "troupeId": "672f4f4c",
            "lastUpdated": "2024-11-09T12:02:20.149Z",
            "title": "test event 7 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/seventh",
            "synchronizedSourceUri": "https://example.com/seventh",
            "startDate": "2024-11-09T12:02:20.149Z",
            "value": 7,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "672f4f4c"
        }
    ],
    "attendees": []
};

export const onlyEventTypesConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-09T12:03:14.213Z",
        "name": "test troupe",
        "logSheetUri": "https://example.com",
        "syncLock": false,
        "memberPropertyTypes": {
            "Member ID": "string!",
            "First Name": "string!",
            "Last Name": "string!",
            "Email": "string!",
            "Birthday": "date?",
            "New Prop": "string?"
        },
        "synchronizedMemberPropertyTypes": {
            "Member ID": "string!",
            "First Name": "string!",
            "Last Name": "string!",
            "Email": "string!",
            "Birthday": "date?"
        },
        "pointTypes": {
            "Total": {
                "startDate": "1970-01-01T00:00:00.000Z",
                "endDate": "2065-01-24T05:20:00.000Z"
            },
            "Fall": {
                "startDate": "2024-10-14T01:42:21.961Z",
                "endDate": "2024-12-01T01:42:21.961Z"
            }
        },
        "synchronizedPointTypes": {
            "Total": {
                "startDate": "1970-01-01T00:00:00.000Z",
                "endDate": "2065-01-24T05:20:00.000Z"
            }
        },
        "id": "672f4f82"
    },
    "dashboard": {
        "troupeId": "672f4f82",
        "lastUpdated": "2024-11-09T12:03:14.213Z",
        "upcomingBirthdays": {
            "frequency": "monthly",
            "desiredFrequency": "monthly",
            "members": []
        },
        "totalMembers": 0,
        "totalEvents": 0,
        "totalAttendees": 0,
        "totalEventTypes": 0,
        "avgAttendeesPerEvent": 0,
        "avgAttendeesByEventType": {},
        "attendeePercentageByEventType": {},
        "eventPercentageByEventType": {},
        "totalAttendeesByEventType": {},
        "totalEventsByEventType": {},
        "id": "672f4f82"
    },
    "eventTypes": [],
    "events": [],
    "attendees": []
};

export const mockUpcomingBirthdays = [
    {
        firstName: "Kylan",
        lastName: "Duncan",
        birthday: new Date(),
    },
    {
        firstName: "Kylan",
        lastName: "Duncan",
        birthday: new Date(),
    },
    {
        firstName: "Kylan",
        lastName: "Duncan",
        birthday: new Date(),
    },
    {
        firstName: "Kylan",
        lastName: "Duncan",
        birthday: new Date(),
    },
    {
        firstName: "Kylan",
        lastName: "Duncan",
        birthday: new Date(),
    },
];

export const mockCategoricalStatistics1 = [
    {name: 'person 1', value: 10},
    {name: 'person 2', value: 10},
    {name: 'person 3', value: 10},
    {name: 'person 4', value: 10},
    {name: 'person 5', value: 10},
    {name: 'person 6', value: 10},
    {name: 'person 7', value: 10},
    {name: 'person 8', value: 10},
];

export const mockCategoricalStatistics2 = [
    {name: 'person 1', value: 10},
    {name: 'person 2', value: 10},
    {name: 'person 3', value: 10},
];

export const mockEventTypeTable = [
    ["Hello", 123, 123, 123],
    ["Hello", 123, 123, 123],
    ["Hello", 123, 123, 123],
    ["Hello", 123, 123, 123],
    ["Hello", 123, 123, 123],
    ["Hello", 123, 123, 123],
    ["Hello", 123, 123, 123],
    ["Hello", 123, 123, 123],
];