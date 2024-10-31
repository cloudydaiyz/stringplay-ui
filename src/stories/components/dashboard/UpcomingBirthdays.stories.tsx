import type { Meta, StoryObj } from '@storybook/react';
import UpcomingBirthdays from '../../../components/dashboard/UpcomingBirthdays';

const meta = {
  title: 'components/dashboard/UpcomingBirthdays',
  component: UpcomingBirthdays,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UpcomingBirthdays>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { 
  args: {
    birthdays: [
      {
        firstName: "Kylan",
        lastName: "Duncan",
        birthday: new Date()
      }
    ]
  }
};