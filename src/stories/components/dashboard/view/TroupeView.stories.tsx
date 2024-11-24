import type { Meta, StoryObj } from '@storybook/react';
import TroupeView from '../../../../components/dashboard/view/TroupeView';
import { mockGetConsoleData, mockGetTroupe, mockUpdateTroupe } from '../../../../lib/api-client.mock';
import { ContextDialog } from '../../../../components/common/Dialog';
import { AppContext } from '../../../../app/context';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const meta = {
  component: TroupeView,
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
        mockGetTroupe(),
        mockUpdateTroupe(),
      ],
    }
  },
} satisfies Meta<typeof TroupeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};