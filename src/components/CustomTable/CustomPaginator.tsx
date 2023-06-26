import { Pagination } from 'react-bootstrap';

export default function CustomPaginator({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const MAX_PAGINATION_ITEMS = 7;

  let paginationItems: any = [];

  paginationItems = [];

  let totalPaginationItems = MAX_PAGINATION_ITEMS;
  let displayedPageLinksToLeft;
  let displayedPageLinksToRight;

  if (totalPages <= MAX_PAGINATION_ITEMS) {
    displayedPageLinksToLeft = MAX_PAGINATION_ITEMS;
    displayedPageLinksToRight = MAX_PAGINATION_ITEMS;
  } else {
    // There are 3 states
    // 1. Page is in the middle ellipsis on both side
    // 2. Page is on the left side ellipsis on the right side
    // 3. Page is on the right side ellipsis on the left side

    // In the middle
    if (currentPage >= 4 && totalPages - currentPage >= 4) {
      displayedPageLinksToLeft = 2;
      displayedPageLinksToRight = 1;
    }
    // On the left side
    else if (currentPage < 4) {
      displayedPageLinksToLeft = currentPage;
      displayedPageLinksToRight = totalPaginationItems - displayedPageLinksToLeft - 3;
    }
    // On the right side
    else {
      displayedPageLinksToRight = totalPages - currentPage;
      displayedPageLinksToLeft = totalPaginationItems - displayedPageLinksToRight - 1;
    }
  }

  displayedPageLinksToLeft = displayedPageLinksToLeft === 0 ? 1 : displayedPageLinksToLeft;

  for (let i = currentPage + 1; i > 0; i--) {
    if (displayedPageLinksToLeft === 0) break;

    paginationItems.unshift(
      <Pagination.Item onClick={() => onPageChange(i)} active={currentPage === i - 1} key={i}>
        {i}
      </Pagination.Item>
    );

    displayedPageLinksToLeft--;
  }

  if (paginationItems[0].key != 1) {
    if (paginationItems[0].key != 2) {
      paginationItems.unshift(<Pagination.Ellipsis key={'ellipsis-start'} />);
    }

    paginationItems.unshift(
      <Pagination.Item active={currentPage === 0} key={1} onClick={() => onPageChange(0)}>
        {1}
      </Pagination.Item>
    );
  }

  paginationItems.unshift();

  for (let i = currentPage + 2; i <= totalPages; i++) {
    if (displayedPageLinksToRight == 0) break;

    paginationItems.push(
      <Pagination.Item onClick={() => onPageChange(i - 1)} active={currentPage === i - 1} key={i}>
        {i}
      </Pagination.Item>
    );

    displayedPageLinksToRight--;
  }

  if (paginationItems[paginationItems.length - 1].key != totalPages) {
    if (paginationItems[paginationItems.length - 1].key != totalPages - 1) {
      paginationItems.push(<Pagination.Ellipsis key={'ellipsis-end'} />);
    }

    paginationItems.push(
      <Pagination.Item key={totalPages} onClick={() => onPageChange(totalPages - 1)}>
        {totalPages}
      </Pagination.Item>
    );
  }

  paginationItems.push();

  return (
    <Pagination>
      <Pagination.Prev
        key={-1}
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {paginationItems}
      <Pagination.Next
        key={-2}
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
}
