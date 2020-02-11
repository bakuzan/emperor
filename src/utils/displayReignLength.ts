const ONE_YEAR = 365;
const ONE_MONTH = 30.417;

export function displayReignLength(reignInDays: number) {
  let reign = '';

  const totalDays = Math.round(reignInDays);

  const dy = totalDays / ONE_YEAR;
  const years = Math.floor(dy);

  const dm = totalDays / ONE_MONTH;
  const months = Math.floor(dm - years * 12);

  const days =
    months >= 0
      ? Math.round(totalDays - years * ONE_YEAR - months * ONE_MONTH)
      : 0;

  if (years > 0) {
    reign += `${years} years`;
  }

  if (months > 0) {
    reign += reign ? ', ' : '';
    reign += `${months} months`;
  }

  if (days > 0) {
    reign += reign ? ' and ' : '';
    reign += `${days} days`;
  }

  return reign;
}

// 7463.083
