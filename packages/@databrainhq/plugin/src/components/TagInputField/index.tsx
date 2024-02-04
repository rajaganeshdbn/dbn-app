import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, Control } from 'react-hook-form';
import styles from './tagInputField.module.css';
import { InputField, Button, Icons } from '@/components';

type Props = {
  control: Control<FieldValues, object>;
  placeholder?: string;
  name?: string;
  id?: string;
  value?: string;
  label?: string;
  type: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number | readonly string[] | undefined;
  error?: any;
  icon?: any;
  checked?: boolean;
  isDisabled?: boolean;
  labelClass?: string;
  inputClass?: string;
  className?: string;
  innerPlaceholder?: boolean;
  innerPlaceholderText?: string;
  min?: number;
  onChangeTags?: (tags: string[]) => void;
  defaultTagValue?: string[];
};
export const TagInputField = ({
  control,
  placeholder,
  name,
  label,
  onChangeTags,
  defaultTagValue,
}: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (onChangeTags) {
      onChangeTags(tags);
    }
  }, [tags]);
  useEffect(() => {
    if (defaultTagValue && Array.isArray(defaultTagValue)) {
      setTags(defaultTagValue);
    }
  }, [defaultTagValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
    let emails = event.target.value.split(/[,\s]/);
    emails = emails.filter((email) => email !== '');
    setTags([...new Set(emails)]);
  };

  return (
    <Controller
      name={name || 'tags'}
      control={control}
      defaultValue=""
      render={({ field }) => {
        const { ref: elmentRef, ...fieldProps } = field;
        return (
          <div className={styles.inputFieldContainer}>
            <InputField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...fieldProps}
              elementRef={elmentRef}
              type="text"
              value={tagInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              label={label}
            />
            <div className={styles['tag-container']}>
              {tags.map((tag) => (
                <div key={tag} className={styles.tag}>
                  <Button
                    variant="tertiary"
                    type="button"
                    onClick={() => handleDeleteTag(tag)}
                  >
                    <span className={styles['tag-text']}>{tag}</span>
                    <Icons name="cross" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
};

export default React.memo(TagInputField);
