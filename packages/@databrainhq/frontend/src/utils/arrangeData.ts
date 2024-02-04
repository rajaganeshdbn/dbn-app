const arrangeData = (dataset: any, graphStyling: any) => {
  let labels;

  if (dataset.length > 0) {
    labels = dataset[0].data.map((item: any) => item.x);
  }

  const datasets = [];
  const repetition: any = {};
  for (let i = 0; i < dataset.length; i += 1) {
    const item = dataset[i];
    const count = repetition[item.type] || 0;
    datasets.push({ ...item, ...graphStyling[item.type][count] });
    repetition[item.type] = count + 1;
  }
  return { labels, datasets };
};

export default arrangeData;
