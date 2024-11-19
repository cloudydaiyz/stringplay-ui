import type { Meta, StoryObj } from '@storybook/react';

import SignupPanel from '../../components/SignupPanel';
import { mockRegister } from '../../lib/auth.mock';

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
  component: SignupPanel,
} satisfies Meta<typeof SignupPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};