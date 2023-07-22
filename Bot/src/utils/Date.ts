export const getDayToMs = () => {
  // Return DD/MM/YYYY HH:MM:SS:MS
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ms = date.getMilliseconds();
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}:${ms}`;
};
