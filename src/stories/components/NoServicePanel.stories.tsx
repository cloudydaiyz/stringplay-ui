import type { Meta, StoryObj } from '@storybook/react';

import NoServicePanel from '../../components/NoServicePanel';

const meta = {
  title: "Components/NoServicePanel",
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: NoServicePanel,
} satisfies Meta<typeof NoServicePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};