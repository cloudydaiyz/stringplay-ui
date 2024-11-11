import type { Meta, StoryObj } from '@storybook/react';
import EventLogView from '../../../../components/dashboard/view/EventLogView';
import { mockCreateEvents, mockCreateEventTypes, mockDeleteEvents, mockDeleteEventTypes, mockGetConsoleData, mockGetEvents, mockGetEventTypes, mockUpdateEvents, mockUpdateEventTypes } from '../../../../lib/api-client.mock';
import { ApiClientProvider } from '../../../../lib/api-client';

const meta = {
  component: EventLogView,
  decorators: [(story) => (
    <ApiClientProvider>
      <div style={{width:'800px', minHeight:'100vh', height:'100vh'}}>
        {story()}
      </div>
    </ApiClientProvider>
  )],
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        mockGetConsoleData(),
        mockCreateEvents(),
        mockGetEvents(),
        mockUpdateEvents(),
        mockDeleteEvents(),
        mockCreateEventTypes(),
        mockGetEventTypes(),
        mockUpdateEventTypes(),
        mockDeleteEventTypes(),
      ],
    }
  },
} satisfies Meta<typeof EventLogView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};