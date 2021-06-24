import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

type year = string | Date | dayjs.Dayjs;

export function validBirthDate(
  birchDay: year,
  year: { min?: string | number; max?: string | number } = {}
) {
  year.min = Number.parseInt(year?.min?.toString() || '0');
  year.max = Number.parseInt(year?.max?.toString() || '200');

  return dayjs(birchDay).isBetween(
    dayjs().subtract(year.min, 'years'),
    dayjs().subtract(year.max, 'years')
  );
}
