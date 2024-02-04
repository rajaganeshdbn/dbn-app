import React from 'react';
import styles from './filters.module.css';
import { PopoverMenu, Button, Icons, Checkbox } from '@/components';

type Filter = {
  as: any;
  dataType: string;
  name: string;
  isDefault?: boolean | undefined;
  label?: string;
};
type Props = {
  columnList: Filter[];
  setFilterList: React.Dispatch<React.SetStateAction<Filter[]>>;
  filterList: Filter[];
};
const AddFilter = ({ columnList, filterList, setFilterList }: Props) => {
  return (
    <>
      {!!columnList.length && (
        <PopoverMenu
          buttonContent={
            <Button
              variant="tertiary"
              type="button"
              leftIcon={<Icons name="plus" />}
            />
          }
          position="bottom-start"
        >
          <div className={styles.addFilterMenu}>
            {columnList.map((col) => {
              const isSelected = !!filterList.find(
                (opt) => opt.label === col.label
              );
              return (
                <div>
                  <Button
                    key={col.label}
                    variant="tertiary"
                    onClick={() => {
                      const updatedOptions = isSelected
                        ? filterList.filter((opt) => opt.label !== col.label)
                        : [...filterList, col];
                      setFilterList(updatedOptions);
                    }}
                  >
                    <Button
                      variant="tertiary"
                      onClick={() => {
                        const updatedOptions = isSelected
                          ? filterList.filter((opt) => opt.label !== col.label)
                          : [...filterList, col];
                        setFilterList(updatedOptions);
                      }}
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={() => {
                          const updatedOptions = isSelected
                            ? filterList.filter(
                                (opt) => opt.label !== col.label
                              )
                            : [...filterList, col];
                          setFilterList(updatedOptions);
                        }}
                      />
                      {/* Checked Unchecked icons */}
                      {col.label || col.name}
                    </Button>
                  </Button>
                </div>
              );
            })}
          </div>
        </PopoverMenu>
      )}
    </>
  );
};

export default AddFilter;
