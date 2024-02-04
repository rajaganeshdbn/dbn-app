import { ClickActionsConfig } from '@/types';

export const handleRoute = (routeType: string, route: string) => {
  if (routeType === 'external') {
    window.open(route, '_blank');
  } else {
    window.location.replace(route);
  }
};
export const handleCardClick = (
  clickActionsConfig: ClickActionsConfig,
  metricId: string,
  id: string
) => {
  const { card } = clickActionsConfig;

  if (!card.isEnable) return;

  switch (card.dynamic) {
    case 'metricid': {
      const metricRoute = card.route.replace('{{metric.metricid}}', metricId);
      handleRoute(card.routeType, metricRoute);
      break;
    }
    case 'uuid': {
      const uuidRoute = card.route.replace('{{metric.uuid}}', id);
      handleRoute(card.routeType, uuidRoute);
      break;
    }
    case 'none': {
      handleRoute(card.routeType, card.route);
      break;
    }
    default:
      console.warn('Unhandled click behaviour configuration');
      break;
  }
};

export const handleChartClick = (
  clickActionsConfig: ClickActionsConfig['chart'],
  value: string | number
) => {
  if (clickActionsConfig.isEnable) {
    const navigateRoute = clickActionsConfig.route.replace(
      '{{value}}',
      `${value}`.replace(/"/g, '')
    );
    handleRoute(clickActionsConfig.routeType, navigateRoute);
  }
};
