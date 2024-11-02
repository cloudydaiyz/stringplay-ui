import type { Meta, StoryObj } from '@storybook/react';

import Edit from '../../../components/svg/Edit';

const meta = {
  tags: ['autodocs'],
  component: Edit,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Edit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};