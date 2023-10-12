import "./filling-box.css";
export default function FillingBox(props) {
  return (
    <div className="date-field">
      <h1 className={`h1${props.error}`}>{props.type}</h1>
      <div
        className="box"
        onChange={(event) => props.onChange(event.target.value)}
      >
        <input
          className={`fill ${props.error}`}
          type="tell"
          min="0"
          placeholder={props.placeholder}
          required
        />
      </div>
      <div className="error-msg">{props.msg}</div>
    </div>
  );
}
