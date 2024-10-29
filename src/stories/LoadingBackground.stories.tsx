import type { Meta, StoryObj } from '@storybook/react';

import LoadingBackground from '../components/LoadingBackground';

const meta = {
  title: 'Components/LoadingBackground',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [(story) => <div className='loading-bg-sample-container'>{story()}</div>],
  component: LoadingBackground,
} satisfies Meta<typeof LoadingBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};