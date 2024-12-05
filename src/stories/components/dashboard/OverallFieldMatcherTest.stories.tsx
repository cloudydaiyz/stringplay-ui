import type { Meta, StoryObj } from '@storybook/react';
import OverallFieldMatcherTest from '../../../components/dashboard/OverallFieldMatcherTest';

const meta = {
  component: OverallFieldMatcherTest,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OverallFieldMatcherTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};