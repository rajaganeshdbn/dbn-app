/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Ui, types } from '@databrainhq/plugin';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import AccessControl from 'components/AccessControl';

type MetricMenuProps = {
  metricList: types.FloatingDropDownOption[];
  selectedMetric?: types.FloatingDropDownOption;
  label: string;
  onClick: Function;
};

const MetricMenu = ({
  metricList,
  selectedMetric,
  onClick,
}: MetricMenuProps) => {
  const [searchParams] = useSearchParams();
  const dashboardId = searchParams.get('dashboardId');
  const workspaceId = searchParams.get('wid');
  const clientId = searchParams.get('client');
  const [hoveredMetric, setHoveredMetric] = useState<string>('');

  return (
    <>
      <Ui.Menu
        items={metricList.map((metric) => ({
          name: metric.label,
          isActive: metric.subValue === selectedMetric?.value,
          content: (
            <div
              className="dbn-w-full dbn-flex dbn-gap-1 dbn-justify-center dbn-items-center dbn-relative dbn-group"
              onMouseOver={() => setHoveredMetric(metric.label)}
              onMouseOut={() => setHoveredMetric('')}
            >
              <div className="dbn-flex dbn-flex-col dbn-w-full dbn-justify-center dbn-text-sm">
                <span className="dbn-font-semibold">{metric.label}</span>
                <span className="dbn-text-gray-400">ID: {metric.subValue}</span>
              </div>
              {hoveredMetric === metric.label ? (
                <span className="dbn-flex dbn-gap-1">
                  {metric?.isImportEnabled ? (
                    <NavLink
                      to={{
                        pathname: '/createMetric/',
                        search: `?wid=${workspaceId}&dashboardId=${dashboardId}${
                          clientId ? `&client=${clientId}` : ''
                        }&metricId=${metric.value}`,
                      }}
                      className="dbn-p-1 dbn-border dbn-border-gray-400 dbn-rounded hover:dbn-bg-white"
                      target="_blank"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Ui.Icons name="import" size="xs" />
                    </NavLink>
                  ) : null}
                  <NavLink
                    to={{
                      pathname: `/metric/${metric.value}/`,
                      search: `?wid=${workspaceId}&dashboardId=${dashboardId}${
                        clientId ? `&client=${clientId}` : ''
                      }`,
                    }}
                    target="_blank"
                    className="dbn-p-1 dbn-border dbn-border-gray-400 dbn-rounded hover:dbn-bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Ui.Icons name="new-window" size="xs" />
                  </NavLink>
                </span>
              ) : null}
            </div>
          ),
          onClick: () => {
            onClick(metric);
          },
        }))}
        menuWidth="258px"
        buttonContent={
          <>
            {selectedMetric?.label ? (
              <Ui.NewTooltip text={selectedMetric?.label || ''}>
                <div className="dbn-flex dbn-gap-1 dbn-items-center dbn-truncate dbn-border dbn-border-secondary dbn-rounded dbn-px-2 dbn-py-2.5 dbn-w-[258px]">
                  <span className="dbn-text-sm dbn-font-bold">Metrics:</span>
                  <span className="dbn-font-semibold dbn-text-sm dbn-truncate">
                    {selectedMetric?.label || ''}
                  </span>
                  <span className="dbn-ml-auto">
                    <Ui.Icons name="caret-down-fill" size="xs" />
                  </span>
                </div>
              </Ui.NewTooltip>
            ) : (
              <div className="dbn-flex dbn-gap-1 dbn-items-center dbn-truncate dbn-border dbn-border-secondary dbn-rounded dbn-px-3 dbn-py-2.5 dbn-w-[258px]">
                <span className="dbn-text-sm dbn-font-bold">Metrics:</span>
                <span className="dbn-font-semibold dbn-text-sm dbn-truncate">
                  {selectedMetric?.label || ''}
                </span>
                <span className="dbn-ml-auto">
                  <Ui.Icons name="chevron-down" size="xl" />
                </span>
              </div>
            )}
          </>
        }
      >
        <AccessControl feature="metric" permission="Create">
          <div className="dbn-p-3 dbn-border-t dbn-border-secondary/80">
            <NavLink
              to={{
                pathname: '/createMetric/',
                search: `?wid=${workspaceId}&dashboardId=${dashboardId}${
                  clientId ? `&client=${clientId}` : ''
                }`,
              }}
              target="_blank"
            >
              <Ui.Button fitContainer variant="primary">
                Create New Metric
              </Ui.Button>
            </NavLink>
          </div>
        </AccessControl>
      </Ui.Menu>
    </>
  );
};

export default MetricMenu;
