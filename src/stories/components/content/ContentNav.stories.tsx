import type { Meta, StoryObj } from '@storybook/react';

import ContentNav from '../../../components/content/ContentNav';

const meta = {
  title: 'components/content/ContentNav',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [(story) => <div
    style={{
      width: '1000px',
      padding: '16px',
    }}
  >
    {story()}
  </div>],
  args: {
    pageIdToTitleMap: [
      {
        key: "1",
        title: "Member Property Types"
      },
      {
        key: "2",
        title: "Settings"
      },
      {
        key: "3",
        title: "Point Types"
      },
    ],
    initialPageId: "1"
  },
  component: ContentNav,
} satisfies Meta<typeof ContentNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};