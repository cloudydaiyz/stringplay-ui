import type { Meta, StoryObj } from '@storybook/react';
import { mockLogin } from '../../lib/auth.mock';

import LoginPanel from '../../components/LoginPanel';

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
  component: LoginPanel,
} satisfies Meta<typeof LoginPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};