import {
  Button,
  Container, Form,
  FormGroup,
  Input,
  InputGroup, InputGroupButtonDropdown,
  InputGroupText,
  ListGroup,
  ListGroupItem,
  Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import {useEffect, useState} from "react";

const togglePrevPage = (pageNumber, totalPage, pagePerChunk) => {
  const resultNumber = Math.floor(pageNumber / pagePerChunk);
  return resultNumber === 0;
}

const hasNextPage = (pageNumber, totalPage, pagePerChunk) => {
  const thisPageGroup = Math.floor(pageNumber / pagePerChunk);
  const totalPageGroup = Math.floor(totalPage / pagePerChunk);
  return thisPageGroup < totalPageGroup;
}

const makePageArray = (presentPageNumber, pagePerChunk) => {
  const start = Math.floor(presentPageNumber / pagePerChunk);
  const result = [];
  for (let i = start; i < start + pagePerChunk; i++) {
    result.push(i + 1);
  }
  return result;
}

const pageActive = (elementPageNumber, presentPageNumber) => {
  return elementPageNumber === presentPageNumber + 1;
}

/**
 * @param elementPageNumber start from 1
 * @param totalPageNumber start from 1
 */
const isDisablePage = (elementPageNumber, totalPageNumber) => {
  return elementPageNumber > totalPageNumber;
}

const isActiveList = (elementId, selectedId) => {
  return Number.parseInt(elementId) === Number.parseInt(selectedId);
}

const CategoryManage = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryPageSize, setCategoryPageSize] = useState(0);
  const [categoryTotalElements, setCategoryTotalElements] = useState(0);
  const [categoryTotalPages, setCategoryTotalPages] = useState(0);
  const [categoryNumberOfElements, setCategoryNumberOfElements] = useState(0);
  const [categoryPageNumber, setCategoryPageNumber] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [categorySearchInput, setCategorySearchInput] = useState("");
  const [categorySearchCond, setCategorySearchCond] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    fetch("/admin/categories?size=10&page=" + 0, {method: "get"})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(resp => {
        const {data, error, message} = resp;
        console.log(data);
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setCategories(content);
        setCategoryPageSize(size);
        setCategoryTotalElements(totalElements);
        setCategoryTotalPages(totalPages);
        setCategoryNumberOfElements(number);
        setCategoryPageNumber(number);
      });

    setIsLoaded(true);
  }, [categories]);

  //clearSelected
  const clearSelectedAfterSearch = () => {
    setSelectedCategory(-1);
  };

  const onChangeCategoryInput = (event) => {
    const categorySearchInput = event.currentTarget.value;
    setCategorySearchInput(categorySearchInput);
  }

  const onSubmitCategorySearchName = (event) => {
    event.preventDefault();
    fetch(`/admin/categories?size=10&page=${0}&searchName=${categorySearchInput}`, {method: "get"})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(resp => {
        const {data, error, message} = resp;
        console.log(data);
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setCategories(content);
        setCategoryPageSize(size);
        setCategoryTotalElements(totalElements);
        setCategoryTotalPages(totalPages);
        setCategoryNumberOfElements(number);
        setCategoryPageNumber(number);
        setCategorySearchCond(categorySearchInput);
      });
    setIsLoaded(true);
    clearSelectedAfterSearch();
  }

  const onClickCategoryPage = (pageNumber) => {
    let requestPath = `/admin/categories?size=10&page=${pageNumber - 1}`;
    if (categorySearchCond !== null && categorySearchCond !== undefined && categorySearchCond) {
      requestPath += `&searchName=${categorySearchCond}`;
    }

    fetch(requestPath, {method: "get"})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(resp => {
        const {data, error, message} = resp;
        console.log(data);
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setCategories(content);
        setCategoryPageSize(size);
        setCategoryTotalElements(totalElements);
        setCategoryTotalPages(totalPages);
        setCategoryNumberOfElements(number);
        setCategoryPageNumber(number);
      });
    clearSelectedAfterSearch();
  }

  const onClickCategoryItem = (event) => {
    event.preventDefault();
    const categoryId = event.currentTarget.getAttribute("category_id");
    if (categoryId === selectedCategory) {
      setSelectedCategory(-1);
      return;
    }
    setSelectedCategory(categoryId);
  }



  return (
    <>
      <Container className={"mt-5"}>
        <h3 className={"text-center p-2"}>카테고리 관리</h3>
        <div className={"d-flex justify-content-around"}>
          <div className={"category p-5 w-100"}>
            <Form onSubmit={onSubmitCategorySearchName}>
              <InputGroup className={"pb-5"}>
                <InputGroupText>이름 검색</InputGroupText>
                <Input name={"category_cond"} type="text" placeholder={"카테고리 이름을 검색해주세요"}
                       onChange={onChangeCategoryInput} value={categorySearchInput}/>
                <Button type={"submit"} className={"bg-primary"}>검색</Button>
              </InputGroup>
            </Form>

            <h3 className={"text-center"}>카테고리</h3>
            <div className={"pb-5"}>
              {/*---------------print categories----------------*/}
              <ListGroup className={"pb-4"}>
                {
                  categories.map((elem, index) => {
                    return (
                      <>
                        <ListGroupItem active={isActiveList(elem.id, selectedCategory)} tag="button" category_id={elem.id} onClick={onClickCategoryItem}>
                          {elem.nameKor} ({elem.name})
                        </ListGroupItem>
                      </>
                    )
                  })
                }

              </ListGroup>
              {/*-------------Paging------------------*/}
              <div className={"d-flex justify-content-center"}>
                <Pagination size={"sm"}>
                  <PaginationItem disabled={togglePrevPage(categoryPageNumber, categoryTotalPages, 5)}>
                    <PaginationLink href="#" tag={"button"}>&lt;&lt;</PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={togglePrevPage(categoryPageNumber, categoryTotalPages, 5)}>
                    <PaginationLink tag={"button"} href="#">&lt;</PaginationLink>
                  </PaginationItem>
                  {
                    makePageArray(categoryPageNumber, 5).map((elem, index) => {
                      return (
                        <>
                          <PaginationItem active={pageActive(elem, categoryPageNumber)}
                                          disabled={isDisablePage(elem, categoryTotalPages)}>
                            <PaginationLink tag={"button"} href="#" onClick={() => onClickCategoryPage(elem)}>
                              {elem}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      )
                    })
                  }
                  <PaginationItem disabled={!hasNextPage(categoryPageNumber, categoryTotalPages, 5)}>
                    <PaginationLink tag={"button"} href="#">></PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={!hasNextPage(categoryPageNumber, categoryTotalPages, 5)}>
                    <PaginationLink tag={"button"} href="#">>></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </div>
            </div>
            <div>
              <h4 className={"text-center"}>수정</h4>
              <FormGroup>
                <ListGroupItem action={true} active={true} className={"mb-2"}>Dapibus ac facilisis
                  in</ListGroupItem>

                <InputGroup className={"mb-2"}>
                  <InputGroupText>한국 이름</InputGroupText>
                  <Input name={"name_kor"} placeholder={"바꿀 한국 이름 입력"} /*value={"원래 한국이름"}*//>
                  <InputGroupText>영어 이름</InputGroupText>
                  <Input name={"name"} placeholder={"바꿀 영어 이름 입력"} /*value = {"default eng name"}*//>
                </InputGroup>

                <div className={"d-flex justify-content-between"}>
                  <Button className={"button"}>삭제</Button>
                  <Button className={"submit bg-primary"} type={"submit"}>수정</Button>
                </div>
              </FormGroup>
            </div>
            <FormGroup>
              <h4 className={"text-center"}>추가</h4>
              <InputGroup className={"mb-2"}>
                <InputGroupText>한국 이름</InputGroupText>
                <Input name={"name_kor"} placeholder={"바꿀 한국 이름 입력"} /*value={"원래 한국이름"}*//>
                <InputGroupText>영어 이름</InputGroupText>
                <Input name={"name"} placeholder={"바꿀 영어 이름 입력"} /*value = {"default eng name"}*//>
              </InputGroup>

              <div className={"d-flex justify-content-end"}>
                <Button className={"submit bg-primary"} type={"submit"}>추가</Button>
              </div>
            </FormGroup>
          </div>
          <div className={"subcategory p-5 w-100"}>
            <InputGroup className={"pb-5"}>
              <InputGroupText>이름 검색</InputGroupText>
              <Input name={"category_cond"} type="text" placeholder={"서브카테고리 이름을 검색해주세요"}/>
              <Button className={"bg-primary"}>검색</Button>
            </InputGroup>
            <h3 className={"text-center"}>서브카테고리</h3>
            <div className={"pb-5"}>
              <ListGroup className={"pb-4"}>
                <ListGroupItem action active={false} tag="button">
                  Cras justo odio
                </ListGroupItem>
                <ListGroupItem action active={true} tag="button">
                  Dapibus ac facilisis in
                </ListGroupItem>
                <ListGroupItem action={true} tag="button">
                  Morbi leo risus
                </ListGroupItem>
                <ListGroupItem action={true} tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action={true} tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action={true} tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action={true} tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action={true} tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action={true} tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action={true} tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
              </ListGroup>

              <div className={"d-flex justify-content-center"}>
                <Pagination size={"sm"}>
                  <PaginationItem disabled>
                    <PaginationLink href="#" tag={"button"}>&lt;&lt;</PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled>
                    <PaginationLink tag={"button"} href="#">&lt;</PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag={"button"} href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag={"button"} href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled>
                    <PaginationLink tag={"button"} href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag={"button"} href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag={"button"} href="#">5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag={"button"} href="#">></PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag={"button"} href="#">>></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </div>
            </div>
            <div>
              <h4 className={"text-center"}>수정</h4>
              <FormGroup>
                <Input type={"select"} value={"null"} action={true} active={true}
                       className={"mb-2 bg-primary text-white"}>
                  <option value="1">카테고리1</option>
                  <option value="1">카테고리2</option>
                  <option value="1">카테고리3</option>
                </Input>
                <ListGroupItem action={true} active={true} className={"mb-2"}>Dapibus ac facilisis in</ListGroupItem>

                <InputGroup className={"mb-2"}>
                  <InputGroupText>한국 이름</InputGroupText>
                  <Input name={"name_kor"} placeholder={"바꿀 한국 이름 입력"} /*value={"원래 한국이름"}*//>
                  <InputGroupText>영어 이름</InputGroupText>
                  <Input name={"name"} placeholder={"바꿀 영어 이름 입력"} /*value = {"default eng name"}*//>
                </InputGroup>

                <div className={"d-flex justify-content-between"}>
                  <Button className={"button"}>삭제</Button>
                  <Button className={"submit bg-primary"} type={"submit"}>수정</Button>
                </div>
              </FormGroup>
            </div>
            <div>
              <h4 className={"text-center"}>추가</h4>
              <ListGroupItem action={true} active={true} className={"mb-2"}>Dapibus ac facilisis in</ListGroupItem>
              <FormGroup>
                <InputGroup className={"mb-2"}>
                  <InputGroupText>한국 이름</InputGroupText>
                  <Input name={"name_kor"} placeholder={"바꿀 한국 이름 입력"} /*value={"원래 한국이름"}*//>
                  <InputGroupText>영어 이름</InputGroupText>
                  <Input name={"name"} placeholder={"바꿀 영어 이름 입력"} /*value = {"default eng name"}*//>
                </InputGroup>

                <div className={"d-flex justify-content-end"}>
                  <Button className={"submit bg-primary"} type={"submit"}>추가</Button>
                </div>
              </FormGroup>
            </div>
          </div>
        </div>
      </Container>
    </>
  );


}

export default CategoryManage;