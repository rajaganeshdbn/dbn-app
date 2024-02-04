import generateData from 'utils/generateData';

export default [
  {
    type: 'bar',
    label: 'Dataset 1',
    data: generateData(0, 1000),
  },
  {
    type: 'bar',
    label: 'Dataset 2',
    data: generateData(0, 1000),
  },
];
