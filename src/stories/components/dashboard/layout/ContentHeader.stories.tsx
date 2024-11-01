import type { Meta, StoryObj } from '@storybook/react';

import ContentHeader from '../../../../components/dashboard/layout/ContentHeader';

const meta = {
  tags: ['autodocs'],
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
  </div>],
  args: {
    title: "Content at a glance"
  },
  component: ContentHeader,
} satisfies Meta<typeof ContentHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};