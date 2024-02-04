import colors from 'utils/colors';

type Params = {
  data: any[] | undefined;
  yAxisList: string[] | undefined;
  xAxis: string | undefined;
  measure: string | undefined;
  step: string | undefined;
  sankeyValues: string[] | undefined;
  singleValue: string | undefined;
};
const getChartAttributes = ({
  data,
  measure,
  sankeyValues,
  singleValue,
  step,
  xAxis,
  yAxisList,
}: Params) => {
  const labels: string[] | undefined = Array.isArray(data)
    ? data.map((i) => xAxis && i[xAxis])
    : [];

  const datasets = yAxisList?.map((key, i) => ({
    label: key,
    data: Array.isArray(data) ? data.map((item) => item[yAxisList[i]]) : [],
    borderColor: colors[i],
  }));
  const funnelData = Array.isArray(data)
    ? data.map(
        (item) =>
          measure &&
          step && {
            value: item[measure],
            name: item[step],
          }
      )
    : [];
  const sankeyData = sankeyValues?.map((key, i) => {
    return Array.isArray(data) ? data.map((item) => item[sankeyValues[i]]) : [];
  });
  const singleValueData = Array.isArray(data)
    ? data.map(
        (item) =>
          singleValue && {
            value: item[singleValue],
            label: singleValue,
          }
      )
    : [];
  return { labels, datasets, funnelData, sankeyData, singleValueData };
};

export default getChartAttributes;
