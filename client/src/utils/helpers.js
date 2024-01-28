import { format, formatDistance, isThisWeek, isThisYear } from "date-fns";

export const formateDate = (date) => {
  const isThisWeekResult = isThisWeek(date);
  const isThisYearResult = isThisYear(date);

  if (isThisWeekResult) {
    return formatDistance(date, new Date(), {
      addSuffix: true,
    }).replace("about", "");
  }

  if (isThisYearResult) {
    return format(date, "LLL d");
  }

  return format(date, "LLL d, yyyy ");
};
