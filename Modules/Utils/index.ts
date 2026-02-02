import { differenceInMonths, addMonths, isAfter } from "date-fns";

export function diffInMonthsCeil({
  end,
  start,
}: {
  start: Date;
  end: Date;
}): number {
  if (end <= start) return 0;

  const fullMonths = differenceInMonths(end, start);
  const remainderDate = addMonths(start, fullMonths);

  const After = isAfter(end, remainderDate) ? fullMonths + 1 : fullMonths;
  console.log({ After, start, end });
  return After;
}
