import type { Meta, StoryObj } from '@storybook/react';
import TroupeView from '../../../../components/dashboard/view/TroupeView';
import { mockGetConsoleData, mockGetTroupe, mockInitiateSync, mockUpdateTroupe } from '../../../../lib/api-client.mock';
import { AppContext } from '../../../../app/context';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const meta = {
  component: TroupeView,
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
        mockGetTroupe(),
        mockUpdateTroupe(),
        mockInitiateSync(),
      ],
    }
  },
} satisfies Meta<typeof TroupeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};