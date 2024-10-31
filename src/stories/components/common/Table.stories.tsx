import type { Meta, StoryObj } from '@storybook/react';

import Table from '../../../components/common/Table';

const meta = {
  title: 'components/common/Table',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};