import { safeDate } from "@/utils/safeDate";

export type DateKey = string;

export const toDateString = (date: Date): DateKey => {
  const adjusted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const iso = adjusted.toISOString();
  return iso.split("T")[0] ?? "";
};

export const getToday = () => toDateString(new Date());

export const getYesterday = (date: Date = new Date()) => {
  const previous = new Date(date);
  previous.setDate(previous.getDate() - 1);
  return toDateString(previous);
};

export const formatDisplayDate = (date: string) => {
  const d = safeDate(date);

  if (Number.isNaN(d.getTime())) return date;

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
};
