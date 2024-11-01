import type { Meta, StoryObj } from '@storybook/react';

import XMark from '../../../components/svg/XMark';

const meta = {
  tags: ['autodocs'],
  component: XMark,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof XMark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};