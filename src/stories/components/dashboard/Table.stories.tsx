import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Table from '../../../components/dashboard/Table';

const meta = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (story) => <div
      style={{
        marginLeft: '64px',
        marginRight: '16px',
      }}
    >
      {story()}
    </div>
  ],
  tags: ['autodocs'],
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tableHeader: {
      title: "Member Information",
      onDataCreate: fn(),
      onDataDelete: fn(),
      onDataUpdate: fn(),
    },
    tableData: {
      columns: [
        {
          title: "First Name",
          type: "string!",
        },
        {
          title: "Last Name",
          type: "string?",
        },
        {
          title: "# of children",
          type: "number?",
        },
        {
          title: "Birthday",
          type: "date?",
        },
        {
          title: "isInteresting",
          type: "boolean!",
        },
      ],
      data: [
        ['John', 'Doe', 4, new Date('8/16/1964'), false],
        ['Jane', 'Doe', 4, new Date('4/12/1964'), true],
        ['Josh', null, 0, new Date('4/12/2000'), false],
        ['Bean', 'Bag', null, new Date('4/22/2003'), true],
        ['Another', 'Dude', 4, null, false],
        ['Running', null, null, new Date('5/8/2004'), true],
        ['Of', 'Names', null, null, false],
        ['To', 'Use', 4, new Date('1/1/2000'), false],
        ['To', 'Use', 4, new Date('1/1/2000'), false],
      ],
    }
  },
  argTypes: {
    // tableHeader: { control: false },
    // tableData: { control: false },
  }
};

export const DefaultNoHeader: Story = {
  name: "Default (No Header)",
  args: {
    tableData: {
      columns: [
        {
          title: "First Name",
          type: "string!",
        },
        {
          title: "Last Name",
          type: "string?",
        },
        {
          title: "# of children",
          type: "number?",
        },
        {
          title: "Birthday",
          type: "date?",
        },
        {
          title: "isInteresting",
          type: "boolean!",
        },
      ],
      data: [
        ['John', 'Doe', 4, new Date('8/16/1964'), false],
        ['Jane', 'Doe', 4, new Date('4/12/1964'), true],
        ['Josh', null, 0, new Date('4/12/2000'), false],
        ['Bean', 'Bag', null, new Date('4/22/2003'), true],
        ['Another', 'Dude', 4, null, false],
        ['Running', null, null, new Date('5/8/2004'), true],
        ['Of', 'Names', null, null, false],
        ['To', 'Use', 4, new Date('1/1/2000'), false],
      ],
    }
  },
  argTypes: {
    tableHeader: { control: false },
    tableData: { control: false },
  }
};

export const OneRow: Story = {
  args: {
    tableHeader: {
      title: "Member Information",
      onDataCreate: fn(),
      onDataDelete: fn(),
      onDataUpdate: fn(),
    },
    tableData: {
      columns: [
        {
          title: "First Name",
          type: "string!",
        },
        {
          title: "Last Name",
          type: "string?",
        },
        {
          title: "# of children",
          type: "number?",
        },
        {
          title: "Birthday",
          type: "date?",
        },
        {
          title: "isInteresting",
          type: "boolean!",
        },
      ],
      data: [
        ['John', 'Doe', 4, new Date('8/16/1964'), false]
      ],
    }
  },
  argTypes: {
    tableHeader: { control: false },
    tableData: { control: false },
  }
};

export const OneRowNoHeader: Story = {
  name: 'One Row (No Header)',
  args: {
    tableData: {
      columns: [
        {
          title: "First Name",
          type: "string!",
        },
        {
          title: "Last Name",
          type: "string?",
        },
        {
          title: "# of children",
          type: "number?",
        },
        {
          title: "Birthday",
          type: "date?",
        },
        {
          title: "isInteresting",
          type: "boolean!",
        },
      ],
      data: [
        ['John', 'Doe', 4, new Date('8/16/1964'), false]
      ],
    }
  },
  argTypes: {
    tableHeader: { control: false },
    tableData: { control: false },
  }
};

/** When the table data is loading */
export const Loading: Story = {
  args: {
    loading: true,
    tableData: {
      columns: [],
      data: [],
    }
  },
  argTypes: {
    tableHeader: { control: false },
    tableData: { control: false },
  }
};

// One row
// Multiple rows
// Loading