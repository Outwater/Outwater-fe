import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import usePagenation from '../hooks/usePagenation';

const Pagination = ({ totalCount }: { totalCount: number }) => {
  const router = useRouter();
  const page = router.query.page as string;
  const {
    currentPage,
    pageNumbers,
    isStartRange,
    isLastRange,
    movePrevRange,
    moveNextRange,
    movePage,
  } = usePagenation({
    initialPage: Number(page),
    totalCount,
    pageRange: 5,
    itemCountPerPage: 10,
  });

  return (
    <Container>
      <Button disabled={isStartRange} onClick={movePrevRange}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pageNumbers.map((page) => (
          <Page
            key={String(page)}
            data-page={page}
            selected={page === currentPage}
            disabled={page === currentPage}
            onClick={movePage}
          >
            {String(page)}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={isLastRange} onClick={moveNextRange}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  cursor: pointer;

  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  cursor: pointer;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
