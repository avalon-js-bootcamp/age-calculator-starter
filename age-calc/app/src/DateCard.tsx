import "./DateCard.css";

interface DateCardProps {
  type: string;
  missing?: string;
  warning?: string;
  placeholder: string;
  msg?: string;
  onChange: (value: string) => void;
}

export default function DateCard(props: DateCardProps) {
  return (
    <div
      className="date-card"
      onChange={(event) => props.onChange(event.target.value)}
    >
      <div className={`date ${props.missing}`}>{props.type}</div>
      <input
        className={`input-box ${props.warning}`}
        type="number"
        placeholder={props.placeholder}
      ></input>
      <div className="warning-msg">{props.msg}</div>
    </div>
  );
}
