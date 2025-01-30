import type { ConsoleData } from "@cloudydaiyz/stringplay-core/types/api";

export const defaultConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-27T23:16:09.498Z",
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
        "fieldMatchers": [
            {
                "matchCondition": "contains",
                "fieldExpression": "ID",
                "memberProperty": "Member ID",
                "filters": [],
                "priority": 0
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "First Name",
                "memberProperty": "First Name",
                "filters": [],
                "priority": 1
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "Last Name",
                "memberProperty": "Last Name",
                "filters": [],
                "priority": 2
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "Email",
                "memberProperty": "Email",
                "filters": [],
                "priority": 3
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "Birthday",
                "memberProperty": "Birthday",
                "filters": [],
                "priority": 4
            }
        ],
        "id": "6747a839ed7f1593c8b1d36a"
    },
    "dashboard": {
        "troupeId": "6747a839ed7f1593c8b1d36a",
        "lastUpdated": "2024-11-27T23:16:09.498Z",
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
        "id": "6747a839ed7f1593c8b1d36b"
    },
    "eventTypes": [
        {
            "lastUpdated": "2024-11-27T23:16:09.498Z",
            "title": "Test Event Type - cool events",
            "value": 10,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "6747a839ed7f1593c8b1d36d"
        },
        {
            "lastUpdated": "2024-11-27T23:16:09.498Z",
            "title": "Test Event Type - alright events",
            "value": 3,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "6747a839ed7f1593c8b1d36e"
        },
        {
            "lastUpdated": "2024-11-27T23:16:09.498Z",
            "title": "Test Event Type - uncool events",
            "value": -7,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "6747a839ed7f1593c8b1d36f"
        }
    ],
    "events": [
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.498Z",
            "title": "test event 1",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/first",
            "synchronizedSourceUri": "https://example.com/first",
            "startDate": "2024-11-27T23:16:09.498Z",
            "eventTypeId": "6747a839ed7f1593c8b1d36d",
            "eventTypeTitle": "Test Event Type - cool events",
            "value": 10,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "6747a839ed7f1593c8b1d370"
        },
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
            "title": "test event 2",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/second",
            "synchronizedSourceUri": "https://example.com/second",
            "startDate": "2024-10-14T04:29:01.961Z",
            "eventTypeId": "6747a839ed7f1593c8b1d36e",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {
                "6747a839ed7f1593c8b1d372": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6747a839ed7f1593c8b1d372": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "id": "6747a839ed7f1593c8b1d371"
        },
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
            "title": "test event 3",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/third",
            "synchronizedSourceUri": "https://example.com/third",
            "startDate": "2024-11-27T23:16:09.499Z",
            "eventTypeId": "6747a839ed7f1593c8b1d36f",
            "eventTypeTitle": "Test Event Type - uncool events",
            "value": -7,
            "fieldToPropertyMap": {
                "6747a839ed7f1593c8b1d374": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d375": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d376": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d377": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday",
                    "matcherId": null,
                    "override": false
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6747a839ed7f1593c8b1d374": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d375": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d376": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d377": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday",
                    "matcherId": null,
                    "override": false
                }
            },
            "id": "6747a839ed7f1593c8b1d373"
        },
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
            "title": "test event 4 (special)",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/fourth",
            "synchronizedSourceUri": "https://example.com/fourth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "value": 4,
            "fieldToPropertyMap": {
                "6747a839ed7f1593c8b1d379": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d37a": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d37b": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6747a839ed7f1593c8b1d379": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d37a": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d37b": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "id": "6747a839ed7f1593c8b1d378"
        },
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
            "title": "test event 5",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/fifth",
            "synchronizedSourceUri": "https://example.com/fifth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "eventTypeId": "6747a839ed7f1593c8b1d36e",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "6747a839ed7f1593c8b1d37c"
        },
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
            "title": "test event 4 (special)",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/sixth",
            "synchronizedSourceUri": "https://example.com/sixth",
            "startDate": "2024-11-27T23:16:09.499Z",
            "value": -2,
            "fieldToPropertyMap": {
                "6747a839ed7f1593c8b1d37e": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d37f": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d380": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d381": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID",
                    "matcherId": null,
                    "override": false
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6747a839ed7f1593c8b1d37e": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d37f": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d380": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d381": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID",
                    "matcherId": null,
                    "override": false
                }
            },
            "id": "6747a839ed7f1593c8b1d37d"
        },
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
            "title": "test event 4 (special)",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/seventh",
            "synchronizedSourceUri": "https://example.com/seventh",
            "startDate": "2024-11-27T23:16:09.499Z",
            "value": 7,
            "fieldToPropertyMap": {
                "6747a839ed7f1593c8b1d383": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d384": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d385": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d386": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6747a839ed7f1593c8b1d383": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d384": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d385": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                },
                "6747a839ed7f1593c8b1d386": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "id": "6747a839ed7f1593c8b1d382"
        }
    ],
    "attendees": [
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
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
                    "value": "Wed Nov 27 2024 17:16:09 GMT-0600 (Central Standard Time)",
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
                "6747a839ed7f1593c8b1d370",
                "6747a839ed7f1593c8b1d373"
            ],
            "id": "6747a839ed7f1593c8b1d387"
        },
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
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
                    "value": "Wed Nov 27 2024 17:16:09 GMT-0600 (Central Standard Time)",
                    "override": false
                },
                "New Prop": {
                    "value": "",
                    "override": false
                }
            },
            "points": {
                "Total": 13,
                "Fall": 6
            },
            "eventsAttended": [
                "6747a839ed7f1593c8b1d370",
                "6747a839ed7f1593c8b1d371",
                "6747a839ed7f1593c8b1d373",
                "6747a839ed7f1593c8b1d378",
                "6747a839ed7f1593c8b1d37c"
            ],
            "id": "6747a839ed7f1593c8b1d389"
        },
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
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
                    "value": "Wed Nov 27 2024 17:16:09 GMT-0600 (Central Standard Time)",
                    "override": false
                },
                "New Prop": {
                    "value": "",
                    "override": false
                }
            },
            "points": {
                "Total": 14,
                "Fall": 10
            },
            "eventsAttended": [
                "6747a839ed7f1593c8b1d371",
                "6747a839ed7f1593c8b1d378",
                "6747a839ed7f1593c8b1d382"
            ],
            "id": "6747a839ed7f1593c8b1d38b"
        },
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
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
                    "value": "Wed Nov 27 2024 17:16:09 GMT-0600 (Central Standard Time)",
                    "override": false
                },
                "New Prop": {
                    "value": "",
                    "override": false
                }
            },
            "points": {
                "Total": -2,
                "Fall": -9
            },
            "eventsAttended": [
                "6747a839ed7f1593c8b1d373",
                "6747a839ed7f1593c8b1d378",
                "6747a839ed7f1593c8b1d37c",
                "6747a839ed7f1593c8b1d37d"
            ],
            "id": "6747a839ed7f1593c8b1d38d"
        },
        {
            "troupeId": "6747a839ed7f1593c8b1d36a",
            "lastUpdated": "2024-11-27T23:16:09.499Z",
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
                    "value": "Wed Nov 27 2024 17:16:09 GMT-0600 (Central Standard Time)",
                    "override": false
                },
                "New Prop": {
                    "value": "",
                    "override": false
                }
            },
            "points": {
                "Total": 18,
                "Fall": 11
            },
            "eventsAttended": [
                "6747a839ed7f1593c8b1d370",
                "6747a839ed7f1593c8b1d371",
                "6747a839ed7f1593c8b1d373",
                "6747a839ed7f1593c8b1d378",
                "6747a839ed7f1593c8b1d37c",
                "6747a839ed7f1593c8b1d37d",
                "6747a839ed7f1593c8b1d382"
            ],
            "id": "6747a839ed7f1593c8b1d38f"
        }
    ],
    "limits": {
        "modifyOperationsLeft": 30,
        "manualSyncsLeft": 5,
        "memberPropertyTypesLeft": 10,
        "pointTypesLeft": 5,
        "fieldMatchersLeft": 15,
        "eventTypesLeft": 10,
        "sourceFolderUrisLeft": 20,
        "eventsLeft": 100,
        "membersLeft": 200
    }
}

export const noMembersConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-27T23:18:03.800Z",
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
        "fieldMatchers": [
            {
                "matchCondition": "contains",
                "fieldExpression": "ID",
                "memberProperty": "Member ID",
                "filters": [],
                "priority": 0
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "First Name",
                "memberProperty": "First Name",
                "filters": [],
                "priority": 1
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "Last Name",
                "memberProperty": "Last Name",
                "filters": [],
                "priority": 2
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "Email",
                "memberProperty": "Email",
                "filters": [],
                "priority": 3
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "Birthday",
                "memberProperty": "Birthday",
                "filters": [],
                "priority": 4
            }
        ],
        "id": "6747a8ab035f835f16076417"
    },
    "dashboard": {
        "troupeId": "6747a8ab035f835f16076417",
        "lastUpdated": "2024-11-27T23:18:03.800Z",
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
        "id": "6747a8ab035f835f16076418"
    },
    "eventTypes": [
        {
            "lastUpdated": "2024-11-27T23:18:03.800Z",
            "title": "Test Event Type - cool events",
            "value": 10,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "6747a8ab035f835f1607641a"
        },
        {
            "lastUpdated": "2024-11-27T23:18:03.800Z",
            "title": "Test Event Type - alright events",
            "value": 3,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "6747a8ab035f835f1607641b"
        },
        {
            "lastUpdated": "2024-11-27T23:18:03.800Z",
            "title": "Test Event Type - uncool events",
            "value": -7,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "6747a8ab035f835f1607641c"
        }
    ],
    "events": [
        {
            "troupeId": "6747a8ab035f835f16076417",
            "lastUpdated": "2024-11-27T23:18:03.800Z",
            "title": "test event 1",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://docs.google.com/forms/d/1zmXsG53ymMTY16OoPR0VD7mqqP94HcPILskiOA7lOA4",
            "synchronizedSourceUri": "https://example.com/first",
            "startDate": "2024-11-27T23:18:03.800Z",
            "eventTypeId": "6747a8ab035f835f1607641a",
            "eventTypeTitle": "Test Event Type - cool events",
            "value": 10,
            "fieldToPropertyMap": {
                "6747a8ab035f835f1607641e": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f1607641f": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6747a8ab035f835f1607641e": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f1607641f": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "id": "6747a8ab035f835f1607641d"
        },
        {
            "troupeId": "6747a8ab035f835f16076417",
            "lastUpdated": "2024-11-27T23:18:03.800Z",
            "title": "test event 2",
            "source": "Google Sheets",
            "synchronizedSource": "Google Sheets",
            "sourceUri": "https://docs.google.com/spreadsheets/d/1Ita-QOxFBd37i-_7xxKtTOh4FghBknFY5WO9Yrqc2nE/edit",
            "synchronizedSourceUri": "https://example.com/second",
            "startDate": "2024-10-14T04:29:01.961Z",
            "eventTypeId": "6747a8ab035f835f1607641b",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {
                "6747a8ab035f835f16076421": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f16076422": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f16076423": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f16076424": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6747a8ab035f835f16076421": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f16076422": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f16076423": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f16076424": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "id": "6747a8ab035f835f16076420"
        },
        {
            "troupeId": "6747a8ab035f835f16076417",
            "lastUpdated": "2024-11-27T23:18:03.800Z",
            "title": "test event 3",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/third",
            "synchronizedSourceUri": "https://example.com/third",
            "startDate": "2024-11-27T23:18:03.800Z",
            "eventTypeId": "6747a8ab035f835f1607641c",
            "eventTypeTitle": "Test Event Type - uncool events",
            "value": -7,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "6747a8ab035f835f16076425"
        },
        {
            "troupeId": "6747a8ab035f835f16076417",
            "lastUpdated": "2024-11-27T23:18:03.800Z",
            "title": "test event 4 (special)",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/fourth",
            "synchronizedSourceUri": "https://example.com/fourth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "value": 4,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "6747a8ab035f835f16076426"
        },
        {
            "troupeId": "6747a8ab035f835f16076417",
            "lastUpdated": "2024-11-27T23:18:03.801Z",
            "title": "test event 5",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/fifth",
            "synchronizedSourceUri": "https://example.com/fifth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "eventTypeId": "6747a8ab035f835f1607641b",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {
                "6747a8ab035f835f16076428": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6747a8ab035f835f16076428": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                }
            },
            "id": "6747a8ab035f835f16076427"
        },
        {
            "troupeId": "6747a8ab035f835f16076417",
            "lastUpdated": "2024-11-27T23:18:03.801Z",
            "title": "test event 6 (special)",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/sixth",
            "synchronizedSourceUri": "https://example.com/sixth",
            "startDate": "2024-11-27T23:18:03.801Z",
            "value": -2,
            "fieldToPropertyMap": {
                "6747a8ab035f835f1607642a": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6747a8ab035f835f1607642a": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name",
                    "matcherId": null,
                    "override": false
                }
            },
            "id": "6747a8ab035f835f16076429"
        },
        {
            "troupeId": "6747a8ab035f835f16076417",
            "lastUpdated": "2024-11-27T23:18:03.801Z",
            "title": "test event 7 (special)",
            "source": "Google Forms",
            "synchronizedSource": "Google Forms",
            "sourceUri": "https://example.com/seventh",
            "synchronizedSourceUri": "https://example.com/seventh",
            "startDate": "2024-11-27T23:18:03.801Z",
            "value": 7,
            "fieldToPropertyMap": {
                "6747a8ab035f835f1607642c": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f1607642d": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f1607642e": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f1607642f": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6747a8ab035f835f1607642c": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f1607642d": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f1607642e": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday",
                    "matcherId": null,
                    "override": false
                },
                "6747a8ab035f835f1607642f": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email",
                    "matcherId": null,
                    "override": false
                }
            },
            "id": "6747a8ab035f835f1607642b"
        }
    ],
    "attendees": [],
    "limits": {
        "modifyOperationsLeft": 30,
        "manualSyncsLeft": 5,
        "memberPropertyTypesLeft": 10,
        "pointTypesLeft": 5,
        "fieldMatchersLeft": 15,
        "eventTypesLeft": 10,
        "sourceFolderUrisLeft": 20,
        "eventsLeft": 100,
        "membersLeft": 200
    }
}

export const onlyEventTypesConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-27T23:18:58.952Z",
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
        "fieldMatchers": [
            {
                "matchCondition": "contains",
                "fieldExpression": "ID",
                "memberProperty": "Member ID",
                "filters": [],
                "priority": 0
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "First Name",
                "memberProperty": "First Name",
                "filters": [],
                "priority": 1
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "Last Name",
                "memberProperty": "Last Name",
                "filters": [],
                "priority": 2
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "Email",
                "memberProperty": "Email",
                "filters": [],
                "priority": 3
            },
            {
                "matchCondition": "contains",
                "fieldExpression": "Birthday",
                "memberProperty": "Birthday",
                "filters": [],
                "priority": 4
            }
        ],
        "id": "6747a8e2d5267cdb963a73f6"
    },
    "dashboard": {
        "troupeId": "6747a8e2d5267cdb963a73f6",
        "lastUpdated": "2024-11-27T23:18:58.952Z",
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
        "id": "6747a8e2d5267cdb963a73f7"
    },
    "eventTypes": [
        {
            "lastUpdated": "2024-11-27T23:18:58.952Z",
            "title": "Test Event Type - cool events",
            "value": 10,
            "sourceFolderUris": [
                "https://drive.google.com/drive/folders/1gQAhRgA7RzOPe_7YWdjniBiK8Q97yV8D"
            ],
            "synchronizedSourceFolderUris": [],
            "id": "6747a8e2d5267cdb963a73f9"
        }
    ],
    "events": [],
    "attendees": [],
    "limits": {
        "modifyOperationsLeft": 30,
        "manualSyncsLeft": 5,
        "memberPropertyTypesLeft": 10,
        "pointTypesLeft": 5,
        "fieldMatchersLeft": 15,
        "eventTypesLeft": 10,
        "sourceFolderUrisLeft": 20,
        "eventsLeft": 100,
        "membersLeft": 200
    }
}

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

export const mockEventLogEventTypesTableData = [
    ["A", "General Meeting", 1],
    ["B", "Social", 2],
    ["C", "Technical Workshop", 3],
    ["D", "Corporate", 2],
    ["E", "Outreach", 3],
]