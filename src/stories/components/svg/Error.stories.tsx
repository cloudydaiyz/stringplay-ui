import type { Meta, StoryObj } from '@storybook/react';

import Error from '../../../components/svg/Error';

const meta = {
  tags: ['autodocs'],
  component: Error,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Error>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};