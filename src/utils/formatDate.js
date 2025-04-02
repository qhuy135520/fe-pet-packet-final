export default function formatDate(inputDate) {
  const date = new Date(inputDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return date.toLocaleDateString("en-US", options);
}
