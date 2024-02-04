/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/**
 * @name pivotDataTransform - converts array of objects to pivot csv data
 * @param chartOptions - includes chart properties, data - array of objects including data for the chart
 * @returns array containing pivoted data
 */
import { ChartSettingsType } from '@/types';
import transformData from '@/components/PivotTable/transformData';

export const pivotDataTransform = (
  chartOptions: ChartSettingsType | undefined,
  data: Record<string, string>[]
) => {
  const arr3: any[] = [];
  if (chartOptions?.pivotTableSettings) {
    const metrics = chartOptions.pivotTableSettings.rows || [];
    const groups = chartOptions.pivotTableSettings.columns || [];
    const output = transformData(data, groups, metrics);
    const arr: any[] = [];
    const arr2: any[] = [];
    const obj3 = output[metrics[0]];
    obj3.map((item) => {
      const string = item.parent;
      if (string.includes('/')) {
        const lastIndex = string.lastIndexOf('/');
        const result = [
          string.substring(0, lastIndex),
          string.substring(lastIndex + 1),
        ];
        if (!arr.includes(result[1])) {
          arr.push(result[1]);
        }
        if (!arr2.includes(result[0])) {
          arr2.push(result[0]);
        }
      } else {
        arr2.push(string);
        arr.push(string);
      }
    });
    arr2.forEach((value) => {
      const obj2: any = {};
      obj2.keys = value;
      arr.forEach((value2) => {
        obj2[`${metrics[0]} - ${value2}`] = null;
      });
      arr3.push(obj2);
    });
    for (let j = 0; j < arr3.length; j += 1) {
      const a = arr3[j];
      Object.keys(a).map((val) => {
        const l = val.split(' - ');
        obj3.map((vali) => {
          if (vali.parent.includes('/')) {
            if (vali.parent === `${a.keys}/${l[1]}` && l[0] === metrics[0]) {
              a[val] = vali.name;
            }
          } else if (vali.parent === l[1] && l[0] === metrics[0]) {
            a[val] = vali.name;
          }
        });
      });
    }
    if (metrics.length > 1) {
      for (let i = 1; i < metrics.length; i += 1) {
        const arr4: any[] = [];
        const arr5: any[] = [];
        const obj = output[metrics[i]];
        obj.map((item) => {
          const string = item.parent;
          if (string.includes('/')) {
            const lastIndex = string.lastIndexOf('/');
            const result = [
              string.substring(0, lastIndex),
              string.substring(lastIndex + 1),
            ];
            if (!arr4.includes(result[1])) {
              arr4.push(result[1]);
            }
            if (!arr5.includes(result[0])) {
              arr5.push(result[0]);
            }
          } else {
            arr4.push(string);
            arr5.push(string);
          }
        });
        arr5.forEach((value) => {
          arr3.map((ob) => {
            if (ob.keys === value) {
              arr.forEach((value2) => {
                ob[`${metrics[i]} - ${value2}`] = null;
              });
            }
          });
        });
        for (let j = 0; j < arr3.length; j += 1) {
          const a = arr3[j];
          Object.keys(a).map((val) => {
            const l = val.split(' - ');
            obj.map((vali) => {
              if (vali.parent.includes('/')) {
                if (
                  vali.parent === `${a.keys}/${l[1]}` &&
                  l[0] === metrics[i]
                ) {
                  a[val] = vali.name;
                }
              } else if (vali.parent === l[1] && l[0] === metrics[i]) {
                a[val] = vali.name;
              }
            });
          });
        }
      }
    }
    if (groups.length > 2) {
      for (let j = 0; j < arr3.length; j += 1) {
        const a = arr3[j];
        const val = a.keys.replace(/\//g, ',');
        a.keys = `(${val})`.replace(/\b(\w+)\b/g, "'$1'");
      }
    } else if (groups.length === 1) {
      const specificKey = 'keys';
      arr3.forEach((obj) => {
        delete obj[specificKey];
      });
      arr3.splice(1);
    }
  }
  return arr3;
};
