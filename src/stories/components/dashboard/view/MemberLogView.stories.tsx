import type { Meta, StoryObj } from '@storybook/react';
import MemberLogView from '../../../../components/dashboard/view/MemberLogView';
import { mockCreateMembers, mockDeleteMembers, mockGetAttendees, mockGetConsoleData, mockUpdateMembers } from '../../../../lib/api-client.mock';

const meta = {
  component: MemberLogView,
  decorators: [(story) => <div style={{width:'800px', minHeight:'100vh', height:'100vh'}}>
    {story()}
  </div>],
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        mockGetConsoleData(),
        mockCreateMembers(),
        mockGetAttendees(),
        mockUpdateMembers(),
        mockDeleteMembers(),
      ],
    }
  },
} satisfies Meta<typeof MemberLogView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};