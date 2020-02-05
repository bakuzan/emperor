const ONE_YEAR = 365;
const ONE_MONTH = 30.417;

export function displayReignLength(reignInDays: number) {
  let reign = '';

  const totalDays = Math.round(reignInDays);

  const dy = totalDays / ONE_YEAR;
  const years = Math.floor(dy);

  const dm = totalDays / ONE_MONTH;
  const months = Math.floor(dm - years * 12);

  const days = Math.round(totalDays - years * ONE_YEAR - months * ONE_MONTH);

  if (years) {
    reign += `${years} years`;
  }

  if (months) {
    reign += reign ? ', ' : '';
    reign += `${months} months`;
  }

  if (days) {
    reign += reign ? ' and ' : '';
    reign += `${days} days`;
  }

  return reign;
}

// 7463.083
