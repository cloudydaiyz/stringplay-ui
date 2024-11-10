import type { Meta, StoryObj } from '@storybook/react';

import Table, { TableProps } from '../../../components/dashboard/Table';
import { useState } from 'react';

const renderTable = (args: TableProps) => {
  const [data, setData] = useState(args.tableData.data);
  const [loading, setLoading] = useState(args.loading);

  if(args.tableHeader) {
    args.tableHeader = {
      ...args.tableHeader,
      onDataCreate: async (newRows) => {
        const newData = data.slice().concat(newRows);
        setLoading(true);
        setTimeout(() => { setData(newData); setLoading(false) }, 4000);
      },
      onDataDelete: async (rowsToDelete) => {
        const newData = data.slice();
        for(let i = newData.length - 1; i >= 0; i--) {
          if(rowsToDelete[i]) newData.splice(i, 1);
        }
        setLoading(true);
        setTimeout(() => { setData(newData); setLoading(false) }, 4000);
      },
      onDataUpdate: async (updates) => {
        const newData = data.slice();
        updates.forEach((row, r) => {
          row.forEach((update, c) => {
            if(update !== undefined) newData[r][c] = update;
          });
        });
        setLoading(true);
        setTimeout(() => { setData(newData); setLoading(false) }, 4000);
      }
    }
  }

  return (
    <Table {...args} tableData={{ ...args.tableData, data }} loading={loading} />
  );
}

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
  render: renderTable,
  args: {
    maxCols: 5,
    loading: false,
    useDataWhileLoading: true,
  },
  argTypes: {
    tableData: { control: false },
    tableHeader: { control: false },
    modeOverride: {
      type: {
        name: 'enum',
        required: false,
        value: ['create', 'edit', 'delete']
      },
    }
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tableHeader: {
      title: "Member Information",
    },
    tableData: {
      columns: [
        {
          title: "First Name",
          type: "string!",
          disableUpdate: true,
        },
        {
          title: "Last Name",
          type: "string?",
          disableUpdate: true,
        },
        {
          title: "# of children",
          type: "number?",
          disableUpdate: true,
          disableDelete: true,
        },
        {
          title: "Birthday",
          type: "date!",
        },
        {
          title: "isInteresting",
          type: "boolean!",
        },
      ],
      data: [
        ['John', 'Doe', 4, new Date('8/16/1964'), false],
        ['Jane', 'Doe', 4, new Date('4/12/1964'), true],
        ['Josh with a very long name', null, 0, new Date('4/12/2000'), false],
        ['Bean', 'Bag', null, new Date('4/22/2003'), true],
        ['Another', 'Dude', 4, null, false],
        ['Running', null, null, new Date('5/8/2004'), true],
        ['Of', 'Names', null, null, false],
        ['To', 'Use', 4, new Date('1/1/2000'), false],
      ],
      immutableRows: [true],
    }
  },
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
        ['Josh with a very long name', null, 0, new Date('4/12/2000'), false],
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
          type: "boolean?",
        },
      ],
      data: [
        ['John', 'Doe', 4, new Date('8/16/1964'), null]
      ],
    }
  },
  argTypes: {
    tableHeader: { control: false },
    tableData: { control: false },
    loading: { control: false },
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
    loading: { control: false },
  }
};

/** When the table data is loading */
export const Loading: Story = {
  args: {
    loading: true,
    tableData: {
      columns: [],
      data: [],
    },
    useDataWhileLoading: false,
  },
  argTypes: {
    tableHeader: { control: false },
    tableData: { control: false },
  }
};

export const Empty: Story = {
  name: 'Empty',
  args: {
    tableHeader: {
      title: "Member Information",
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
      data: [],
    }
  },
  argTypes: {
    tableHeader: { control: false },
    tableData: { control: false },
    loading: { control: false },
  }
};