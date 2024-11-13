import type { ConsoleData } from "@cloudydaiyz/stringplay-core/types/api";

export const defaultConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-13T09:17:12.200Z",
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
        "id": "67346e98ada8756df905e545"
    },
    "dashboard": {
        "troupeId": "67346e98ada8756df905e545",
        "lastUpdated": "2024-11-13T09:17:12.200Z",
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
        "id": "67346e98ada8756df905e545"
    },
    "eventTypes": [
        {
            "lastUpdated": "2024-11-13T09:17:12.200Z",
            "title": "Test Event Type - cool events",
            "value": 10,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "67346e98ada8756df905e547"
        },
        {
            "lastUpdated": "2024-11-13T09:17:12.200Z",
            "title": "Test Event Type - alright events",
            "value": 3,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "67346e98ada8756df905e548"
        },
        {
            "lastUpdated": "2024-11-13T09:17:12.200Z",
            "title": "Test Event Type - uncool events",
            "value": -7,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "67346e98ada8756df905e549"
        }
    ],
    "events": [
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
            "title": "test event 1",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/first",
            "synchronizedSourceUri": "https://example.com/first",
            "startDate": "2024-11-13T09:17:12.200Z",
            "eventTypeId": "67346e98ada8756df905e547",
            "eventTypeTitle": "Test Event Type - cool events",
            "value": 10,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346e98ada8756df905e54a"
        },
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
            "title": "test event 2",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/second",
            "synchronizedSourceUri": "https://example.com/second",
            "startDate": "2024-10-14T04:29:01.961Z",
            "eventTypeId": "67346e98ada8756df905e548",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346e98ada8756df905e54b"
        },
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
            "title": "test event 3",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/third",
            "synchronizedSourceUri": "https://example.com/third",
            "startDate": "2024-11-13T09:17:12.200Z",
            "eventTypeId": "67346e98ada8756df905e549",
            "eventTypeTitle": "Test Event Type - uncool events",
            "value": -7,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346e98ada8756df905e54c"
        },
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fourth",
            "synchronizedSourceUri": "https://example.com/fourth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "value": 4,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346e98ada8756df905e54d"
        },
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
            "title": "test event 5",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fifth",
            "synchronizedSourceUri": "https://example.com/fifth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "eventTypeId": "67346e98ada8756df905e548",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346e98ada8756df905e54e"
        },
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/sixth",
            "synchronizedSourceUri": "https://example.com/sixth",
            "startDate": "2024-11-13T09:17:12.200Z",
            "value": -2,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346e98ada8756df905e54f"
        },
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/seventh",
            "synchronizedSourceUri": "https://example.com/seventh",
            "startDate": "2024-11-13T09:17:12.200Z",
            "value": 7,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346e98ada8756df905e550"
        }
    ],
    "attendees": [
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
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
                    "value": "Wed Nov 13 2024 03:17:12 GMT-0600 (Central Standard Time)",
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
                "67346e98ada8756df905e54a",
                "67346e98ada8756df905e54c"
            ],
            "id": "67346e98ada8756df905e551"
        },
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
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
                    "value": "Wed Nov 13 2024 03:17:12 GMT-0600 (Central Standard Time)",
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
                "67346e98ada8756df905e54a",
                "67346e98ada8756df905e54b",
                "67346e98ada8756df905e54c",
                "67346e98ada8756df905e54d",
                "67346e98ada8756df905e54e"
            ],
            "id": "67346e98ada8756df905e553"
        },
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
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
                    "value": "Wed Nov 13 2024 03:17:12 GMT-0600 (Central Standard Time)",
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
                "67346e98ada8756df905e54b",
                "67346e98ada8756df905e54d",
                "67346e98ada8756df905e550"
            ],
            "id": "67346e98ada8756df905e555"
        },
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
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
                    "value": "Wed Nov 13 2024 03:17:12 GMT-0600 (Central Standard Time)",
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
                "67346e98ada8756df905e54c",
                "67346e98ada8756df905e54d",
                "67346e98ada8756df905e54e",
                "67346e98ada8756df905e54f"
            ],
            "id": "67346e98ada8756df905e557"
        },
        {
            "troupeId": "67346e98ada8756df905e545",
            "lastUpdated": "2024-11-13T09:17:12.200Z",
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
                    "value": "Wed Nov 13 2024 03:17:12 GMT-0600 (Central Standard Time)",
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
                "67346e98ada8756df905e54a",
                "67346e98ada8756df905e54b",
                "67346e98ada8756df905e54c",
                "67346e98ada8756df905e54d",
                "67346e98ada8756df905e54e",
                "67346e98ada8756df905e54f",
                "67346e98ada8756df905e550"
            ],
            "id": "67346e98ada8756df905e559"
        }
    ]
}

export const noMembersConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-13T09:19:28.464Z",
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
        "id": "67346f208bea6b97e50f9266"
    },
    "dashboard": {
        "troupeId": "67346f208bea6b97e50f9266",
        "lastUpdated": "2024-11-13T09:19:28.464Z",
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
        "id": "67346f208bea6b97e50f9266"
    },
    "eventTypes": [
        {
            "lastUpdated": "2024-11-13T09:19:28.464Z",
            "title": "Test Event Type - cool events",
            "value": 10,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "67346f208bea6b97e50f9268"
        },
        {
            "lastUpdated": "2024-11-13T09:19:28.464Z",
            "title": "Test Event Type - alright events",
            "value": 3,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "67346f208bea6b97e50f9269"
        },
        {
            "lastUpdated": "2024-11-13T09:19:28.464Z",
            "title": "Test Event Type - uncool events",
            "value": -7,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "67346f208bea6b97e50f926a"
        }
    ],
    "events": [
        {
            "troupeId": "67346f208bea6b97e50f9266",
            "lastUpdated": "2024-11-13T09:19:28.464Z",
            "title": "test event 1",
            "source": "Google Forms",
            "synchronizedSource": "",
            "sourceUri": "https://docs.google.com/forms/d/1zmXsG53ymMTY16OoPR0VD7mqqP94HcPILskiOA7lOA4",
            "synchronizedSourceUri": "https://example.com/first",
            "startDate": "2024-11-13T09:19:28.464Z",
            "eventTypeId": "67346f208bea6b97e50f9268",
            "eventTypeTitle": "Test Event Type - cool events",
            "value": 10,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346f208bea6b97e50f926b"
        },
        {
            "troupeId": "67346f208bea6b97e50f9266",
            "lastUpdated": "2024-11-13T09:19:28.464Z",
            "title": "test event 2",
            "source": "Google Sheets",
            "synchronizedSource": "",
            "sourceUri": "https://docs.google.com/spreadsheets/d/1Ita-QOxFBd37i-_7xxKtTOh4FghBknFY5WO9Yrqc2nE/edit",
            "synchronizedSourceUri": "https://example.com/second",
            "startDate": "2024-10-14T04:29:01.961Z",
            "eventTypeId": "67346f208bea6b97e50f9269",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346f208bea6b97e50f926c"
        },
        {
            "troupeId": "67346f208bea6b97e50f9266",
            "lastUpdated": "2024-11-13T09:19:28.464Z",
            "title": "test event 3",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/third",
            "synchronizedSourceUri": "https://example.com/third",
            "startDate": "2024-11-13T09:19:28.464Z",
            "eventTypeId": "67346f208bea6b97e50f926a",
            "eventTypeTitle": "Test Event Type - uncool events",
            "value": -7,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346f208bea6b97e50f926d"
        },
        {
            "troupeId": "67346f208bea6b97e50f9266",
            "lastUpdated": "2024-11-13T09:19:28.464Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fourth",
            "synchronizedSourceUri": "https://example.com/fourth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "value": 4,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346f208bea6b97e50f926e"
        },
        {
            "troupeId": "67346f208bea6b97e50f9266",
            "lastUpdated": "2024-11-13T09:19:28.464Z",
            "title": "test event 5",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fifth",
            "synchronizedSourceUri": "https://example.com/fifth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "eventTypeId": "67346f208bea6b97e50f9269",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346f208bea6b97e50f926f"
        },
        {
            "troupeId": "67346f208bea6b97e50f9266",
            "lastUpdated": "2024-11-13T09:19:28.464Z",
            "title": "test event 6 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/sixth",
            "synchronizedSourceUri": "https://example.com/sixth",
            "startDate": "2024-11-13T09:19:28.464Z",
            "value": -2,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346f208bea6b97e50f9270"
        },
        {
            "troupeId": "67346f208bea6b97e50f9266",
            "lastUpdated": "2024-11-13T09:19:28.464Z",
            "title": "test event 7 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/seventh",
            "synchronizedSourceUri": "https://example.com/seventh",
            "startDate": "2024-11-13T09:19:28.464Z",
            "value": 7,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "67346f208bea6b97e50f9271"
        }
    ],
    "attendees": []
}

export const onlyEventTypesConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-13T09:20:18.564Z",
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
        "id": "67346f52c412ad0f3297f1b4"
    },
    "dashboard": {
        "troupeId": "67346f52c412ad0f3297f1b4",
        "lastUpdated": "2024-11-13T09:20:18.564Z",
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
        "id": "67346f52c412ad0f3297f1b4"
    },
    "eventTypes": [
        {
            "lastUpdated": "2024-11-13T09:20:18.564Z",
            "title": "Test Event Type - cool events",
            "value": 10,
            "sourceFolderUris": [
                "https://drive.google.com/drive/folders/1gQAhRgA7RzOPe_7YWdjniBiK8Q97yV8D"
            ],
            "synchronizedSourceFolderUris": [],
            "id": "67346f52c412ad0f3297f1b6"
        }
    ],
    "events": [],
    "attendees": []
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