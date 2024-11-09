import type { Meta, StoryObj } from '@storybook/react';
import UpcomingBirthdays from '../../../components/dashboard/UpcomingBirthdays';

const meta = {
  component: UpcomingBirthdays,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: false },
  }
} satisfies Meta<typeof UpcomingBirthdays>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { 
  args: {
    birthdays: [
      {
        firstName: "Kylan1",
        lastName: "Duncan1",
        birthday: new Date()
      },
      {
        firstName: "Kylan2",
        lastName: "Duncan2",
        birthday: new Date()
      },
      {
        firstName: "Kylan3",
        lastName: "Duncan3",
        birthday: new Date()
      },
      {
        firstName: "Kylan4",
        lastName: "Duncan4",
        birthday: new Date()
      },
      {
        firstName: "Kylan5",
        lastName: "Duncan5",
        birthday: new Date()
      },
    ],
    loading: false,
  }
};

export const Loading: Story = { 
  args: {
    loading: true,
  }
};