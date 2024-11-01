import type { Meta, StoryObj } from '@storybook/react';

import Check from '../../../components/svg/Check';

const meta = {
  tags: ['autodocs'],
  component: Check,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Check>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};