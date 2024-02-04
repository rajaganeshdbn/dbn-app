import EChartsReact from 'echarts-for-react';

const getChartImage = (chartRef: React.RefObject<EChartsReact>) => {
  const chartInstance = chartRef.current?.getEchartsInstance();
  if (!chartInstance) return '#';

  const dataUrl = chartInstance.getConnectedDataURL({
    type: 'png',
    pixelRatio: 2,
    excludeComponents: ['toolbox'],
    backgroundColor: '#fff',
  });
  return dataUrl;
};

export default getChartImage;
