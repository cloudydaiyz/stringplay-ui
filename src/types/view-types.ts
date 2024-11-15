type Subview<K extends string, V> = {
    subviewId: K; 
    props: V;
}

// === INDIVIDUAL SUBVIEW TYPES === //

export interface EventInformationProps {
    eventId: string;
}

export interface EventTypeInformationProps {
    eventTypeId: string;
}

// === COMPOSITE SUBVIEW TYPES === //

export type EventLogSubview = Subview<'event-log', {}> 
    | Subview<'event-info', EventInformationProps>
    | Subview<'event-type-info', EventTypeInformationProps>;

export interface SetEventLogSubview {
    setSubview: React.Dispatch<React.SetStateAction<EventLogSubview>>;
}