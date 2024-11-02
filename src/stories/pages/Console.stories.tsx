import type { Meta, StoryObj } from '@storybook/react';

import Console from '../../pages/Console';

const meta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: Console,
} satisfies Meta<typeof Console>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};