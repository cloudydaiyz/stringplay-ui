import type { Meta, StoryObj } from '@storybook/react';
import Dialog from '../../../components/common/Dialog';
import { useState } from 'react';

const meta = {
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    const [active, setActive] = useState(true);
    props.actions = [
      {
        label: 'CANCEL',
        color: 'gray',
        onClick: async () => { console.log('canceling'); setActive(false) },
      },
      {
        label: 'CONFIRM',
        color: 'var(--success)',
        onClick: async () => { console.log('confirming'); setActive(false) },
      },
    ]

    return (
      <div 
        style={{
          width:'1000px',
          height: '500px',
        }}
      >
        <Dialog 
          {...props} 
          active={active}
        />
      </div>
    )
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { 
  args: {
    title: 'Create Event',
    content: (
      <p>
        This is an example dialog. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus numquam error, sapiente, ut consequuntur vel reprehenderit facere quibusdam blanditiis at ipsum alias magni quam, minus officia illo quidem nobis. Fugit?
      </p>
    ),
    active: true,
    actions: [],
  }
};