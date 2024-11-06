import type { Meta, StoryObj } from '@storybook/react';
import DashboardView from '../../../../components/dashboard/view/DashboardView';

const meta = {
  component: DashboardView,
  decorators: [(story) => <div style={{width:'800px', minHeight:'100vh'}}>
    {story()}
  </div>],
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};