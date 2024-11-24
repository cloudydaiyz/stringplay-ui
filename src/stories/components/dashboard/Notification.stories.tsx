import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Notification from '../../../components/dashboard/Notification';

const meta = {
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { 
  args: {
    notificationType: 'info',
    text: 'This is an example notification.',
    onClick: () => fn(),
  }
};