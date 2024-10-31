import type { Meta, StoryObj } from '@storybook/react';

import AuthPage from '../../pages/AuthPage';

const meta = {
  title: 'pages/AuthPage',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [(story) => 
    <div 
      className='auth-page-sample-container'
      style={{
        width: '1000px',
        height: '1000px',
        position: 'relative',
        zIndex: '100',
      }}
    >
      {story()}
    </div>
  ],
  component: AuthPage,
} satisfies Meta<typeof AuthPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};