import type { Meta, StoryObj } from '@storybook/react';

import { LoginPage } from '../../pages/LoginPage';
import { mockLogin } from '../../lib/auth.mock';
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
        <div 
          className='auth-page-sample-container'
          style={{
            width: '1000px',
            height: '1000px',
            position: 'relative',
            zIndex: '100',
          }}
        >
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
        </div>
      );
    }
  ],
  component: LoginPage,
} satisfies Meta<typeof LoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 0,
  }
};