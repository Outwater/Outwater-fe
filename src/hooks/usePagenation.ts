import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const usePagenation = ({
  initialPage,
  totalCount,
  itemCountPerPage = 10,
  pageRange = 5,
}: {
  initialPage: number;
  totalCount: number;
  itemCountPerPage?: number;
  pageRange?: number;
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageNumbers, setPageNumbers] = useState<Number[]>([]);

  const lastPage = Math.ceil(totalCount / itemCountPerPage);
  const currentStartPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
  const currentLastPage = Math.min(Math.floor(currentStartPage + pageRange - 1), lastPage);
  const isStartRange = currentPage <= pageRange;
  const isLastRange = currentPage > lastPage - (lastPage % pageRange);

  useEffect(() => {
    const makeCurrentRange = () => {
      return Array.from(
        { length: currentLastPage - currentStartPage + 1 },
        (_, idx) => currentStartPage + idx
      );
    };
    setPageNumbers(makeCurrentRange());
  }, [currentPage]);

  const moveNextRange = () => {
    const nextRangeStart = currentStartPage + pageRange;
    setCurrentPage(nextRangeStart);
    router.push(`/pagination?page=${nextRangeStart}`);
  };
  const movePrevRange = () => {
    const prevRangeLast = currentStartPage - 1;
    setCurrentPage(prevRangeLast);
    router.push(`/pagination?page=${prevRangeLast}`);
  };
  const movePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = (e.target as HTMLButtonElement).dataset.page;
    setCurrentPage(Number(page));
    router.push(`/pagination?page=${page}`);
  };

  return {
    currentPage,
    pageNumbers,
    totalCount,
    moveNextRange,
    movePrevRange,
    movePage,
    isStartRange,
    isLastRange,
  };
};

export default usePagenation;
