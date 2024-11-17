import type { Meta, StoryObj } from '@storybook/react';
import TroupeView from '../../../../components/dashboard/view/TroupeView';
import { mockGetConsoleData, mockGetTroupe, mockUpdateTroupe } from '../../../../lib/api-client.mock';
import { ApiClientProvider } from '../../../../lib/api-client';
import { ContextDialog } from '../../../../components/common/Dialog';
import { DialogProvider } from '../../../../lib/toggle-dialog';

const meta = {
  component: TroupeView,
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
        mockGetTroupe(),
        mockUpdateTroupe(),
      ],
    }
  },
} satisfies Meta<typeof TroupeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};