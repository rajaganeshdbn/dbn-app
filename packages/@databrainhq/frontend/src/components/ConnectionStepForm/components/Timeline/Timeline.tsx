import classNames from 'classnames';
import { Ui } from '@databrainhq/plugin';
import styles from './timeline.module.css';

type Step = 1 | 2 | 3 | 4;
interface Props {
  step: Step;
}

const TimeLine = ({ step }: Props) => {
  return (
    <div className="dbn-flex dbn-items-center dbn-justify-between">
      {/* source */}
      <div className={styles['step-container']}>
        <span className={classNames(styles.number, styles['number-active'])}>
          {step > 1 ? <Ui.Icons name="not-found" /> : 1}
          {/* check icon */}
        </span>
        <span
          className={classNames(
            styles.text,
            `${step === 1 ? styles['text-active'] : styles['text-notActive']}`
          )}
        >
          Add Source
        </span>
      </div>

      <hr className={styles.line} />

      {/* define */}
      <div className={styles['step-container']}>
        <span
          className={classNames(
            styles.number,
            `${
              step >= 2 ? styles['number-active'] : styles['number-notActive']
            }`
          )}
        >
          {step > 2 ? <Ui.Icons name="not-found" /> : 2}
        </span>
        <span
          className={classNames(
            styles.text,
            `${step === 2 ? styles['text-active'] : styles['text-notActive']}`
          )}
        >
          Add Destination
        </span>
      </div>

      <hr className={styles.line} />

      {/* finish */}
      <div className={styles['step-container']}>
        <span
          className={classNames(
            styles.number,
            `${
              step >= 3 ? styles['number-active'] : styles['number-notActive']
            }`
          )}
        >
          {step > 3 ? <Ui.Icons name="not-found" /> : 3}
        </span>
        <span
          className={classNames(
            styles.text,
            `${step === 3 ? styles['text-active'] : styles['text-notActive']}`
          )}
        >
          Map Data
        </span>
      </div>
    </div>
  );
};

export default TimeLine;
