export function ageCalculator({ startDate, currentDate }) {
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
    return ageValue - 1;
  } else {
    return ageValue;
  }
}
