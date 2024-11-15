import type { Meta, StoryObj } from '@storybook/react';

import Bolt from '../../../components/svg/Bolt';

const meta = {
  tags: ['autodocs'],
  component: Bolt,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Bolt>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};