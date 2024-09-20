export const getFormattedDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = getDayWithSuffix(date.getDate());

  return `${date.toLocaleString('en-US', { month: 'short' })} ${day}, ${date.toLocaleString('en-US', {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })}`;
}


const getDayWithSuffix = (day) => {
  if (day > 3 && day < 21) return day + 'th'; 
  switch (day % 10) {
    case 1: return day + 'st';
    case 2: return day + 'nd';
    case 3: return day + 'rd';
    default: return day + 'th';
  }
};






