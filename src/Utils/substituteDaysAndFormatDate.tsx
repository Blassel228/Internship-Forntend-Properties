import dayjs from "dayjs";

const substituteDaysAndFormatDate = (date, days) => {
  const newDate = dayjs(date).subtract(days, "day");
  return newDate.format("YYYY-MM-DD");
}

export default substituteDaysAndFormatDate;