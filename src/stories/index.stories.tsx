import type { Meta, StoryObj } from '@storybook/react';

import { Console } from '../pages/Console';
import { mockCreateEvents, mockCreateEventTypes, mockCreateMembers, mockDeleteEvents, mockDeleteEventTypes, mockDeleteMembers, mockGetAttendees, mockGetConsoleData, mockGetEvents, mockGetEventTypes, mockGetTroupe, mockUpdateEvents, mockUpdateEventTypes, mockUpdateMembers, mockUpdateTroupe } from '../lib/api-client.mock';
import { AppContext } from '../app/context';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../app/router';
import { mockLogin, mockRegister } from '../lib/auth.mock';

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
        mockLogin(),
        mockRegister(),
      ],
    }
  },
  decorators: [
    () => (
        <AppContext>
            <div 
                style={{
                    minHeight:'100vh',
                    height:'100px', 
                    minWidth:'1200px', 
                    position:'relative', 
                    zIndex:10
                }}>
                <RouterProvider router={createMemoryRouter(routes)} />
            </div>
        </AppContext>
    ),
  ],
  component: Console,
} satisfies Meta<typeof Console>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};