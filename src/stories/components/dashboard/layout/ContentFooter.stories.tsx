import type { Meta, StoryObj } from '@storybook/react';

import ContentFooter from '../../../../components/dashboard/layout/ContentFooter';

const meta = {
  parameters: {
    layout: 'centered',
  },
  decorators: [(story) => <div
    style={{
      width: '1000px',
      padding: '16px',
    }}
    >
      {story()}
    </div>
  ],
  tags: ['autodocs'],
  component: ContentFooter,
} satisfies Meta<typeof ContentFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};