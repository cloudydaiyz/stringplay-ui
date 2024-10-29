import type { Meta, StoryObj } from '@storybook/react';

import PageNotFoundPanel from '../components/PageNotFoundPanel';

const meta = {
  title: "Components/PageNotFoundPanel",
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: PageNotFoundPanel,
} satisfies Meta<typeof PageNotFoundPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};