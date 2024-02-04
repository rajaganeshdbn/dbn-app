type SegmentEvent = (
  event?: any,
  properties?: any,
  type?: 'track' | 'identify' | 'page' | 'group' | 'alias'
) => void;

const segmentEvent: SegmentEvent = (event, properties, type = 'track') => {
  if (window.analytics) {
    if (type === 'identify') {
      window.analytics.identify(event.id, properties);
      window.analytics.track(event.type, properties);
      return;
    }
    if (properties) {
      window.analytics[type](event, properties);
      if (event === 'logout') {
        window.analytics.reset();
      }
    } else {
      window.analytics[type](event);
    }
  }
};

export default segmentEvent;
