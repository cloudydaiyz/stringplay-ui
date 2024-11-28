import type { Meta, StoryObj } from '@storybook/react';
import DashboardView from '../../../../components/dashboard/view/DashboardView';
import { mockGetConsoleData } from '../../../../lib/api-client.mock';
import { AppContext } from '../../../../app/context';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const meta = {
  component: DashboardView,
  decorators: [(story) => (
    <div style={{width:'800px', minHeight:'100vh'}}>
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
    </div>
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