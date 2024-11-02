import type { Meta, StoryObj } from '@storybook/react';

import Plus from '../../../components/svg/Plus';

const meta = {
  tags: ['autodocs'],
  component: Plus,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Plus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};