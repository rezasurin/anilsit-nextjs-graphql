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
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount/pageSize)

    const totalPageNum = leftNumPage + 5

    

    if (totalPageNum >= totalPageCount ) {
      return (1, totalCount)
    }

    const leftNumIdx = Math.max(currentPage - leftNumPage, 1)
    const rightNumIdx = Math.min(currentPage+leftNumIdx, totalPageCount)

    const shouldShowLeftDot = leftNumIdx > 2
    const shouldShowRightDot = rightNumIdx < totalPageCount - 2

    const firstPageIdx = 1
    const lastPageIdx = totalPageCount

    if (!shouldShowLeftDot && shouldShowRightDot) {
      let leftItemCount = 3  * leftNumIdx
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDot && !shouldShowRightDot) {
      let rightItemCount = 3  * rightNumIdx
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [firstPageIdx, DOTS, ...rightRange]
    }

    if (shouldShowLeftDot && shouldShowRightDot) {
      let middleRange = range(leftNumIdx, rightNumIdx)
      return [firstPageIdx, DOTS, ...middleRange, DOTS, lastPageIdx]
    }

  }, [totalCount, pageSize, leftNumPage, currentPage])
  console.log(totalCount, pageSize, leftNumPage, currentPage, "<< PAGE")
  return paginationRange
}