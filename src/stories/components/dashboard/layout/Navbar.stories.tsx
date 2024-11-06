import type { Meta, StoryObj } from '@storybook/react';

import Navbar from '../../../../components/dashboard/layout/Navbar';

const meta = {
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  component: Navbar,
  args: {
    onNavigate: (_, page, setPage) => {
      setPage(page);
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