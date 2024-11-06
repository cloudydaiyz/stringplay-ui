import type { Meta, StoryObj } from '@storybook/react';
import SettingsView from '../../../../components/dashboard/view/SettingsView';

const meta = {
  component: SettingsView,
  decorators: [(story) => <div style={{width:'800px', minHeight:'100vh', height:'100vh'}}>
    {story()}
  </div>],
  tags: ['autodocs'],
} satisfies Meta<typeof SettingsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};