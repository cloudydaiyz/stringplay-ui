import '../../app/shared.css';
import './CumulativeStatistic.css';

interface CumulativeStatisticProps {
  accumulator: "total" | "average";
  statistic: string;
  value: number;
}

const CumulativeStatistic = ({ accumulator, statistic, value }: CumulativeStatisticProps) => {
  return (
    <div className='cumulative-statistic content-unit'>
        <h3>{accumulator == "total" ? "Total" : "Average"}</h3>
        <h4>{statistic.trim().toLowerCase()}</h4>
        <div>
          <p>{value}</p>
        </div>
    </div>
  )
}

export default CumulativeStatistic;