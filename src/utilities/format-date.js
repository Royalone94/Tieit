export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

export function formatStringToISODate(strDate) {
  const isoDate = `${strDate.replace(' ', 'T')}Z`;
  const date = new Date(isoDate);
  return date;
}
