import '../../app/shared.css';
import './CategoricalStatistic.css';

import { ResponsiveContainer, Pie, PieChart, Sector, Tooltip, Cell } from 'recharts';
import { PieSectorDataItem, PieLabel } from 'recharts/types/polar/Pie';
import { useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function generateRandomColor(): string {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

interface CategoricalStatisticProps {
  data: {
    name: string,
    value: number,
  }[];
  title: string,
}

const CategoricalStatistic = ({ data, title }: CategoricalStatisticProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const RADIAN = Math.PI / 180;

  if(COLORS.length < data.length) {
    COLORS.push(generateRandomColor());
  }

  const onPieEnter = (_: void, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };
    
  const renderActiveShape = (props: PieSectorDataItem) => {
    const {
      cx = 0,
      cy = 0,
      innerRadius,
      outerRadius = 0,
      startAngle,
      endAngle,
      fill,
    } = props;

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {data[activeIndex].name}
        </text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      </g>
    );
  };

  const renderCustomizedLabel: PieLabel<PieSectorDataItem> = (props) => {
    const { cx = 0, cy = 0, midAngle = 0, outerRadius = 0, percent = 0, name } = props;
    const radius = data.findIndex(d => d.name == name) == activeIndex 
      ? outerRadius + 24 : outerRadius + 16;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{fontSize:'.8rem'}}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className='categorical-statistic content-unit'>
      <h3>{title}</h3>
      <div className='pie-chart'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={256} height={256}>
            <Pie 
              data={data} 
              dataKey="value" 
              cx="50%" cy="45%" 
              innerRadius={55} 
              outerRadius={75} 
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {
                data.map((_, index) => (<Cell fill={COLORS[index]} />))
              }
            </Pie>
            <Tooltip />
            {/* <Legend verticalAlign="top" height={36} style={{fontSize:'.8rem'}}/> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CategoricalStatistic;