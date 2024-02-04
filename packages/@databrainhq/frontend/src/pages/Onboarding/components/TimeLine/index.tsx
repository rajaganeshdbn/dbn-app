/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ui } from '@databrainhq/plugin';
import styles from './timeline.module.css';

interface Props {
  step: number;
  totalSteps: number;
}
const TimeLine = ({ step, totalSteps }: Props) => {
  const inActiveStyle = { width: '30px', height: '30px', color: '#5865F6' };
  const activeStyle = { width: '30px', height: '30px', color: '#D9D9D9' };
  return (
    <div className={styles['timeline-wrapper']}>
      {Array.from(Array(totalSteps).keys()).map((num, index) => (
        // <DotIcon
        //   key={num}
        //   style={step === index + 1 ? inActiveStyle : activeStyle}
        // />
        <Ui.Icons name="not-found" key={num} />
      ))}
    </div>
  );
};

export default TimeLine;
