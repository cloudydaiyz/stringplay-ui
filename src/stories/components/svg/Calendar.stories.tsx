import type { Meta, StoryObj } from '@storybook/react';

import Calendar from '../../../components/svg/Calendar';

const meta = {
  tags: ['autodocs'],
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};