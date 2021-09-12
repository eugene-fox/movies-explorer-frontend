const minuteToHoursConverter = ( valueInMinute ) => {
  const hours = Math.trunc(valueInMinute / 60);
  const minute = valueInMinute % 60;
  let resultValue = (`${hours}ч ${minute}м`);
  if (hours === 0) {
    resultValue = (`${minute}м`);
  }
  if (minute === 0) {
    resultValue = (`${hours}ч`);
  }
  return resultValue;
}

export default minuteToHoursConverter;