import { useState } from "react";

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [prevTotalItems, setPrevTotalItems] = useState(totalItems);

  // ✅ The "React Way": Reset state during render, completely avoiding useEffect!
  if (totalItems !== prevTotalItems) {
    setPrevTotalItems(totalItems);
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * itemsPerPage;

  return {
    currentPage: activePage,
    setCurrentPage,
    totalPages,
    startIndex,
  };
};