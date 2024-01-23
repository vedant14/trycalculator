import { useState } from "react";
import DatePicker from "react-datepicker";

export function Card() {
  const [startDate, setStartDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [age, setAge] = useState(null);
  const calculateAge = () => {
    // Calculate the age based on the difference between startDate and currentDate
    const startYear = startDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const ageValue = currentYear - startYear;

    // Check if the birthdate for this year has not occurred yet
    const currentMonth = currentDate.getMonth();
    const birthMonth = startDate.getMonth();
    const currentDay = currentDate.getDate();
    const birthDay = startDate.getDate();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      // Subtract 1 from the age if the birthdate for this year hasn't occurred yet
      setAge(ageValue - 1);
    } else {
      setAge(ageValue);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Age Calculator
        </h3>
        <p className="mt-4 max-w-2xl text-sm text-gray-500">
          The Age Calculator can determine the age or interval between two
          dates. The calculated age will be displayed in years, months, weeks,
          days, hours, minutes, and seconds.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <DatePicker
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      {"<"}
                    </button>
                    <select
                      value={getYear(date)}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      {">"}
                    </button>
                  </div>
                )}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Age at the Date of
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <DatePicker
                selected={currentDate}
                onChange={(date) => setCurrentDate(date)}
              />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div>
              <button
                type="button"
                onClick={calculateAge}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Calculate age
              </button>
            </div>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Your Age is</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {age !== null && <p>Age: {age} years</p>}
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:px-6">
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              The age of a person can be counted differently in different
              cultures. This calculator is based on the most common age system.
              In this system, age increases on a person's birthday. For example,
              the age of a person who has lived for 3 years and 11 months is 3,
              and their age will increase to 4 on their next birthday one month
              later. Most western countries use this age system. In some
              cultures, age is expressed by counting years with or without
              including the current year. For example, a person who is twenty
              years old is the same age as another person who is in their
              twenty-first year of life. In one of the traditional Chinese age
              systems, people are born at age 1 and their age increases up at
              the Traditional Chinese New Year rather than their birthday. For
              example, if one baby is born just one day before the Traditional
              Chinese New Year, 2 days later, the baby will be 2 even though
              he/she is only 2 days old. In some situations, the months and day
              result of this age calculator may be confusing, especially when
              the starting date is the end of a month. For example, we count
              Feb. 20 to Mar. 20 to be one month. However, there are two ways to
              calculate the age from Feb. 28, 2022 to Mar. 31, 2022. If we
              consider Feb. 28 to Mar. 28 to be one month, then the result is
              one month and 3 days. If we consider both Feb. 28 and Mar. 31 as
              the end of the month, then the result is one month. Both
              calculation results are reasonable. Similar situations exist for
              dates like Apr. 30 to May 31, May 30 to June 30, etc. The
              confusion comes from the uneven number of days in different
              months. In our calculations, we use the former method
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
