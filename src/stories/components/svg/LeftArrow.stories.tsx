import type { Meta, StoryObj } from '@storybook/react';

import LeftArrow from '../../../components/svg/LeftArrow';

const meta = {
  tags: ['autodocs'],
  component: LeftArrow,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LeftArrow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};