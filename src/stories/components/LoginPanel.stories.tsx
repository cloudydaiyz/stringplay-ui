import type { Meta, StoryObj } from '@storybook/react';

import LoginPanel from '../../components/LoginPanel';

const meta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: LoginPanel,
} satisfies Meta<typeof LoginPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};