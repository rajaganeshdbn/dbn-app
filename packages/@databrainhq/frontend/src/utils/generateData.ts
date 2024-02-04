// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

const dates = faker.date.betweens(
  '2020-01-01T00:00:00.000Z',
  '2030-01-01T00:00:00.000Z',
  30
);

const generateData = (min: number, max: number) => {
  const data = dates.map((date) => {
    return {
      x: date.toLocaleTimeString(),
      y: faker.datatype.number({ min, max }),
    };
  });

  return data;
};

export default generateData;
