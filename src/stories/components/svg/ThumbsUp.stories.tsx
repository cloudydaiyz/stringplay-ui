import type { Meta, StoryObj } from '@storybook/react';

import ThumbsUp from '../../../components/svg/ThumbsUp';

const meta = {
  tags: ['autodocs'],
  component: ThumbsUp,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ThumbsUp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};