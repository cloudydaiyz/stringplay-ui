import type { Meta, StoryObj } from '@storybook/react';

import { Console } from '../../pages/Console';
import { ApiClientProvider } from '../../lib/api-client';
import { mockCreateEvents, mockCreateEventTypes, mockCreateMembers, mockDeleteEvents, mockDeleteEventTypes, mockDeleteMembers, mockGetAttendees, mockGetConsoleData, mockGetEvents, mockGetEventTypes, mockGetTroupe, mockUpdateEvents, mockUpdateEventTypes, mockUpdateMembers, mockUpdateTroupe } from '../../lib/api-client.mock';
import { DialogProvider } from '../../lib/toggle-dialog';

const meta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        mockGetConsoleData(),
        mockGetTroupe(),
        mockUpdateTroupe(),
        mockCreateEvents(),
        mockGetEvents(),
        mockUpdateEvents(),
        mockDeleteEvents(),
        mockCreateEventTypes(),
        mockGetEventTypes(),
        mockUpdateEventTypes(),
        mockDeleteEventTypes(),
        mockCreateMembers(),
        mockGetAttendees(),
        mockUpdateMembers(),
        mockDeleteMembers(),
      ],
    }
  },
  decorators: [
    (story) => (
      <ApiClientProvider>
        <DialogProvider>
          <div style={{height:'fit-content', width:'1200px'}}>
            {story()}
          </div>
        </DialogProvider>
      </ApiClientProvider>
    ),
  ],
  component: Console,
} satisfies Meta<typeof Console>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};