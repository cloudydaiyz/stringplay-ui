import type { Meta, StoryObj } from '@storybook/react';
import MemberLogView from '../../../../components/dashboard/view/MemberLogView';

const meta = {
  component: MemberLogView,
  decorators: [(story) => <div style={{width:'800px', minHeight:'100vh', height:'100vh'}}>
    {story()}
  </div>],
  tags: ['autodocs'],
} satisfies Meta<typeof MemberLogView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};