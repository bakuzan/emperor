/* tslint:disable:variable-name */
import monthNames from 'ayaka/constants/monthNames';
import getLastDayOfMonth from 'ayaka/getLastDateOfMonth';

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

export default function calculateReignLength(from: string, to: string) {
  const [f_d, f_m, f_y, f_x = 'AD'] = getParts(from);
  const [t_d, t_m, t_y] = getParts(to);

  const fd = Number(f_d);
  const td = Number(t_d);
  const fm = getMonthNumber(f_m);
  const tm = getMonthNumber(t_m);

  let years = Number(t_y) - Number(f_y);
  let months = 0;
  let days = 0;

  if (f_x === Era.BC) {
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
  return years * 365 + months * 30.417 + days;
}
