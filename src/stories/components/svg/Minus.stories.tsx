import type { Meta, StoryObj } from '@storybook/react';

import Minus from '../../../components/svg/Minus';

const meta = {
  tags: ['autodocs'],
  component: Minus,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Minus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};