import type { Meta, StoryObj } from '@storybook/react';

import Header from '../../../../components/dashboard/layout/Header';

const meta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [(story) => 
    <div 
      style={{
        width: '1000px',
      }}
    >
      {story()}
    </div>
  ],
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: "sampleuser"
  }
};