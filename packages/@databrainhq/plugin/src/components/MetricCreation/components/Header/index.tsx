/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './header.module.css';
import { Button, Icons, InputField } from '@/components';
import { HeaderProps } from '@/types/metricCreate';

export const Header = ({
  setShowMetricCreateModal,
  isDisableSaveBtn,
  heading,
  setShowSaveMetricModal,
}: HeaderProps) => {
  const [isEditingTitle, setEditingTitle] = useState(false);
  return (
    <div className={styles['header-container']}>
      <div className={styles['btn-container']}>
        <Button
          type="button"
          variant="tab"
          onClick={() => setShowMetricCreateModal(false)}
          leftIcon={<Icons name="arrow-left" />}
        />
        <div>
          {isEditingTitle && heading === 'Update Metric' ? (
            <div className="dbn-relative">
              <InputField
                defaultValue={heading}
                placeholder="Edit Title"
                required
              />
              <span
                className="dbn-absolute -dbn-right-6 -dbn-top-1 dbn-cursor-pointer"
                onClick={() => setEditingTitle((prev) => !prev)}
              >
                <Icons name="pencil-simple" size="xs" />
              </span>
            </div>
          ) : (
            <div className="dbn-relative">
              <div className="dbn-flex dbn-gap-2 dbn-items-center">
                <Button
                  type="button"
                  variant="popover"
                  isDisabled={!heading}
                  className="dbn-font-bold dbn-text-lg"
                >
                  {heading || 'Untitled metric'}
                </Button>
                {heading === 'Update Metric' ? (
                  <span
                    className="dbn-cursor-pointer"
                    onClick={() => setEditingTitle((prev) => !prev)}
                  >
                    <Icons name="pencil-simple" size="xs" />
                  </span>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
      <Button
        type="submit"
        variant="tab"
        isDisabled={isDisableSaveBtn}
        onClick={() => setShowSaveMetricModal(true)}
        leftIcon={<Icons name="save" />}
      >
        Save
      </Button>
    </div>
  );
};
