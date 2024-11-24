import type { Meta, StoryObj } from '@storybook/react';

import { Console } from '../../pages/Console';
import { mockCreateEvents, mockCreateEventTypes, mockCreateMembers, mockDeleteEvents, mockDeleteEventTypes, mockDeleteMembers, mockGetAttendees, mockGetConsoleData, mockGetEvents, mockGetEventTypes, mockGetTroupe, mockUpdateEvents, mockUpdateEventTypes, mockUpdateMembers, mockUpdateTroupe } from '../../lib/api-client.mock';
import { AppContext } from '../../app/context';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

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
      <AppContext>
        <div style={{height:'fit-content', width:'1200px'}}>
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
        </div>
      </AppContext>
    ),
  ],
  component: Console,
} satisfies Meta<typeof Console>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};