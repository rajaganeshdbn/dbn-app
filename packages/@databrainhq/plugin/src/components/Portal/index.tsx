import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export const Portal = ({ children }: PropsWithChildren) => {
  const [portalContainer, setPortalContainer] = useState<
    Element | ShadowRoot
  >();

  useEffect(() => {
    const portal =
      document.querySelector('#dbn-portal') || document.createElement('div');
    portal.setAttribute('id', 'dbn-portal');
    if (!document.body.querySelector('#dbn-portal'))
      document.body.appendChild(portal);
    if (
      document.querySelector('dbn-dashboard') ||
      document.querySelector('dbn-metric') ||
      document.querySelector('dbn-create-metric')
    ) {
      const dbnStyles = document.querySelector('#dbn-styles');
      const shadowRoot =
        portal.shadowRoot || portal.attachShadow({ mode: 'open' });
      if (dbnStyles && !shadowRoot.querySelector('#dbn-portal-style')) {
        const style = document.createElement('style');
        style.innerHTML = dbnStyles.innerHTML;
        style.setAttribute('id', `dbn-portal-style`);
        shadowRoot.appendChild(style);
      }
      setPortalContainer(shadowRoot);
    } else {
      setPortalContainer(portal);
    }
  }, []);

  return portalContainer
    ? ReactDOM.createPortal(children, portalContainer)
    : null;
};
