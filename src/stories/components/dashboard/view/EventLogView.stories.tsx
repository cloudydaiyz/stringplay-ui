import type { Meta, StoryObj } from '@storybook/react';
import EventLogView from '../../../../components/dashboard/view/EventLogView';

const meta = {
  component: EventLogView,
  decorators: [(story) => <div style={{width:'800px', minHeight:'100vh', height:'100vh'}}>
    {story()}
  </div>],
  tags: ['autodocs'],
} satisfies Meta<typeof EventLogView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};