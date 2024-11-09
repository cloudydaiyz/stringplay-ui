import '../../app/shared.css';
import './CumulativeStatistic.css';

interface CumulativeStatisticProps {
  accumulator: "total" | "average";
  statistic: string;
  value: number;
  loading: boolean;
}

const CumulativeStatistic = ({ accumulator, statistic, value = 0, loading }: CumulativeStatisticProps) => {
  return (
    <div className={`cumulative-statistic content-unit ${loading && 'loading'}`}>
        {
          loading
          ? <>
            <h3><span>{accumulator == "total" ? "Total" : "Average"}</span></h3>
            <h4><span>{statistic.trim().toLowerCase()}</span></h4>
            <div>
              <p><span>{12345}</span></p>
            </div>
          </>
          : <>
            <h3>{accumulator == "total" ? "Total" : "Average"}</h3>
            <h4>{statistic.trim().toLowerCase()}</h4>
            <div>
              <p>{value}</p>
            </div>
          </>
        }
    </div>
  )
}

export default CumulativeStatistic;