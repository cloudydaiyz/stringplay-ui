import { ResponsiveContainer, Pie, PieChart, Sector, Legend, Tooltip } from 'recharts';
import '../../app/shared.css';
import './CategoricalStatistic.css';
import { PieSectorDataItem, PieLabel } from 'recharts/types/polar/Pie';
import { useState } from 'react';

interface CategoricalStatisticProps {
  data: {
    name: string,
    value: number,
  }[];
  title: string,
}

const CategoricalStatistic = ({ data, title }: CategoricalStatisticProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const RADIAN = Math.PI / 180;

  const onPieEnter = (_: void, index: number) => {
    setActiveIndex(index);
  };
    
  const renderActiveShape = (props: PieSectorDataItem) => {
    const {
      cx = 0,
      cy = 0,
      midAngle = 0,
      innerRadius,
      outerRadius = 0,
      startAngle,
      endAngle,
      percent = 0,
      fill,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {data[activeIndex].name}
        </text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
        {/* 
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
            {`${activeIndex}: ${value}`}
          </text>
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
            {`(${(percent * 100).toFixed(2)}%)`}
          </text> 
        */}
      </g>
    );
  };

  const renderCustomizedLabel: PieLabel<PieSectorDataItem> = (props) => {
    const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent = 0, name } = props;
    // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const radius = data.findIndex(d => d.name == name) == activeIndex 
      ? outerRadius + 24 : outerRadius + 16;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className='categorical-statistic content-unit'>
      <h3>{title}</h3>
      <div className='pie-chart'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={300} height={300}>
            <Pie 
              data={data} 
              dataKey="value" 
              cx="50%" cy="50%" 
              innerRadius={40} 
              outerRadius={60} 
              // fill="#8884d8" 
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              label={renderCustomizedLabel}
              // label={true}
              labelLine={false}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CategoricalStatistic;