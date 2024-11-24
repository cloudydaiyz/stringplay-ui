import type { Meta, StoryObj } from '@storybook/react';
import { mockLogin } from '../../lib/auth.mock';

import LoginPanel from '../../components/LoginPanel';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const meta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        mockLogin(),
      ]
    },
  },
  decorators: [
    (story) => {
      return (
        <RouterProvider 
          router={createMemoryRouter([
            {
              path: "/",
              element: story(),
            },
            {
              path: "/register",
              element: story(),
            },
            {
              path: "/console",
              element: story(),
            },
          ])} 
        />
      );
    }
  ],
  component: LoginPanel,
} satisfies Meta<typeof LoginPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};