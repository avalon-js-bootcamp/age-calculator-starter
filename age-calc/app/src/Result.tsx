import "./Result.css";

interface ResultProps {
  years: number | string;
  months: number | string;
  days: number | string;
}
export default function Result(props: ResultProps) {
  return (
    <div className="result">
      <div className="years">
        <div className="number">{props.years}</div> years
      </div>
      <div className="months">
        <div className="number">{props.months}</div> months
      </div>
      <div className="days">
        <div className="number">{props.days}</div> days
      </div>
    </div>
  );
}
