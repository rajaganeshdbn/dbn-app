/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/forbid-elements */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import styles from './list.module.css';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { PopoverMenu } from '@/components/PopoverMenu';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Icons, Logo } from '@/components/Icons';
import { Loader } from '@/components/Loader';
import { IS_SELF_HOSTED } from '@/consts';
import NoData from '@/components/Svg/No_data.svg';

export type ListHeaderType = {
  name: string;
  headerCell?: React.ReactNode;
  columnKey: string;
  columnCell?: (row: Record<string, any>) => React.ReactNode;
  colSpan?: number;
};

export type ListProps = {
  headers: ListHeaderType[];
  data: Record<string, any>[];
  variant?: 'primary' | 'secondary';
  noDataText?: string;
  loadMoreText?: string;
  className?: string;
  initialLimit?: number;
  isDataLoading?: boolean;
  showLogo?: boolean;
  isShowOptions?: boolean;
  setValue?: React.Dispatch<
    React.SetStateAction<{
      action: string;
      id: string;
    }>
  >;
  isDisableMoreOption?: boolean;
  isEnableHovering?: boolean;
};
const copyToClipboard = (textToCopy: string) => {
  // Create a temporary textarea element
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = textToCopy;

  // Append the textarea to the DOM
  document.body.appendChild(tempTextArea);

  // Select and copy the text
  tempTextArea.select();
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(tempTextArea);
};
export const List = ({
  headers,
  data,
  variant = 'primary',
  noDataText = 'No Data Available',
  loadMoreText = 'See More',
  className = '',
  initialLimit = 5,
  isDataLoading = false,
  showLogo,
  isShowOptions,
  setValue,
  isDisableMoreOption,
  isEnableHovering,
}: ListProps) => {
  const [limit, setLimit] = useState(initialLimit);
  const [isCopied, setCopied] = useState<string>('');
  const [hoveredRow, setHoveredRow] = useState<string>('');
  // const tableRef = React.useRef<HTMLTableElement>(null);
  return (
    <div className={`${styles[`container-${variant}`]} ${className}`}>
      {isDataLoading ? (
        <div className="dbn-my-5 dbn-w-full dbn-flex dbn-items-center dbn-justify-end">
          <SkeletonLoader variant="table" tableRows={4} />
        </div>
      ) : null}
      {!isDataLoading && data.length === 0 ? (
        <div className={styles.noData}>
          <img src={NoData} alt="no-data" width="200px" height="200px" />
          <Text variant="body-text">{noDataText}</Text>
        </div>
      ) : (
        <table className={styles.table}>
          <thead
            className={`${styles[`headers-${variant}`]} ${
              data.length === 0 ? styles[`headers-${variant}-nodata`] : ''
            }`}
          >
            <tr>
              {headers.map((header) => (
                <th
                  key={header.name}
                  colSpan={header.colSpan}
                  className={styles.headerCol}
                >
                  {header.headerCell || header.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.body}>
            {(isDisableMoreOption ? data : data.slice(0, limit)).map(
              (row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className={`${styles[`row-${variant}`]} ${
                    hoveredRow === `row-${rowIndex}` ? 'dbn-bg-gray' : ''
                  }`}
                  onMouseOver={() => setHoveredRow(`row-${rowIndex}`)}
                  onMouseOut={() => setHoveredRow('')}
                >
                  {headers.map((header, colIndex) => {
                    const hasTokenValue =
                      header.columnKey === 'invitationToken' &&
                      !!row[header.columnKey];
                    return (
                      <td
                        key={`${header.name}-${colIndex}-${header.columnKey}`}
                        colSpan={header.colSpan}
                        className={`${styles.col} ${styles[`col-${variant}`]}`}
                      >
                        <div className={styles[`col-${variant}-cell`]}>
                          {colIndex === 0 && showLogo ? (
                            <>
                              <Logo
                                name={row.dbName.toString().toLowerCase()}
                                width={20}
                              />
                              {header.name.toLowerCase() === 'name' &&
                              (row.name === null || row.name === undefined) &&
                              row.dbName.toString().toLowerCase() === 'redshift'
                                ? 'Demo Datasource'
                                : (header.columnCell
                                    ? header.columnCell(row)
                                    : row[header.columnKey]) || '-'}
                            </>
                          ) : (
                            <div className="dbn-w-full dbn-flex dbn-items-center dbn-justify-between">
                              {(header.columnCell ? (
                                header.columnCell(row)
                              ) : hasTokenValue ? (
                                <>
                                  <Text variant="body-text-sm">XXXX</Text>
                                  <Button
                                    variant="tertiary"
                                    type="button"
                                    onClick={() => {
                                      if (IS_SELF_HOSTED)
                                        copyToClipboard(row[header.columnKey]);
                                      else
                                        navigator.clipboard.writeText(
                                          row[header.columnKey]
                                        );
                                      setCopied(row[header.columnKey]);
                                    }}
                                    leftIcon={<Icons name="copy" />}
                                  >
                                    {isCopied === row[header.columnKey]
                                      ? 'Copied'
                                      : 'Copy'}
                                  </Button>
                                </>
                              ) : (
                                row[header.columnKey]
                              )) || '-'}
                              {colIndex === headers.length - 1 &&
                              isShowOptions ? (
                                <PopoverMenu
                                  buttonContent={
                                    <Button
                                      variant="popover"
                                      leftIcon={
                                        <Icons name="kebab-menu-vertical" />
                                      }
                                    />
                                  }
                                  menuWidth="120px"
                                  position="bottom"
                                >
                                  <Button
                                    variant="popover"
                                    className="dbn-p-2 dbn-flex dbn-justify-start dbn-w-full hover:dbn-bg-gray"
                                    onClick={() =>
                                      setValue?.({
                                        action: 'edit',
                                        id: row.id,
                                      })
                                    }
                                    leftIcon={<Icons name="pencil-simple" />}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="popover"
                                    className="dbn-p-2 dbn-flex dbn-justify-start dbn-w-full hover:dbn-bg-gray"
                                    onClick={() =>
                                      setValue?.({
                                        action: 'delete',
                                        id: row.id,
                                      })
                                    }
                                    leftIcon={<Icons name="delete" />}
                                  >
                                    Delete
                                  </Button>
                                </PopoverMenu>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
      {data.length > limit && !isDisableMoreOption ? (
        <div className={styles.loadMore}>
          <Button
            type="button"
            variant="tertiary"
            onClick={() => setLimit((prev) => prev + initialLimit)}
          >
            <Icons name="arrow-down" />
            <span>{loadMoreText}</span>
          </Button>
        </div>
      ) : // back to top not working as expected
      // : data.length === limit ||
      //   (data.length < limit && data.length !== 0) ? (
      //   <div className={styles.loadMore}>
      //     <Button
      //       type="button"
      //       variant="tertiary"
      //       onClick={() => {
      //         if (tableRef.current) {
      //           tableRef.current.scrollIntoView({
      //             behavior: 'smooth',
      //             block: 'start',
      //           });
      //         }
      //       }}
      //     >
      //       <Icons name="arrow-up" />
      //       <span>Back to top</span>
      //     </Button>
      //   </div>
      // )
      null}
    </div>
  );
};
