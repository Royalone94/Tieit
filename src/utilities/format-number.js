export function formatNumber(x) {
  let formattedNumber = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const suffix = x.toString().slice(-3);
  if (x >= 100 && suffix === '.00') {
    formattedNumber = formattedNumber.slice(0, -3);
  }
  return formattedNumber;
}
