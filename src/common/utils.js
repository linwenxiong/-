export function getDate() {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  return `${year}-${month}-${day}`;
}

export function setTimeframeofonemonth() {
  let base = +new Date(getDate());
  let oneDay = 24 * 3600 * 1000;
  let startTime = base - oneDay * 30 // 反推30天
  let dateTime = [new Date(startTime).toLocaleDateString().replace(/\//g, '-'), getDate()]
  return dateTime
}