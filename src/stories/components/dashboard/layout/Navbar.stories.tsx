import type { Meta, StoryObj } from '@storybook/react';

import Navbar, { NavPage } from '../../../../components/dashboard/layout/Navbar';

const meta = {
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  component: Navbar,
  args: {
    onNavigate: (event, setPage) => {
      setPage(event.currentTarget.dataset.page as NavPage);
    }
  }
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { 
  args: { 
    initialPage: "dashboard"
  }
};