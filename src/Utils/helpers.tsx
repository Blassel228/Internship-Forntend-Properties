import dayjs from "dayjs";

export const addDaysAndFormatDate = (date, days) => {
  const newDate = dayjs(date).add(days, "day");
  return newDate.format("YYYY-MM-DD");
};

export const formatDateToStandardDate = (date: Date) => {
  const newDate = dayjs(date);
  return newDate.format("YYYY-MM-DD");
};

export const formatStringDate = (dateString: string): string => {
  const d = new Date(dateString);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

const colorCache: Record<string, string> = {};

export const stringToColor = (str: string) => {
  if (colorCache[str]) {
    return colorCache[str];
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = `hsl(${hash % 360}, 60%, 60%)`;

  colorCache[str] = color;

  return color;
};

export const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const calculateNights = (start_date, end_date) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getRatingLabel = (rating: number): string => {
  if (rating >= 9.0) return "Superb";
  if (rating >= 8.0) return "Fabulous";
  if (rating >= 7.0) return "Good";
  if (rating >= 6.0) return "Pleasant";
  if (rating >= 5.0) return "Fair";
  return "Poor";
};