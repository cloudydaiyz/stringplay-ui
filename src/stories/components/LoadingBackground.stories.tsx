import type { Meta, StoryObj } from '@storybook/react';

import LoadingBackground from '../../components/LoadingBackground';

const meta = {
  title: 'components/LoadingBackground',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [(story) => 
    <div 
      className='loading-bg-sample-container'
      style={{
        width: '400px',
        height: '400px',
      }}
    >
      {story()}
    </div>
  ],
  args: {
    // doneLoading: true,
    // className: 'hi',
  },
  argTypes: {
    doneLoading: { 
      type: { name: 'boolean' },
      description: 'True if loading is complete'
    },
    className: { 
      type: { name: 'string' },
      description: 'Additional classes to add to the background element (the parent of the 2 sliders)'
    },
  },
  component: LoadingBackground,
} satisfies Meta<typeof LoadingBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};