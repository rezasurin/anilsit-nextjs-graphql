import { usePagination } from "../hooks/usePagination";
import { css } from "@emotion/react";

import { DOTS } from "../hooks/usePagination";
import { theme } from "../utils/theme";

const paginationCls = (props) => css`

  display: flex;
  list-style-type: none;
  

  li {
    padding: 0 12px;
    height: 32px;
    text-align: center;
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0.01071em;
    border-radius: 16px;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;
    color: white;

    &.dots:hover {
      background-color: transparent;
      cursor: default;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }

    &.selected {
      background-color: ${theme.palette.accent.main};
    }

    .arrow {
      &::before {
        position: relative;
        /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
        content: '';
        /* By using an em scale, the arrows will size with the font */
        display: inline-block;
        width: 0.4em;
        height: 0.4em;
        border-right: 0.12em solid rgba(255, 255, 255, 0.87);
        border-top: 0.12em solid rgba(255, 255, 255, 0.87);
      }

      &.left {
        transform: rotate(-135deg) translate(-50%);
      }

      &.right {
        transform: rotate(45deg);
      }
    }

    &.disabled {
      pointer-events: none;

      .arrow::before {
        border-right: 0.12em solid rgba(255, 255, 255, 0.43);
        border-top: 0.12em solid rgba(255, 255, 255, 0.43);
      }

      &:hover {
        background-color: transparent;
        cursor: default;
      }
    }
  }
`;

export const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    leftNumPage = 1,
    pageSize,
    currentPage,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
    leftNumPage,
  });

  if (currentPage === 0 || paginationRange < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  let lastPage = paginationRange[paginationRange.length - 1];
  
  console.log(currentPage , "<< current page")
  return (
    <ul css={paginationCls}>
      <li onClick={onPrevious} className={`${currentPage <= 1 && 'disabled'}`}>
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return <li className={`${pageNumber === currentPage && 'selected'}`} onClick={() => onPageChange(pageNumber)}>{pageNumber}</li>;
      })}
      {/*  Right Navigation arrow */}
      <li
        // className={classnames('pagination-item', {
        //   disabled: currentPage === lastPage
        // })}
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};
