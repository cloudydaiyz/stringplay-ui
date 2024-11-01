import type { Meta, StoryObj } from '@storybook/react';
import CategoricalStatistic from '../../../components/dashboard/CategoricalStatistic';

const meta = {
  component: CategoricalStatistic,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
    title: "Categorical Statistic"
  }
};