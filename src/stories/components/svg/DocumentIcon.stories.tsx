import type { Meta, StoryObj } from '@storybook/react';

import DocumentIcon from '../../../components/svg/DocumentIcon';

const meta = {
  tags: ['autodocs'],
  component: DocumentIcon,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DocumentIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};