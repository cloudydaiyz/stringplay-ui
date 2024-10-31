import type { Meta, StoryObj } from '@storybook/react';

import Home from '../../../components/svg/Home';

const meta = {
  title: 'components/svg/Home',
  tags: ['autodocs'],
  component: Home,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};