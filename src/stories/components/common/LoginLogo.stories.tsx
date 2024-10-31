import type { Meta, StoryObj } from '@storybook/react';

import LoginLogo from '../../../components/common/LoginLogo';

const meta = {
  title: 'components/common/LoginLogo',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: LoginLogo,
} satisfies Meta<typeof LoginLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};