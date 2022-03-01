/* tslint:disable:variable-name */
import monthNames from 'ayaka/constants/monthNames';
import getLastDayOfMonth from 'ayaka/getLastDateOfMonth';

const A_YEAR = 365;
const A_MONTH = 30.417;

enum Era {
  AD = 'AD',
  BC = 'BC'
}

function getDataParts(d: string) {
  const parts = d.split(' ');
  if (parts.length === 4) {
    return parts;
  }

  const padding = Array(4).fill(null);
  return [...padding, ...parts, 'AD'].slice(-4);
}

const getMonthNumber = (s: string) =>
  s ? monthNames.indexOf(s.slice(0, 3)) + 1 : null;

const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

function getMonthLength(m: number, y: number) {
  if (m === 2 && isLeapYear(y)) {
    return 29;
  }

  return getLastDayOfMonth(new Date(2020, m, 0)).getDate();
}

export default function calculateTimespan(from: string, to: string) {
  const [f_d, f_m, f_y, f_x] = getDataParts(from);
  const [t_d, t_m, t_y] = getDataParts(to);

  /* Regular date processing */
  const fd = Number(f_d);
  const td = Number(t_d);
  const fm = getMonthNumber(f_m);
  const tm = getMonthNumber(t_m);

  let years = Number(t_y) - Number(f_y);
  let months = 0;
  let days = 0;

  const fx = f_x ?? 'AD';
  if (fx === Era.BC) {
    years = Number(f_y) + Number(t_y) - 1;
  }

  if (fm && tm) {
    if (fm > tm) {
      years -= 1;
      months = 12 - (fm - tm);
    } else if (fm < tm) {
      months = tm - fm;
    }

    if (fd > td) {
      const monthMax = getMonthLength(fm, Number(f_y));
      months -= 1;
      days = monthMax - fd + td;
    } else if (fd < td) {
      days = td - fd;
    }
  }

  // in days
  return Math.floor(years * A_YEAR + months * A_MONTH + days);
}
