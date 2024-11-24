import type { Meta, StoryObj } from '@storybook/react';

import ContentHeader from '../../../../components/dashboard/layout/ContentHeader';
import { ApiClientProvider } from '../../../../lib/api-client';
import { mockGetConsoleData } from '../../../../lib/api-client.mock';

const meta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        mockGetConsoleData(),
      ]
    }
  },
  decorators: [(story) => (
    <ApiClientProvider>
      <div
        style={{
          width: '1000px',
          padding: '16px',
        }}
      >
        {story()}
      </div>
    </ApiClientProvider>
  )],
  args: {
    title: "Content at a glance"
  },
  component: ContentHeader,
} satisfies Meta<typeof ContentHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};