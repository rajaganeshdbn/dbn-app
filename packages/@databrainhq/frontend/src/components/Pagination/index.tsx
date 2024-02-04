/* eslint-disable react/no-children-prop */
import { Ui } from '@databrainhq/plugin';

type Props = {
  totalRecords: number;
  recordsPerPage: number;
  onPageChange: any;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  totalRecords,
  recordsPerPage,
  onPageChange,
  currentPage,
  setCurrentPage,
}: Props) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (newPage: any) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const adjacentPages = 2;
    const ellipsis = <span className="dbn-px-2">...</span>;

    const addPageButton = (pageNumber: number, isCurrent: boolean) => {
      return (
        <Ui.Button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          variant="popover"
          className={`${
            isCurrent ? 'dbn-bg-gray' : ''
          } dbn-py-2 dbn-px-4 dbn-border dbn-border-secondary dbn-rounded-md`}
        >
          {pageNumber}
        </Ui.Button>
      );
    };
    if (totalPages !== 0) {
      if (totalPages === 1) {
        pages.push(addPageButton(1, currentPage === 1));
      } else {
        pages.push(addPageButton(1, currentPage === 1));
        if (totalPages <= 5) {
          for (let i = 2; i <= totalPages - 1; i += 1) {
            pages.push(addPageButton(i, currentPage === i));
          }
        } else {
          const startPage = Math.max(2, currentPage - adjacentPages);
          const endPage = Math.min(totalPages - 1, currentPage + adjacentPages);
          if (startPage > 2) {
            pages.push(ellipsis);
          }
          for (let i = startPage; i <= endPage; i += 1) {
            pages.push(addPageButton(i, currentPage === i));
          }
          if (endPage < totalPages - 1) {
            pages.push(ellipsis);
          }
        }
        pages.push(addPageButton(totalPages, currentPage === totalPages));
      }
    } else {
      pages.push(addPageButton(0, currentPage === 0));
    }

    return pages;
  };

  return (
    <div className="dbn-w-full dbn-flex dbn-justify-center dbn-items-center dbn-px-8 dbn-py-4 dbn-border-t dbn-border-secondary">
      <div className="dbn-flex dbn-gap-2">
        <Ui.Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="popover"
          leftIcon={<Ui.Icons name="arrow-left" />}
          className="dbn-p-2 dbn-border dbn-border-secondary dbn-rounded-md"
          isDisabled={currentPage === 1}
          children="Prev"
        />
        {renderPageNumbers()}
        <Ui.Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === 1}
          variant="popover"
          leftIcon={<Ui.Icons name="arrow-right" />}
          className="dbn-p-2 dbn-border dbn-border-secondary dbn-rounded-md"
          isDisabled={totalPages === 0 || totalPages === 1}
          children="Next"
        />
      </div>
    </div>
  );
};

export default Pagination;
