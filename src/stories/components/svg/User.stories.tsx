import type { Meta, StoryObj } from '@storybook/react';

import User from '../../../components/svg/User';

const meta = {
  title: 'components/svg/User',
  tags: ['autodocs'],
  component: User,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof User>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};