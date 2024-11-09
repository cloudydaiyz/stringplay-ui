import type { Meta, StoryObj } from '@storybook/react';
import DashboardView from '../../../../components/dashboard/view/DashboardView';
import { mockGetConsoleData } from '../../../../lib/api-client.mock';
import { ApiClientProvider } from '../../../../lib/api-client';

const meta = {
  component: DashboardView,
  decorators: [(story) => <div style={{width:'800px', minHeight:'100vh'}}>
    <ApiClientProvider>{story()}</ApiClientProvider>
  </div>],
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        mockGetConsoleData,
      ],
    }
  },
} satisfies Meta<typeof DashboardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};