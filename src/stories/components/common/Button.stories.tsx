import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../../components/common/Button';
// import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'components/common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Hello world"
  }
};

export const Secondary: Story = {
  args: {
    text: "Hello world",
    buttonType: 2,
  }
};