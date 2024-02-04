/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { NavLink } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';
import { Integration } from 'types/integration';
import styles from './integrationCard.module.css';

type Props = {
  integration: Integration;
};
const IntegrationCard = ({ integration }: Props) => {
  return (
    <div className="dbn-w-full dbn-flex dbn-items-center dbn-justify-center">
      <div className={styles['integrationCard-container']}>
        <NavLink to={`/integration/${integration.id}`}>
          <div className={styles['integrationCard-inner-container']}>
            <img
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                integration.icon
              )}`}
              alt=""
              className="dbn-max-h-[50px] dbn-max-w-[50px] dbn-h-full dbn-w-full"
            />
            <Ui.Text variant="heading">{integration.label}</Ui.Text>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default IntegrationCard;
