import type { Meta, StoryObj } from '@storybook/react';

import { SignupPage } from '../../pages/SignupPage';
import { fn } from '@storybook/test';
import { mockRegister } from '../../lib/auth.mock';

const meta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        mockRegister(),
      ]
    }
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
          { story() }
        </div>
      )
    }
  ],
  args: {
    changePage: fn(),
  },
  component: SignupPage,
} satisfies Meta<typeof SignupPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 0,
  }
};