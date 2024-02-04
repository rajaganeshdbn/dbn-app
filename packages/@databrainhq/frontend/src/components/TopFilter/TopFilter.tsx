import { useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import styles from 'components/TopFilter/TopFilter.module.css';

interface Props {
  title: string;
}

const TopFilter = ({ title }: Props) => {
  const [isFillIcon, setFillIcon] = useState<boolean>(false);

  return (
    <div className={styles['main-container']}>
      {/* left section */}
      <div className="dbn-flex dbn-items-center dbn-gap-2 dbn-text-sm">
        <Ui.Button type="button" variant="tertiary">
          {title}
        </Ui.Button>
        <Ui.Button
          onClick={() => setFillIcon(!isFillIcon)}
          type="button"
          variant="tertiary"
        >
          {isFillIcon ? (
            <Ui.Icons name="not-found" /> // star fill icon
          ) : (
            <Ui.Icons name="not-found" /> // star outline icon
          )}
        </Ui.Button>
        <Ui.Button
          type="button"
          variant="tertiary"
          className="dbn-flex dbn-items-center dbn-px-2"
        >
          <Ui.Icons name="not-found" />
          <Ui.Text variant="label">Filter</Ui.Text>
        </Ui.Button>
      </div>
      {/* Right Section */}
      <div className="dbn-flex dbn-items-center">
        <Ui.Button type="button" variant="tertiary">
          <Ui.Icons name="not-found" />
          {/* list check icons */}
        </Ui.Button>

        <Ui.Button type="button" variant="tertiary">
          <Ui.Icons name="not-found" />
          {/* grid line icons */}
        </Ui.Button>

        <Ui.Button type="button" variant="tertiary">
          <Ui.Icons name="not-found" />
          {/* equalizer line */}
          <Ui.Text variant="body-text-sm">View</Ui.Text>
        </Ui.Button>
      </div>
    </div>
  );
};

export default TopFilter;
