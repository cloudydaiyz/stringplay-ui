import type { Meta, StoryObj } from '@storybook/react';
import EventLogView from '../../../../components/dashboard/view/EventLogView';
import { mockCreateEvents, mockCreateEventTypes, mockDeleteEvents, mockDeleteEventTypes, mockGetConsoleData, mockGetEvents, mockGetEventTypes, mockUpdateEvents, mockUpdateEventTypes } from '../../../../lib/api-client.mock';
import { ContextDialog } from '../../../../components/common/Dialog';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { AppContext } from '../../../../app/context';

const meta = {
  component: EventLogView,
  decorators: [(story) => (
    <AppContext>
      <div style={{width:'800px', minHeight:'100vh', height:'100vh'}}>
        <RouterProvider 
          router={createMemoryRouter([
            {
              path: "/",
              element: story(),
            },
            {
              path: "/login",
              element: story(),
            },
          ])} 
        />
        <ContextDialog />
      </div>
    </AppContext>
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