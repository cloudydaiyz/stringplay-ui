import type { Meta, StoryObj } from '@storybook/react';

import Warning from '../../../components/svg/Warning';

const meta = {
  tags: ['autodocs'],
  component: Warning,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Warning>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};