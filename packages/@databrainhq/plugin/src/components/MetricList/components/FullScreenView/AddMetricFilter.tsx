import React from 'react';
import styles from './fullscreen.module.css';
import { Button, Checkbox, Icons, PopoverMenu } from '@/components';
import { RlsCondition } from '@/types';

type AddMetricFilterProps = {
  filters: RlsCondition[];
  updateFilter: (filter: RlsCondition) => void;
};
const AddMetricFilter = ({ filters, updateFilter }: AddMetricFilterProps) => {
  return (
    <>
      {filters.length ? (
        <PopoverMenu
          tabMenu
          buttonContent={
            <Button
              variant="tab"
              type="button"
              leftIcon={<Icons name="plus" />}
            />
          }
          position="bottom-start"
        >
          <div className={styles.addFilterMenu}>
            {filters.map((filter) => {
              const isSelected = filter.isAddOnMetrics;
              return (
                <div className={styles.filterOption}>
                  <Checkbox
                    checked={isSelected}
                    onClick={() => updateFilter(filter)}
                    label={filter.name}
                  />
                </div>
              );
            })}
          </div>
        </PopoverMenu>
      ) : null}
    </>
  );
};

export default AddMetricFilter;
