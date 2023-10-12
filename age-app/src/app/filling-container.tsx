"use client";
import React from "react";
import { useState } from "react";
import "./filling-container.css";
import FillingBox from "./filling-box";
export default function FillingContainer() {
  //store input day, month, year
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
//store the calculation of days, month, year
  const [resultDay, setResultDay] = useState("--");
  const [resultMonth, setResultMonth] = useState("--");
  const [resultYear, setResultYear] = useState("--");
//store error msg for day, month, year
  const [errorDayMsg, setErrorDayMsg] = useState("");
  const [errorMonthMsg, setErrorMonthMsg] = useState("");
  const [errorYearMsg, setErrorYearMsg] = useState("");
   //this is for error red effect
  const [errorInvalid, setErrorInvalid] = useState("");
//get current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  console.log(currentYear, currentMonth, currentDay);

  function handleClick() {
    let errorMsg = false;
//day conditions for legal input
    if (day === "") {
      setErrorDayMsg("This field is required");
      setErrorInvalid("error");
      errorMsg = true;
    } else if (Number(day) < 1 || Number(day) >= 32) {
      setErrorDayMsg("Must be a valid day");
      setErrorInvalid("error");
      errorMsg = true;
    } else {
      setErrorDayMsg("");
    }
//month conditions for legal input
    if (month === "") {
      setErrorMonthMsg("This field is required");
      setErrorInvalid("error");
      errorMsg = true;
    } else if (Number(month) < 1 || Number(month) > 12) {
      setErrorMonthMsg("Must be a valid Month");
      setErrorInvalid("error");
      errorMsg = true;
    } else {
      setErrorMonthMsg("");
    }
//year conditions for legal input
    if (year === "") {
      setErrorYearMsg("This field is required");
      setErrorInvalid("error");
      errorMsg = true;
    } else if (year.length !== 4) {
      setErrorYearMsg("Year need to be 4 digit");
      setErrorInvalid("error");
      errorMsg = true;
    } else if (Number(year) > currentYear) {
      setErrorYearMsg("Must be in the past");
      setErrorInvalid("error");
      errorMsg = true;
    } else {
      setErrorYearMsg("");
    }
//if there is input error stop and return 
    if (errorMsg) {
      return;
    } else {
      setErrorInvalid("");
    }
//calculate  day, month , year
    let finalResultDay = currentDay - Number(day);
    let finalResultMonth = currentMonth - Number(month);
    let finalResultYear = currentYear - Number(year);
//condition for negative day , it take days from previous months
    if (finalResultDay < 0) { 
      if (//condition for months have 31 days and get days from previous month
        currentMonth === 5 ||
        currentMonth === 7 ||
        currentMonth === 8 ||
        currentMonth === 10 ||
        currentMonth === 12
      ) {
        finalResultMonth--;
        finalResultDay += 30; //add days of previous month
      } else if (//condition for months have 30 days and get days from previous month
        currentMonth === 1 ||
        currentMonth === 2 ||
        currentMonth === 4 ||
        currentMonth === 6 ||
        currentMonth === 9 ||
        currentMonth === 11
      ) {
        finalResultMonth--;
        finalResultDay += 31; //add days of previous month
      } else {
        finalResultMonth--;
        finalResultDay += 28; //add days of FEB
      }
    }
    //condition for negative month , it take month from previous year
    if (finalResultMonth < 0) {
      finalResultYear--;
      finalResultMonth += 12;
    }
    //update result
    setResultDay(finalResultDay);
    setResultMonth(finalResultMonth);
    setResultYear(finalResultYear);
  }

  return (
    <div className="outer-box">
      <div className="filling-field">
        <FillingBox
          onChange={(value) => setDay(value)}
          type="DAY"
          placeholder="DD"
          msg={errorDayMsg}
          error={errorInvalid}
        />
        <FillingBox
          onChange={(value) => setMonth(value)}
          type="MONTH"
          placeholder="MM"
          msg={errorMonthMsg}
          error={errorInvalid}
        />
        <FillingBox
          onChange={(value) => setYear(value)}
          type="YEAR "
          placeholder="YYYY"
          msg={errorYearMsg}
          error={errorInvalid}
        />
      </div>
      <button onClick={handleClick}>
        <img src="icon-arrow.svg" alt="" />
      </button>
      <div className="result-field">
        <span>
          <span className="result">{resultYear}</span> years
        </span>
        <span>
          <span className="result">{resultMonth}</span> months
        </span>
        <span>
          <span className="result">{resultDay}</span> days
        </span>
      </div>
    </div>
  );
}
