import type { Meta, StoryObj } from '@storybook/react';
import MemberLogView from '../../../../components/dashboard/view/MemberLogView';
import { mockCreateMembers, mockDeleteMembers, mockGetAttendees, mockGetConsoleData, mockUpdateMembers } from '../../../../lib/api-client.mock';
import { ContextDialog } from '../../../../components/common/Dialog';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { AppContext } from '../../../../app/context';

const meta = {
  component: MemberLogView,
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

export const Primary: Story = {};