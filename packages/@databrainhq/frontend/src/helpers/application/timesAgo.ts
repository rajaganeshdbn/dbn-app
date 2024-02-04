/* eslint-disable no-restricted-syntax */
const timeAgo = (unixTimestamp: number) => {
  const now = Date.now();
  const diff = now - unixTimestamp;

  const units = [
    { label: 'year', duration: 1000 * 60 * 60 * 24 * 365 },
    { label: 'month', duration: 1000 * 60 * 60 * 24 * 30 },
    { label: 'week', duration: 1000 * 60 * 60 * 24 * 7 },
    { label: 'day', duration: 1000 * 60 * 60 * 24 },
    { label: 'hour', duration: 1000 * 60 * 60 },
    { label: 'minute', duration: 1000 * 60 },
    { label: 'second', duration: 1000 },
    { label: 'millisecond', duration: 1 },
  ];

  for (const unit of units) {
    const numUnitsAgo = Math.floor(diff / unit.duration);
    if (numUnitsAgo >= 1) {
      return `${numUnitsAgo} ${unit.label}${numUnitsAgo > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

export default timeAgo;
