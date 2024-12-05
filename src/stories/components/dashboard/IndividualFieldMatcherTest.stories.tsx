import type { Meta, StoryObj } from '@storybook/react';
import IndividualFieldMatcherTest from '../../../components/dashboard/IndividualFieldMatcherTest';

const meta = {
  component: IndividualFieldMatcherTest,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IndividualFieldMatcherTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};