export function isTimeoutError(error) {
  return /^Timeout of \d+.*/.test(error.message);
}
