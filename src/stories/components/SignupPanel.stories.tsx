import type { Meta, StoryObj } from '@storybook/react';

import SignupPanel from '../../components/SignupPanel';
import { mockRegister } from '../../lib/auth.mock';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const meta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        mockRegister(),
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
              path: "/login",
              element: story(),
            },
            {
              path: "/no-service",
              element: story(),
            },
          ])} 
        />
      );
    }
  ],
  component: SignupPanel,
} satisfies Meta<typeof SignupPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};