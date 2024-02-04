/* eslint-disable react/forbid-dom-props */
import React from 'react';
import EChartsReact from 'echarts-for-react';

type ThemeBlockProps = {
  colors: string[];
  bgColor?: string;
  hideBackground?: boolean;
};

export const ThemeBlock = ({
  colors,
  bgColor,
  hideBackground,
}: ThemeBlockProps) => {
  const option = {
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        data: colors?.map((color) => ({
          value: 1,
          itemStyle: {
            color,
          },
        })),
        labelLine: {
          show: false,
        },
      },
    ],
  };
  return (
    <>
      {hideBackground ? (
        <EChartsReact
          option={option}
          style={{ height: '40px', width: '40px' }}
        />
      ) : (
        <div
          style={{ backgroundColor: bgColor }}
          className="dbn-w-auto dbn-p-1 dbn-rounded-md dbn-border dbn-border-secondary dbn-shadow-lg"
        >
          <EChartsReact
            option={option}
            style={{ height: '40px', width: '40px' }}
          />
        </div>
      )}
    </>
  );
};
