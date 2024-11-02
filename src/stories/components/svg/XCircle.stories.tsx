import type { Meta, StoryObj } from '@storybook/react';

import XCircle from '../../../components/svg/XCircle';

const meta = {
  tags: ['autodocs'],
  component: XCircle,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof XCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};