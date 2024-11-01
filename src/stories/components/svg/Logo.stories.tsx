import type { Meta, StoryObj } from '@storybook/react';

import Logo from '../../../components/svg/Logo';

const meta = {
  tags: ['autodocs'],
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  args: {
    animated: false,
  }
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};