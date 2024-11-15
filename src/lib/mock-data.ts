import type { ConsoleData } from "@cloudydaiyz/stringplay-core/types/api";

export const defaultConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-15T15:22:23.506Z",
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
        "id": "6737672f53f6f996b8c58429"
    },
    "dashboard": {
        "troupeId": "6737672f53f6f996b8c58429",
        "lastUpdated": "2024-11-15T15:22:23.506Z",
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
        "id": "6737672f53f6f996b8c58429"
    },
    "eventTypes": [
        {
            "lastUpdated": "2024-11-15T15:22:23.506Z",
            "title": "Test Event Type - cool events",
            "value": 10,
            "sourceFolderUris": ["https://google.com","https://google.com","https://google.com",],
            "synchronizedSourceFolderUris": [],
            "id": "6737672f53f6f996b8c5842b"
        },
        {
            "lastUpdated": "2024-11-15T15:22:23.506Z",
            "title": "Test Event Type - alright events",
            "value": 3,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "6737672f53f6f996b8c5842c"
        },
        {
            "lastUpdated": "2024-11-15T15:22:23.506Z",
            "title": "Test Event Type - uncool events",
            "value": -7,
            "sourceFolderUris": ["https://google.com","https://google.com"],
            "synchronizedSourceFolderUris": [],
            "id": "6737672f53f6f996b8c5842d"
        }
    ],
    "events": [
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.506Z",
            "title": "test event 1",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/first",
            "synchronizedSourceUri": "https://example.com/first",
            "startDate": "2024-11-15T15:22:23.506Z",
            "eventTypeId": "6737672f53f6f996b8c5842b",
            "eventTypeTitle": "Test Event Type - cool events",
            "value": 10,
            "fieldToPropertyMap": {
                "6737672f53f6f996b8c5842f": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6737672f53f6f996b8c5842f": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                }
            },
            "id": "6737672f53f6f996b8c5842e"
        },
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.506Z",
            "title": "test event 2",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/second",
            "synchronizedSourceUri": "https://example.com/second",
            "startDate": "2024-10-14T04:29:01.961Z",
            "eventTypeId": "6737672f53f6f996b8c5842c",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {
                "6737672f53f6f996b8c58431": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday"
                },
                "6737672f53f6f996b8c58432": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                },
                "6737672f53f6f996b8c58433": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name"
                },
                "6737672f53f6f996b8c58434": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6737672f53f6f996b8c58431": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday"
                },
                "6737672f53f6f996b8c58432": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                },
                "6737672f53f6f996b8c58433": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name"
                },
                "6737672f53f6f996b8c58434": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                }
            },
            "id": "6737672f53f6f996b8c58430"
        },
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.506Z",
            "title": "test event 3",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/third",
            "synchronizedSourceUri": "https://example.com/third",
            "startDate": "2024-11-15T15:22:23.506Z",
            "eventTypeId": "6737672f53f6f996b8c5842d",
            "eventTypeTitle": "Test Event Type - uncool events",
            "value": -7,
            "fieldToPropertyMap": {
                "6737672f53f6f996b8c58436": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday"
                },
                "6737672f53f6f996b8c58437": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                },
                "6737672f53f6f996b8c58438": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6737672f53f6f996b8c58436": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday"
                },
                "6737672f53f6f996b8c58437": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                },
                "6737672f53f6f996b8c58438": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name"
                }
            },
            "id": "6737672f53f6f996b8c58435"
        },
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.506Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fourth",
            "synchronizedSourceUri": "https://example.com/fourth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "value": 4,
            "fieldToPropertyMap": {
                "6737672f53f6f996b8c5843a": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6737672f53f6f996b8c5843a": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name"
                }
            },
            "id": "6737672f53f6f996b8c58439"
        },
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.506Z",
            "title": "test event 5",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fifth",
            "synchronizedSourceUri": "https://example.com/fifth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "eventTypeId": "6737672f53f6f996b8c5842c",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {
                "6737672f53f6f996b8c5843c": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6737672f53f6f996b8c5843c": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday"
                }
            },
            "id": "6737672f53f6f996b8c5843b"
        },
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.506Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/sixth",
            "synchronizedSourceUri": "https://example.com/sixth",
            "startDate": "2024-11-15T15:22:23.506Z",
            "value": -2,
            "fieldToPropertyMap": {
                "6737672f53f6f996b8c5843e": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday"
                },
                "6737672f53f6f996b8c5843f": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                },
                "6737672f53f6f996b8c58440": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6737672f53f6f996b8c5843e": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Birthday"
                },
                "6737672f53f6f996b8c5843f": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                },
                "6737672f53f6f996b8c58440": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                }
            },
            "id": "6737672f53f6f996b8c5843d"
        },
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.506Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/seventh",
            "synchronizedSourceUri": "https://example.com/seventh",
            "startDate": "2024-11-15T15:22:23.506Z",
            "value": 7,
            "fieldToPropertyMap": {
                "6737672f53f6f996b8c58442": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name"
                },
                "6737672f53f6f996b8c58443": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                },
                "6737672f53f6f996b8c58444": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                },
                "6737672f53f6f996b8c58445": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "6737672f53f6f996b8c58442": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name"
                },
                "6737672f53f6f996b8c58443": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                },
                "6737672f53f6f996b8c58444": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                },
                "6737672f53f6f996b8c58445": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "First Name"
                }
            },
            "id": "6737672f53f6f996b8c58441"
        }
    ],
    "attendees": [
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.506Z",
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
                    "value": "Fri Nov 15 2024 09:22:23 GMT-0600 (Central Standard Time)",
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
                "6737672f53f6f996b8c5842e",
                "6737672f53f6f996b8c58435"
            ],
            "id": "6737672f53f6f996b8c58446"
        },
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.506Z",
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
                    "value": "Fri Nov 15 2024 09:22:23 GMT-0600 (Central Standard Time)",
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
                "6737672f53f6f996b8c5842e",
                "6737672f53f6f996b8c58430",
                "6737672f53f6f996b8c58435",
                "6737672f53f6f996b8c58439",
                "6737672f53f6f996b8c5843b"
            ],
            "id": "6737672f53f6f996b8c58448"
        },
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.507Z",
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
                    "value": "Fri Nov 15 2024 09:22:23 GMT-0600 (Central Standard Time)",
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
                "6737672f53f6f996b8c58430",
                "6737672f53f6f996b8c58439",
                "6737672f53f6f996b8c58441"
            ],
            "id": "6737672f53f6f996b8c5844a"
        },
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.507Z",
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
                    "value": "Fri Nov 15 2024 09:22:23 GMT-0600 (Central Standard Time)",
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
                "6737672f53f6f996b8c58435",
                "6737672f53f6f996b8c58439",
                "6737672f53f6f996b8c5843b",
                "6737672f53f6f996b8c5843d"
            ],
            "id": "6737672f53f6f996b8c5844c"
        },
        {
            "troupeId": "6737672f53f6f996b8c58429",
            "lastUpdated": "2024-11-15T15:22:23.507Z",
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
                    "value": "Fri Nov 15 2024 09:22:23 GMT-0600 (Central Standard Time)",
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
                "6737672f53f6f996b8c5842e",
                "6737672f53f6f996b8c58430",
                "6737672f53f6f996b8c58435",
                "6737672f53f6f996b8c58439",
                "6737672f53f6f996b8c5843b",
                "6737672f53f6f996b8c5843d",
                "6737672f53f6f996b8c58441"
            ],
            "id": "6737672f53f6f996b8c5844e"
        }
    ]
}

export const noMembersConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-15T15:24:23.190Z",
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
        "id": "673767a7ebda6da204741366"
    },
    "dashboard": {
        "troupeId": "673767a7ebda6da204741366",
        "lastUpdated": "2024-11-15T15:24:23.190Z",
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
        "id": "673767a7ebda6da204741366"
    },
    "eventTypes": [
        {
            "lastUpdated": "2024-11-15T15:24:23.190Z",
            "title": "Test Event Type - cool events",
            "value": 10,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "673767a7ebda6da204741368"
        },
        {
            "lastUpdated": "2024-11-15T15:24:23.190Z",
            "title": "Test Event Type - alright events",
            "value": 3,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "673767a7ebda6da204741369"
        },
        {
            "lastUpdated": "2024-11-15T15:24:23.190Z",
            "title": "Test Event Type - uncool events",
            "value": -7,
            "sourceFolderUris": [],
            "synchronizedSourceFolderUris": [],
            "id": "673767a7ebda6da20474136a"
        }
    ],
    "events": [
        {
            "troupeId": "673767a7ebda6da204741366",
            "lastUpdated": "2024-11-15T15:24:23.190Z",
            "title": "test event 1",
            "source": "Google Forms",
            "synchronizedSource": "",
            "sourceUri": "https://docs.google.com/forms/d/1zmXsG53ymMTY16OoPR0VD7mqqP94HcPILskiOA7lOA4",
            "synchronizedSourceUri": "https://example.com/first",
            "startDate": "2024-11-15T15:24:23.190Z",
            "eventTypeId": "673767a7ebda6da204741368",
            "eventTypeTitle": "Test Event Type - cool events",
            "value": 10,
            "fieldToPropertyMap": {
                "673767a7ebda6da20474136c": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name"
                },
                "673767a7ebda6da20474136d": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                },
                "673767a7ebda6da20474136e": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "673767a7ebda6da20474136c": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name"
                },
                "673767a7ebda6da20474136d": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                },
                "673767a7ebda6da20474136e": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                }
            },
            "id": "673767a7ebda6da20474136b"
        },
        {
            "troupeId": "673767a7ebda6da204741366",
            "lastUpdated": "2024-11-15T15:24:23.190Z",
            "title": "test event 2",
            "source": "Google Sheets",
            "synchronizedSource": "",
            "sourceUri": "https://docs.google.com/spreadsheets/d/1Ita-QOxFBd37i-_7xxKtTOh4FghBknFY5WO9Yrqc2nE/edit",
            "synchronizedSourceUri": "https://example.com/second",
            "startDate": "2024-10-14T04:29:01.961Z",
            "eventTypeId": "673767a7ebda6da204741369",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {
                "673767a7ebda6da204741370": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "673767a7ebda6da204741370": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                }
            },
            "id": "673767a7ebda6da20474136f"
        },
        {
            "troupeId": "673767a7ebda6da204741366",
            "lastUpdated": "2024-11-15T15:24:23.190Z",
            "title": "test event 3",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/third",
            "synchronizedSourceUri": "https://example.com/third",
            "startDate": "2024-11-15T15:24:23.190Z",
            "eventTypeId": "673767a7ebda6da20474136a",
            "eventTypeTitle": "Test Event Type - uncool events",
            "value": -7,
            "fieldToPropertyMap": {
                "673767a7ebda6da204741372": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                },
                "673767a7ebda6da204741373": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "673767a7ebda6da204741372": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Email"
                },
                "673767a7ebda6da204741373": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                }
            },
            "id": "673767a7ebda6da204741371"
        },
        {
            "troupeId": "673767a7ebda6da204741366",
            "lastUpdated": "2024-11-15T15:24:23.190Z",
            "title": "test event 4 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fourth",
            "synchronizedSourceUri": "https://example.com/fourth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "value": 4,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "673767a7ebda6da204741374"
        },
        {
            "troupeId": "673767a7ebda6da204741366",
            "lastUpdated": "2024-11-15T15:24:23.190Z",
            "title": "test event 5",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/fifth",
            "synchronizedSourceUri": "https://example.com/fifth",
            "startDate": "2024-10-13T20:09:01.961Z",
            "eventTypeId": "673767a7ebda6da204741369",
            "eventTypeTitle": "Test Event Type - alright events",
            "value": 3,
            "fieldToPropertyMap": {
                "673767a7ebda6da204741376": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                },
                "673767a7ebda6da204741377": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name"
                }
            },
            "synchronizedFieldToPropertyMap": {
                "673767a7ebda6da204741376": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Member ID"
                },
                "673767a7ebda6da204741377": {
                    "field": "How much wood can a woodchuck chuck if a woodchuck could chuck would?",
                    "property": "Last Name"
                }
            },
            "id": "673767a7ebda6da204741375"
        },
        {
            "troupeId": "673767a7ebda6da204741366",
            "lastUpdated": "2024-11-15T15:24:23.190Z",
            "title": "test event 6 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/sixth",
            "synchronizedSourceUri": "https://example.com/sixth",
            "startDate": "2024-11-15T15:24:23.190Z",
            "value": -2,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "673767a7ebda6da204741378"
        },
        {
            "troupeId": "673767a7ebda6da204741366",
            "lastUpdated": "2024-11-15T15:24:23.190Z",
            "title": "test event 7 (special)",
            "source": "",
            "synchronizedSource": "",
            "sourceUri": "https://example.com/seventh",
            "synchronizedSourceUri": "https://example.com/seventh",
            "startDate": "2024-11-15T15:24:23.190Z",
            "value": 7,
            "fieldToPropertyMap": {},
            "synchronizedFieldToPropertyMap": {},
            "id": "673767a7ebda6da204741379"
        }
    ],
    "attendees": []
}

export const onlyEventTypesConfig: ConsoleData = {
    "troupe": {
        "lastUpdated": "2024-11-15T15:25:19.596Z",
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
        "id": "673767df1bf0e5af4e094096"
    },
    "dashboard": {
        "troupeId": "673767df1bf0e5af4e094096",
        "lastUpdated": "2024-11-15T15:25:19.596Z",
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
        "id": "673767df1bf0e5af4e094096"
    },
    "eventTypes": [
        {
            "lastUpdated": "2024-11-15T15:25:19.596Z",
            "title": "Test Event Type - cool events",
            "value": 10,
            "sourceFolderUris": [
                "https://drive.google.com/drive/folders/1gQAhRgA7RzOPe_7YWdjniBiK8Q97yV8D"
            ],
            "synchronizedSourceFolderUris": [],
            "id": "673767df1bf0e5af4e094098"
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