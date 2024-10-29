import type { Meta, StoryObj } from '@storybook/react';

import Login from '../components/Login';

const meta = {
  title: 'Components/Login',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: Login,
} satisfies Meta<typeof Login>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};