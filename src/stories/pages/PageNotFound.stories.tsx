import type { Meta, StoryObj } from '@storybook/react';

import { PageNotFound } from '../../pages/PageNotFound';

const meta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (story) => (
      <div style={{width:'1200px', height:'100vh'}}>
        {story()}
      </div>
    ),
  ],
  component: PageNotFound,
} satisfies Meta<typeof PageNotFound>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};