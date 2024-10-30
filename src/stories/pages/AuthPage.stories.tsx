import type { Meta, StoryObj } from '@storybook/react';

import AuthPage from '../../pages/AuthPage';
import './AuthPage.stories.css';

const meta = {
  title: 'Pages/AuthPage',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [(story) => <div className='auth-page-sample-container'>{story()}</div>],
  component: AuthPage,
} satisfies Meta<typeof AuthPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};