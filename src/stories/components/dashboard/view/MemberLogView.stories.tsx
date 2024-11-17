import type { Meta, StoryObj } from '@storybook/react';
import MemberLogView from '../../../../components/dashboard/view/MemberLogView';
import { mockCreateMembers, mockDeleteMembers, mockGetAttendees, mockGetConsoleData, mockUpdateMembers } from '../../../../lib/api-client.mock';
import { ContextDialog } from '../../../../components/common/Dialog';
import { ApiClientProvider } from '../../../../lib/api-client';
import { DialogProvider } from '../../../../lib/toggle-dialog';

const meta = {
  component: MemberLogView,
  decorators: [(story) => (
    <ApiClientProvider>
      <DialogProvider>
        <div style={{width:'800px', minHeight:'100vh', height:'100vh'}}>
          {story()}
          <ContextDialog />
        </div>
      </DialogProvider>
    </ApiClientProvider>
  )],
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