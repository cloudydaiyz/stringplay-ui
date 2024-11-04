import type { Meta, StoryObj } from '@storybook/react';

import Info from '../../../components/svg/Info';

const meta = {
  tags: ['autodocs'],
  component: Info,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Info>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};