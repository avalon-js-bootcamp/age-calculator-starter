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
  //birthDay,birthMonth, birthYear - users birth date, starts as string and changes to number, for errorChecks
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  //dayMsg, monthMsg, yearMsg - used to set error messages - passed as prop
  const [dayMsg, setDayMsg] = useState("");
  const [monthMsg, setMonthMsg] = useState("");
  const [yearMsg, setYearMsg] = useState("");
  //missing and warning are used to modify css in child components - passed as prop
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
    //daysOfTheMonth, used to find out how many days in that month, only leagal dates allowed, (e.g no feb 30th and only feb29th on leap years)
    const daysOfTheMonth = new Date(
      Number(birthYear),
      Number(birthMonth),
      0
    ).getDate();

    let hasErrors = false;

    //checks for birthDay, makes sure input is present + legal
    if (birthDay === "") {
      setDayMsg("This field is required");
      setDayMissing("missing");
      setDayWarning("warning");
      hasErrors = true;
    } else if (
      Number(birthDay) < 1 ||
      Number(birthDay) > Number(daysOfTheMonth)
    ) {
      setDayMsg("Must be a valid day");
      setDayMissing("missing");
      setDayWarning("warning");
      hasErrors = true;
    } else {
      setDayMsg("");
      setDayMissing("");
      setDayWarning("");
    }

    //checks for birthMonth, makes sure input is present + legal
    if (birthMonth === "") {
      setMonthMsg("This field is required");
      setMonthMissing("missing");
      setMonthWarning("warning");
      hasErrors = true;
    } else if (Number(birthMonth) < 1 || Number(birthMonth) > 12) {
      setMonthMsg("Must be a valid month");
      setMonthMissing("missing");
      setMonthWarning("warning");
      hasErrors = true;
    } else {
      setMonthMsg("");
      setMonthMissing("");
      setMonthWarning("");
    }

    //checks for birthYear, makes sure input is present + legal
    if (birthYear === "") {
      setYearMsg("This field is required");
      setYearMissing("missing");
      setYearWarning("warning");
      hasErrors = true;
    } else if (Number(birthYear) > Number(currentYear)) {
      setYearMsg("Must be in the past");
      setYearMissing("missing");
      setYearWarning("warning");
      hasErrors = true;
    } else {
      setYearMsg("");
      setYearMissing("");
      setYearWarning("");
    }

    //stops before calculations if even 1 input is missing/not valid
    if (hasErrors) {
      return;
    }

    //calculations for age of user - year, month, day
    let ageYear = Number(currentYear) - Number(birthYear);
    let ageMonth = Number(currentMonth) - Number(birthMonth);
    let ageDay = Number(currentDay) - Number(birthDay);

    //verify thats theres no negative days + add only correct amount of days
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

    //special bithday message
    if (ageDay === 0 && ageMonth === 0) {
      setTimeout(() => {
        alert(`Happy Birthday! You are ${ageYear} years old today.`);
      }, 500);
    }

    //passing the results back to parent component
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
          onChange={(value) => setBirthDay(value)}
          msg={dayMsg}
          missing={dayMissing}
          warning={dayWarning}
        ></DateCard>
        <DateCard
          type="MONTH"
          placeholder="MM"
          onChange={(value) => setBirthMonth(value)}
          msg={monthMsg}
          missing={monthMissing}
          warning={monthWarning}
        ></DateCard>
        <DateCard
          type="YEAR"
          placeholder="YYYY"
          onChange={(value) => setBirthYear(value)}
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
