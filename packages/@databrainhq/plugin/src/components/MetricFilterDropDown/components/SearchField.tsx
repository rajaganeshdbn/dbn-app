/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useState } from 'react';
import { Button, Flex, Icons, InputField } from '@/components';
import { OnChangeFilterValueType } from '@/types';

export const SearchField = ({
  name,
  onChangeFilterValue,
  value,
}: {
  value: string;
  name: string;
  onChangeFilterValue: OnChangeFilterValueType;
}) => {
  const [searchValue, setSearchValue] = useState(
    value?.replace('%', '')?.replace(/'/g, '') || ''
  );

  return (
    <Flex direction="row">
      <InputField
        label={name}
        labelVariant="floating"
        value={searchValue}
        onChange={({ target: { value: v } }) => setSearchValue(v)}
      />
      <Button
        variant="tab"
        className="dbn-bg-primary"
        onClick={() => onChangeFilterValue?.(name || '', searchValue)}
      >
        <Icons name="magnifying-glass" color="white" />
      </Button>
    </Flex>
  );
};
