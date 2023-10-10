import DateCard from "./DateCard";
import "./DateChecker.css";
import { useState } from "react";

interface DateCheckerProps {
  year: number | null;
  month: number | null;
  day: number | null;
  setResultYear: (value: number | string) => void;
  setResultMonth: (value: number | string) => void;
  setResultDay: (value: number | string) => void;
}

export default function DateChecker(props: DateCheckerProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dayMsg, setDayMsg] = useState("");
  const [monthMsg, setMonthMsg] = useState("");
  const [yearMsg, setYearMsg] = useState("");
  const [dayMissing, setDayMissing] = useState("");
  const [dayWarning, setDayWarning] = useState("");
  const [monthMissing, setMonthMissing] = useState("");
  const [monthWarning, setMonthWarning] = useState("");
  const [yearMissing, setYearMissing] = useState("");
  const [yearWarning, setYearWarning] = useState("");

  const handleButtonClick = () => {
    const currentYear = props.year;
    const currentMonth = props.month;
    const currentDay = props.day;
    const daysOfTheMonth = new Date(Number(year), Number(month), 0).getDate();

    if (day === "") {
      setDayMsg("This field is required");
      setDayMissing("missing");
      setDayWarning("warning");
    } else if (Number(day) < 1 || Number(day) > Number(daysOfTheMonth)) {
      setDayMsg("Must be a valid day");
      setDayMissing("missing");
      setDayWarning("warning");
    } else {
      setDayMsg("");
      setDayMissing("");
      setDayWarning("");
    }

    if (month === "") {
      setMonthMsg("This field is required");
      setMonthMissing("missing");
      setMonthWarning("warning");
    } else if (Number(month) < 1 || Number(month) > 12) {
      setMonthMsg("Must be a valid month");
      setMonthMissing("missing");
      setMonthWarning("warning");
    } else {
      setMonthMsg("");
      setMonthMissing("");
      setMonthWarning("");
    }

    if (year === "") {
      setYearMsg("This field is required");
      setYearMissing("missing");
      setYearWarning("warning");
    } else if (Number(year) > Number(currentYear)) {
      setYearMsg("Must be in the past");
      setYearMissing("missing");
      setYearWarning("warning");
    } else {
      setYearMsg("");
      setYearMissing("");
      setYearWarning("");
    }

    if (dayMsg === "" && monthMsg === "" && yearMsg === "") {
      return;
    }

    let ageYear = Number(currentYear) - Number(year);
    let ageMonth = Number(currentMonth) - Number(month);
    let ageDay = Number(currentDay) - Number(day);

    if (ageDay < 0) {
      ageMonth--;
      ageDay += new Date(
        Number(currentYear),
        Number(currentMonth),
        0
      ).getDate();
      //this is for the special case where someone is born on 30th or 31st and the current date is march 1st/2nd so it will take 2 months worth of days instead of 1
    }
    if (ageDay < 0) {
      ageMonth--;
      ageDay += new Date(
        Number(currentYear),
        Number(currentMonth) - 1,
        0
      ).getDate();
    }
    if (ageMonth < 0) {
      ageYear--;
      ageMonth += 12;
    }

    if (ageDay === 0 && ageMonth === 0) {
      alert(`Happy Birthday you are ${ageYear} years old today`);
      return;
    }

    props.setResultYear(ageYear);
    props.setResultMonth(ageMonth);
    props.setResultDay(ageDay);
  };

  return (
    <div className="date-checker">
      <div className="date-inputs">
        <DateCard
          type="DAY"
          placeholder="DD"
          onChange={(value) => setDay(value)}
          msg={dayMsg}
          missing={dayMissing}
          warning={dayWarning}
        ></DateCard>
        <DateCard
          type="MONTH"
          placeholder="MM"
          onChange={(value) => setMonth(value)}
          msg={monthMsg}
          missing={monthMissing}
          warning={monthWarning}
        ></DateCard>
        <DateCard
          type="YEAR"
          placeholder="YYYY"
          onChange={(value) => setYear(value)}
          msg={yearMsg}
          missing={yearMissing}
          warning={yearWarning}
        ></DateCard>
      </div>
      <div className="submit-spot">
        <div className="line"></div>
        <button className="submit-btn" onClick={handleButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="44"
            viewBox="0 0 46 44"
          >
            <g fill="none" stroke="#FFF" stroke-width="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
