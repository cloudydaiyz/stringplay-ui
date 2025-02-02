import type { Meta, StoryObj } from '@storybook/react';
import CumulativeStatistic from '../../../components/dashboard/CumulativeStatistic';

const meta = {
  component: CumulativeStatistic,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: false }
  }
} satisfies Meta<typeof CumulativeStatistic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { 
  args: {
    accumulator: "total",
    statistic: "days since coding",
    value: 0,
    loading: false,
  },
};

export const Loading: Story = { 
  args: {
    accumulator: "total",
    statistic: "days since coding",
    value: 0,
    loading: true,
  },
};