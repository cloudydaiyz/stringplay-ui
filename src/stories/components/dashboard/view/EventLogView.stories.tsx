import type { Meta, StoryObj } from '@storybook/react';
import EventLogView from '../../../../components/dashboard/view/EventLogView';
import { mockCreateEvents, mockCreateEventTypes, mockDeleteEvents, mockDeleteEventTypes, mockGetConsoleData, mockGetEvents, mockGetEventTypes, mockUpdateEvents, mockUpdateEventTypes } from '../../../../lib/api-client.mock';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { AppContext } from '../../../../app/context';

const meta = {
  component: EventLogView,
  decorators: [(story) => (
    <RouterProvider 
      router={createMemoryRouter([
        {
          path: "/",
          element: AppContext({ children: story() }),
        },
        {
          path: "/login",
          element: AppContext({ children: story() }),
        },
        {
          path: "/no-service",
          element: AppContext({ children: story() }),
        },
      ])} 
    />
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