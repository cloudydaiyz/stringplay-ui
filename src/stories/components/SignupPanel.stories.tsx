import type { Meta, StoryObj } from '@storybook/react';

import SignupPanel from '../../components/SignupPanel';

const meta = {
  title: 'Components/SignupPanel',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: SignupPanel,
} satisfies Meta<typeof SignupPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};