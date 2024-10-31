import type { Meta, StoryObj } from '@storybook/react';

import ContentFooter from '../../../components/content/ContentFooter';

const meta = {
  title: 'components/content/ContentFooter',
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