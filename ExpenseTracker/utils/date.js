export function getFormattedDate(date) {
  return date.toISOString().split("T")[0];
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function isValidDate(dateString) {
  // Match YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(dateString);

  // Check if date object matches the numbers exactly
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month && // getMonth is 0-based
    date.getDate() === day
  );
}