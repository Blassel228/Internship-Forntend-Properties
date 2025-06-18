const calculaterNights = (start_date, end_date) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export default calculaterNights;