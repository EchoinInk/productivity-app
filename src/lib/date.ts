export const toDateString = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

// ✅ use THIS everywhere instead of raw toISOString
export const getToday = () => toDateString(new Date());

export const formatDisplayDate = (date: string) => {
  const d = new Date(date);

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
};
