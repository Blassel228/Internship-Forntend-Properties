import dayjs from "dayjs";

const addDaysAndFormatDate = (date, days) => {
  const newDate = dayjs(date).add(days, "day");
  return newDate.format("YYYY-MM-DD");
}

export default addDaysAndFormatDate;