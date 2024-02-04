/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useEffect, useState } from 'react';
import { Button, Flex, Icons, InputField } from '@/components';
import { FloatingDropDownOption, GlobalFilterColumn } from '@/types';

type SearchFieldProps = {
  column: GlobalFilterColumn;
  onClickSearch: (value: string | undefined) => void;
  selectedValue: FloatingDropDownOption;
};
const SearchField = ({
  column,
  onClickSearch,
  selectedValue,
}: SearchFieldProps) => {
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    if (selectedValue?.value) {
      setSearchValue(selectedValue?.value);
    }
  }, [selectedValue]);
  return (
    <Flex direction="row">
      <InputField
        label={column.label || column.name}
        labelVariant="floating"
        value={searchValue}
        onChange={({ target: { value: v } }) => setSearchValue(v)}
      />
      <Button
        variant="tab"
        className="dbn-bg-primary"
        onClick={() => {
          onClickSearch(searchValue?.length ? searchValue : undefined);
        }}
      >
        <Icons name="magnifying-glass" color="white" />
      </Button>
    </Flex>
  );
};

export default SearchField;
