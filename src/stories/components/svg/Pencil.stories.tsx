import type { Meta, StoryObj } from '@storybook/react';

import Pencil from '../../../components/svg/Pencil';

const meta = {
  tags: ['autodocs'],
  component: Pencil,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Pencil>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};