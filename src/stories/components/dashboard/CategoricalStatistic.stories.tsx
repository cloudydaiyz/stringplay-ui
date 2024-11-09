import type { Meta, StoryObj } from '@storybook/react';
import CategoricalStatistic from '../../../components/dashboard/CategoricalStatistic';

const meta = {
  component: CategoricalStatistic,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: false },
  }
} satisfies Meta<typeof CategoricalStatistic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: [
      {
        name: "hi1",
        value: 90,
      },
      {
        name: "hi2",
        value: 92,
      },
    ],
    title: "Categorical Statistic",
    loading: false,
  }
};

export const Loading: Story = {
  args: {
    data: [
      {
        name: "hi1",
        value: 90,
      },
      {
        name: "hi2",
        value: 92,
      },
    ],
    title: "Categorical Statistic",
    loading: true,
  }
};

export const Empty: Story = {
  args: {
    data: [],
    title: "Categorical Statistic",
    loading: false,
  }
};