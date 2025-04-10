import type { Meta, StoryObj } from '@storybook/react';
import MemberLogView from '../../../../components/dashboard/view/MemberLogView';
import { mockCreateMembers, mockDeleteMembers, mockGetAttendees, mockGetConsoleData, mockUpdateMembers } from '../../../../lib/api-client.mock';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { AppContext } from '../../../../app/context';
import { defaultConfig } from '../../../../lib/mock-data';

const meta = {
  component: MemberLogView,
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
        mockCreateMembers(),
        mockGetAttendees(),
        mockUpdateMembers(),
        mockDeleteMembers(),
      ],
    }
  },
} satisfies Meta<typeof MemberLogView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGetConsoleData(),
      ],
    }
  },
};

const mockConsoleNoEvents = structuredClone(defaultConfig);
mockConsoleNoEvents.events = [];

export const NoEvents: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGetConsoleData(mockConsoleNoEvents),
      ],
    }
  },
};