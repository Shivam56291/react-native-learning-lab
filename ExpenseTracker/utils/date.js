export function getFormattedDate(date) {
  return date.toISOString().split("T")[0];
}
