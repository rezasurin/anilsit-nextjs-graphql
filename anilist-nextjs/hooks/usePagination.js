import { useMemo } from "react"

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1

  return Array.from({ length }, (_, index) => index +start)
}

export const usePagination = ({
  totalCount,
  pageSize,
  leftNumPage = 1,
  currentPage,
  lastPage
}) => {
  const paginationRange = useMemo(() => {
    // const totalCount = Math.ceil(totalCount/pageSize)

    const totalPageNum = leftNumPage + 5


    if (totalPageNum >= totalCount ) {
      return (1, totalCount)
    }

    const leftNumIdx = Math.max(currentPage - leftNumPage, 1)
    const rightNumIdx = Math.min(currentPage+leftNumPage, totalCount)
    
    
    const shouldShowLeftDot = leftNumIdx > 1
    const shouldShowRightDot = rightNumIdx < totalCount - 3

    const firstPageIdx = 1
    const lastPageIdx = lastPage

    if (!shouldShowLeftDot && shouldShowRightDot) {
      let leftItemCount = 3 + 2  * leftNumPage
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalCount]
    }

    if (shouldShowLeftDot && !shouldShowRightDot) {
      let rightItemCount = 3 + 2  * leftNumPage
      let rightRange = range(totalCount - rightItemCount + 1, totalCount)
      return [firstPageIdx, DOTS, ...rightRange]
    }

    if (shouldShowLeftDot && shouldShowRightDot) {
      let middleRange = range(leftNumIdx, rightNumIdx)
    
      return [firstPageIdx, DOTS, ...middleRange, DOTS, lastPageIdx]
    }

  }, [totalCount, pageSize, leftNumPage, currentPage])

  return paginationRange
}