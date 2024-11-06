import type { Meta, StoryObj } from '@storybook/react';
import TroupeView from '../../../../components/dashboard/view/TroupeView';

const meta = {
  component: TroupeView,
  decorators: [(story) => <div style={{width:'800px', minHeight:'100vh', height:'100vh'}}>
    {story()}
  </div>],
  tags: ['autodocs'],
} satisfies Meta<typeof TroupeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};