import type { Meta, StoryObj } from '@storybook/react';

import Trash from '../../../components/svg/Trash';

const meta = {
  tags: ['autodocs'],
  component: Trash,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Trash>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};