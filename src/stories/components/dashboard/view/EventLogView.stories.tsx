import type { Meta, StoryObj } from '@storybook/react';
import EventLogView from '../../../../components/dashboard/view/EventLogView';
import { mockCreateEvent, mockCreateEventType, mockDeleteEvent, mockDeleteEventType, mockGetConsoleData, mockGetEvents, mockGetEventTypes, mockUpdateEvent, mockUpdateEventType } from '../../../../lib/api-client.mock';

const meta = {
  component: EventLogView,
  decorators: [(story) => <div style={{width:'800px', minHeight:'100vh', height:'100vh'}}>
    {story()}
  </div>],
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        mockGetConsoleData,
        mockCreateEvent,
        mockGetEvents,
        mockUpdateEvent,
        mockDeleteEvent,
        mockCreateEventType,
        mockGetEventTypes,
        mockUpdateEventType,
        mockDeleteEventType,
      ],
    }
  },
} satisfies Meta<typeof EventLogView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};