import type { Meta, StoryObj } from '@storybook/react';

import NoServicesPage from '../../pages/NoServicesPage';

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
  component: NoServicesPage,
} satisfies Meta<typeof NoServicesPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};