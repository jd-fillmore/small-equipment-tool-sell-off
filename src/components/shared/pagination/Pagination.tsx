import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

import "./pagination.scss";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

export const Pagination = ({
  pageCount,
  onPageChange,
  currentPage,
}: PaginationProps) => {
  const { t } = useTranslation();
  return (
    <ReactPaginate
      previousLabel={t("prev")}
      nextLabel={t("next")}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={onPageChange}
      forcePage={currentPage} // Set the current active page using `forcePage`
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};
