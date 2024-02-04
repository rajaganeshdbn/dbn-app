import generateData from 'utils/generateData';

export default [
  {
    label: 'ARR',
    type: 'bar',
    data: generateData(0, 2_500_000),
  },
  {
    label: 'Last 6 months',
    type: 'line',
    data: generateData(0, 100),
  },
  {
    label: 'Last 12 months',
    type: 'line',
    data: generateData(0, 100),
  },
  {
    label: 'Last 12 months',
    type: 'line',
    data: generateData(0, 100),
  },
];
