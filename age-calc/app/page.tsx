"use client";
import DateChecker from "./src/DateChecker";
import Result from "./src/Result";
import { useState, useEffect } from "react";

export default function Home() {
  //year, month, day - refers to current date - passed as prop
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  //resultYear, resultMonth, resultDay - refers to calculations done in child component - passed as prop, starts as string before changes
  const [resultYear, setResultYear] = useState<number | string>("--");
  const [resultMonth, setResultMonth] = useState<number | string>("--");
  const [resultDay, setResultDay] = useState<number | string>("--");

  useEffect(() => {
    //This is used to get current date + split the numbers into years, months and days.
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    setYear(currentYear);
    setMonth(currentMonth);
    setDay(currentDay);
  }, []);

  return (
    <main className="main">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="content">
        <DateChecker
          year={year}
          month={month}
          day={day}
          setResultYear={setResultYear}
          setResultMonth={setResultMonth}
          setResultDay={setResultDay}
        ></DateChecker>
        <Result
          years={resultYear}
          months={resultMonth}
          days={resultDay}
        ></Result>
      </div>
    </main>
  );
}
