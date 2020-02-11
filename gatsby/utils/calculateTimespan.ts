/* tslint:disable:variable-name */
import monthNames from 'ayaka/constants/monthNames';
import getLastDayOfMonth from 'ayaka/getLastDateOfMonth';

const A_YEAR = 365;
const A_MONTH = 30.417;

enum Era {
  AD = 'AD',
  BC = 'BC'
}

const getParts = (d: string) => d.split(' ');

const getMonthNumber = (s: string) => monthNames.indexOf(s.slice(0, 3)) + 1;

const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

function getMonthLength(m: number, y: number) {
  if (m === 2 && isLeapYear(y)) {
    return 29;
  }

  return getLastDayOfMonth(new Date(2020, m, 0)).getDate();
}

export default function calculateTimespan(from: string, to: string) {
  const [f_d, f_m, f_y, f_x] = getParts(from);
  const [t_d, t_m, t_y] = getParts(to);

  // If from only has year (see Commodus)
  if (!f_m && !f_y) {
    const year_fix = Number(t_y) - Number(f_d);
    return year_fix * A_YEAR;
  }

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

  // in days
  return years * A_YEAR + months * A_MONTH + days;
}
