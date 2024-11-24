import type { Meta, StoryObj } from '@storybook/react';

import Refresh from '../../../components/svg/Refresh';

const meta = {
  tags: ['autodocs'],
  component: Refresh,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Refresh>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};