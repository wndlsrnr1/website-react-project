import {Pagination, PaginationItem, PaginationLink} from "reactstrap";
import {useEffect} from "react";

const checkDisablePage = (pageGroupSize, targetPage, totalPages) => {
  return targetPage > totalPages - 1;
}

const isNextPage = (pageGroupSize, currentPage, totalPages) => {
  return getNextPage(currentPage, pageGroupSize) < totalPages;
}

const isPrevPage = (pageGroupSize, currentPage, totalPages) => {
  return getPrevPage(currentPage, pageGroupSize) >= 0;
}

const getPrevPage = (currentPage, pageGroupSize) => {
  return (Math.floor(currentPage / pageGroupSize) - 1) * pageGroupSize;
}

const getNextPage = (currentPage, pageGroupSize) => {
  return (Math.floor(currentPage / pageGroupSize) + 1) * pageGroupSize;
}

const checkActivation = (targetPage, currentPage) => {
  return parseInt(targetPage) === parseInt(currentPage);
}

const getPageArray = (currentPage, pageGroupSize) => {
  const result = [];
  const start = Math.floor(currentPage / pageGroupSize) * pageGroupSize;
  const end = start + pageGroupSize;
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

const entry = (key, value, isFirst) => {
  if (isFirst) {
    return `?${key}=${value}`;
  }
  return `&${key}=${value}`;
}

/**
 * @param pageGroupSize group size of view
 * @param pageSize pages per group
 * @param totalElement quantity of total item
 * @param pageNumber present page, start from 0
 * @param requestDomain
 * @param parameterOption key and value example {parameterName1: parameterValue1, parameterName2: parameterValue2, ...}
 * @returns {JSX.Element}
 * @constructor
 */
const Paging = (props) => {
  const {pageGroupSize, pageSize, pageNumber, totalPages, requestDomain, requestMethod, parameterOption, lastItemId, lastPageNumber} = props;
  //variables

  //requests

  //useEffects

  //onClicks
// &lastItemId=${pageNumber}&lastPageNumber=${pageNumber}&pageChunk=${pageGroupSize}
  const move = (targetPage) => {
    let path = requestDomain + entry("page", targetPage, true) + entry("size", pageSize) + entry("lastItemId", lastItemId) + entry("lastPageNumber", lastPageNumber) + entry("pageChunk", pageGroupSize);
    Object.keys(parameterOption).forEach((key, idx) => {
      const value = parameterOption[key];
      if (parameterOption[key]) {
        path += entry(key, value);
      }
    });
    requestMethod(path);
  }

  const moveLast = () => {
    let path = requestDomain + `?isLastPage=${true}&size=${pageSize}`;
    Object.keys(parameterOption).forEach((key, idx) => {
      const value = parameterOption[key];
      if (parameterOption[key]) {
        path += entry(key, value);
      }
    });
    requestMethod(path);
  }

  //onSubmits

  //onChanges
  return (
    <div className={"d-flex justify-content-center"}>
      <Pagination size={"sm"}>
        <PaginationItem disabled={!isPrevPage(pageGroupSize, pageNumber, totalPages)}>
          <PaginationLink href="#" tag={"button"}
                          onClick={() => move(0)}>&lt;&lt;</PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!isPrevPage(pageGroupSize, pageNumber, totalPages)}>
          <PaginationLink tag={"button"} href="#"
                          onClick={() => move(getPrevPage(pageNumber, pageGroupSize))}>&lt;</PaginationLink>
        </PaginationItem>
        {
          getPageArray(pageNumber, pageGroupSize).map((elem, index) => {
            return (
              <>
                <PaginationItem key={elem.toString() + index} active={checkActivation(elem, pageNumber)}
                                disabled={checkDisablePage(pageGroupSize, elem, totalPages)}>
                  <PaginationLink tag={"button"} href="#" onClick={() => move(elem)}>
                    {elem + 1}
                  </PaginationLink>
                </PaginationItem>
              </>
            )
          })
        }
        <PaginationItem disabled={!isNextPage(pageGroupSize, pageNumber, totalPages)}>
          <PaginationLink tag={"button"} href="#"
                          onClick={() => move(getNextPage(pageNumber, pageGroupSize))}>></PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!isNextPage(pageGroupSize, pageNumber, totalPages)}>
          <PaginationLink tag={"button"} href="#"
                          onClick={() => moveLast()}>>></PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  )
}

export default Paging;