import type { Meta, StoryObj } from '@storybook/react';

import ContentHeader from '../../../components/content/ContentHeader';

const meta = {
  title: 'components/content/ContentHeader',
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