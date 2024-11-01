import type { Meta, StoryObj } from '@storybook/react';

import Settings from '../../../components/svg/Settings';

const meta = {
  tags: ['autodocs'],
  component: Settings,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Settings>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};