// Changes the given time string into secs, hours, days and so on
const formatTimeDifference = (givenDatetime: string) => {
  const givenDatetimeObject: any = new Date(givenDatetime);
  const currentDatetime: any = new Date();
  const timeDifference = currentDatetime - givenDatetimeObject;
  if (timeDifference < 0 || !timeDifference) {
    return 'now';
  }
  if (timeDifference < 60 * 1000) {
    const secondsDifference = timeDifference / 1000;
    return `${Math.floor(secondsDifference)} seconds ago`;
  }
  if (timeDifference < 60 * 60 * 1000) {
    const minutesDifference = timeDifference / (1000 * 60);
    return `${Math.floor(minutesDifference)} minutes ago`;
  }
  if (timeDifference < 24 * 3600 * 1000) {
    const hoursDifference = timeDifference / (1000 * 3600);
    return `${Math.floor(hoursDifference)} hours ago`;
  }
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return `${Math.floor(daysDifference)} days ago`;
};

export default formatTimeDifference;
