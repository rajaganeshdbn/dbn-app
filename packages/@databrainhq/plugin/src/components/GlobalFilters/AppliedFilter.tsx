/* eslint-disable no-nested-ternary */
import React from 'react';
import styles from './filters.module.css';
import { FilterFieldType, Button, Icons, Text } from '@/components';

type AppliedFilterProps = {
  appliedFilter: FilterFieldType[];
  setAppliedFilters: React.Dispatch<React.SetStateAction<FilterFieldType[]>>;
  onChangeFilters: (updatedFilters: FilterFieldType[]) => void;
};
export const AppliedFilter = ({
  appliedFilter,
  setAppliedFilters,
  onChangeFilters,
}: AppliedFilterProps) => {
  const globalFilters = appliedFilter.filter(
    (itm) => itm.filterType === 'global'
  );
  const horizontalFilters = appliedFilter.filter(
    (itm) => itm.filterType === 'horizontal'
  );

  return (
    <div className={styles.appliedfilters}>
      {globalFilters.length
        ? globalFilters.map((filter) => {
            return (
              <div className={styles.appliedFilterTag}>
                <Text variant="body-text-sm">{filter.column}</Text>
                <Text variant="body-text-sm">is</Text>
                {filter.as !== 'string' &&
                  filter.as !== 'boolean' &&
                  filter.as !== 'default' && (
                    <Text variant="body-text-sm">between</Text>
                  )}
                <Text variant="body-text-sm">
                  {Array.isArray(filter.value)
                    ? filter.as === 'string'
                      ? filter.value.join(', ')
                      : filter.value.join(' & ')
                    : typeof filter.value === 'string' && filter.as === 'number'
                    ? filter.value.replace('AND', '&')
                    : typeof filter.value === 'string'
                    ? filter.value
                        .split(' ')
                        .slice(2)
                        .join(' ')
                        .replace('AND', '&')
                    : typeof filter.value === 'object'
                    ? `${new Date(filter.value?.startDate as string)
                        .toISOString()
                        .slice(0, 10)} AND ${new Date(
                        filter.value?.endDate as string
                      )
                        .toISOString()
                        .slice(0, 10)}`
                    : filter.value}
                </Text>
                <Button
                  variant="tertiary"
                  type="button"
                  onClick={() => {
                    setAppliedFilters((prev: any[]) =>
                      prev.filter((a) => a.column !== filter.column)
                    );
                    const filterColumns = appliedFilter.filter(
                      (c) => c.column !== filter.column
                    );
                    onChangeFilters(filterColumns);
                  }}
                  leftIcon={<Icons name="cross" />}
                />
              </div>
            );
          })
        : null}

      {horizontalFilters.length
        ? horizontalFilters.map((filter) => {
            return (
              <div className={styles.appliedFilterTag} key={filter.column}>
                <Text variant="body-text-sm">{filter.column}</Text>
                <Text variant="body-text-sm">is</Text>
                {filter.as !== 'string' &&
                  filter.as !== 'boolean' &&
                  filter.as !== 'default' && (
                    <Text variant="body-text-sm">between</Text>
                  )}
                <Text variant="body-text-sm">
                  {Array.isArray(filter.value)
                    ? filter.as === 'string'
                      ? filter.value.join(', ')
                      : filter.value.join(' & ')
                    : typeof filter.value === 'string' && filter.as === 'number'
                    ? filter.value.replace('AND', '&')
                    : typeof filter.value === 'string' && filter.as === 'date'
                    ? filter.value
                        .split(' ')
                        .slice(2)
                        .join(' ')
                        .replace('AND', '&')
                    : typeof filter.value === 'object'
                    ? `${new Date(filter.value?.startDate as string)
                        .toISOString()
                        .slice(0, 10)} AND ${new Date(
                        filter.value?.endDate as string
                      )
                        .toISOString()
                        .slice(0, 10)}`
                    : filter.value}
                </Text>
                <Button
                  variant="tertiary"
                  type="button"
                  onClick={() => {
                    setAppliedFilters((prev: any[]) =>
                      prev.filter((a) => a.column !== filter.column)
                    );
                    const filterColumns = appliedFilter.filter(
                      (c) => c.column !== filter.column
                    );
                    onChangeFilters(filterColumns);
                  }}
                >
                  <Icons name="cross" />
                </Button>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default AppliedFilter;
