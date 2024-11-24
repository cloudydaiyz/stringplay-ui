import type { Meta, StoryObj } from '@storybook/react';
import DashboardView from '../../../../components/dashboard/view/DashboardView';
import { mockGetConsoleData } from '../../../../lib/api-client.mock';
import { AppContext } from '../../../../app/context';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const meta = {
  component: DashboardView,
  decorators: [(story) => (
    <AppContext>
      <div style={{width:'800px', minHeight:'100vh'}}>
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
  )],
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        mockGetConsoleData(),
      ],
    }
  },
} satisfies Meta<typeof DashboardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};