import dayjs from "dayjs";

export const substituteDaysAndFormatDate = (date, days) => {
  const newDate = dayjs(date).subtract(days, "day");
  return newDate.format("YYYY-MM-DD");
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

export const formatDate = (dateString: string): string => {
  const d = new Date(dateString);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

export const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const calculateNights = (start_date, end_date) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
