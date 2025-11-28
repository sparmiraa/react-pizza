import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import React from "react";

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

export default React.memo(function Pagination({
  currentPage,
  onChangePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
});
