import type { Meta, StoryObj } from '@storybook/react';
import Line from '../../../components/common/Line';
// import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Line,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // args: { onClick: fn() },
} satisfies Meta<typeof Line>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { };