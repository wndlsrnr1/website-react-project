import {
  Button,
  Container, Form,
  FormGroup,
  Input,
  InputGroup,
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
  const totalPageGroup = Math.floor((totalPage - 1) / pagePerChunk);
  return thisPageGroup < totalPageGroup;
}

const makePageArray = (presentPageNumber, pagePerChunk) => {
  const start = Math.floor(presentPageNumber / pagePerChunk) * pagePerChunk;
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

  const [categoryTotalPages, setCategoryTotalPages] = useState(0);
  const [subcategoryPageNumber, setSubcategoryPageNumber] = useState(0);
  const [categoryPageNumber, setCategoryPageNumber] = useState(0);

  //About Paging Subcategory
  const [subcategoryTotalPages, setSubcategoryTotalPages] = useState(0);

  const [selectedSubcategory, setSelectedSubcategory] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [categorySearchCond, setCategorySearchCond] = useState(null);
  const [subcategorySearchCond, setSubcategorySearchCond] = useState(null);
  //controlled input
  const [categorySearchInput, setCategorySearchInput] = useState("");

  const [categoryNameKorUpdateInput, setCategoryNameKorUpdateInput] = useState("");
  const [categoryNameUpdateInput, setCategoryNameUpdateInput] = useState("");
  const [categoryNameAddInput, setCategoryNameAddInput] = useState("");
  const [categoryNameKorAddInput, setCategoryNameKorAddInput] = useState("");
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);
  const [isSubcategoryUpdated, setIsSubcategoryUpdated] = useState(false);




  //loaded first
  useEffect(() => {
    if (isLoaded) {
      return;
    }
    fetch("/admin/categories?size=10&page=" + 0, {method: "get"})
      .then((response) => {
        if (response.status !== response.ok) {
          console.error("response status is not 200")
        }
        return response.json();
      })
      .then(resp => {
        const {data, error, message} = resp;
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setCategories(content);
        setCategoryTotalPages(totalPages);
        setCategoryPageNumber(number);
      });
    setIsLoaded(true);
  }, [categories]);


  //clear state
  const clearSelectedAfterSearch = () => {
    setSelectedCategory(-1);
  };

  //
  const onChangeCategoryInput = (event) => {
    const categorySearchInput = event.currentTarget.value;
    setCategorySearchInput(categorySearchInput);
  }

  const onSubmitCategorySearchName = (event) => {
    event.preventDefault();
    let path = `/admin/categories?size=10&page=${0}`;
    if (categorySearchInput) {
      path += `&searchName=${categorySearchInput}`;
    }

    if (!categorySearchInput && !categorySearchCond) {
      return;
    }
    fetch(path, {method: "get"})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(resp => {
        const {data, error, message} = resp;
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setCategories(content);
        setCategoryTotalPages(totalPages);
        setCategoryPageNumber(number);
        setCategorySearchCond(categorySearchInput);
      });
    setIsLoaded(true);
    clearSelectedAfterSearch();
  }

  const onClickDeleteCategorySelected = () => {
    fetch(`/admin/category/delete/${selectedCategory}`, {method: "delete"})
      .then(resp => {
        if (resp.ok) {
          setIsCategoryUpdated(true);
          clearSelectedAfterSearch();
        } else {

        }
      });
  }

  useEffect(() => {
    let path = "/admin/subcategories?size=10&page=0";
    if (selectedCategory === -1) {
      setSubcategoryTotalPages(0);
      setSubcategoryPageNumber(0);
      return;
    } else {
      path += "&categoryId=" + selectedCategory;
    }
    fetch(path, {method: "get"})
      .then((response) => {
        if (response.status !== response.ok) {
          console.error("response status is not 200")
        }
        return response.json();
      }).then(json => {
      const {data, error, message} = json;
      const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
      setSubcategoryTotalPages(totalPages);
      setSubcategoryPageNumber(number);
    });
  }, [selectedCategory]);


  const onSubmitCategoryAdd = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("name", categoryNameAddInput);
    formData.append("nameKor", categoryNameKorAddInput)
    fetch(`/admin/category/create`, {method: "put", body: formData})
      .then(resp => {
        if (resp.status === 201) {
          setIsCategoryUpdated(true);
          setCategoryNameAddInput("");
          setCategoryNameKorAddInput("");
        }
      });
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
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setCategories(content);
        setCategoryTotalPages(totalPages);
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

  const onClickCategoryPreviousPage = (pageNumber) => {
    const previous = (Math.floor(pageNumber / 5) - 1) * 5 + 1;
    onClickCategoryPage(previous);
  }

  const onClickCategoryFirstPage = () => {
    onClickCategoryPage(1);
  }

  const onClickCategoryNextPage = (pageNumber) => {
    onClickCategoryPage(Math.floor(pageNumber / 5) * 5 + 5 + 1);
  }

  const onClickCategoryLastPage = () => {
    onClickCategoryPage(categoryTotalPages);
  }

  const onChangeCategoryNameKorUpdateInput = (event) => {
    const value = event.currentTarget.value;
    setCategoryNameKorUpdateInput(value);
  }

  const onChangeCategoryNameUpdateInput = (event) => {
    const value = event.currentTarget.value;
    setCategoryNameUpdateInput(value);
  }


  const onChangeCategoryNameAddInput = (event) => {
    const value = event.currentTarget.value;
    setCategoryNameAddInput(value);
  }

  const onChangeCategoryNameKorAddInput = (event) => {
    const value = event.currentTarget.value;
    setCategoryNameKorAddInput(value);
  }



  const onSubmitCategoryEdit = (event) => {
    event.preventDefault();
    let d = new FormData();
    d.append("name", categoryNameUpdateInput);
    d.append("nameKor", categoryNameKorUpdateInput);
    d.append("categoryId", selectedCategory);

    fetch("/admin/categories/update", {method: "post", body: d})
      .then(resp => resp.json())
      .then(data => {
        setIsCategoryUpdated(true);
      })
  }


  //카테고리 수정 삭제시 리로드
  useEffect(() => {
    if (isCategoryUpdated === false) {
      return;
    }

    let path = `/admin/categories?size=10`;
    if (!subcategoryPageNumber && subcategoryPageNumber !== null) {
      path += `&page=${subcategoryPageNumber}`
    } else {
      path += `&page=0`;
    }
    if (!categorySearchCond && categorySearchCond !== null) {
      path += `&searchName=${categorySearchCond}`
    }

    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(json => {
        const {data, error, message} = json;
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setCategories(content);
        setCategoryTotalPages(totalPages);
        setSubcategoryPageNumber(number);
        setIsCategoryUpdated(false);
      });
  }, [isCategoryUpdated])


  //reroad
  useEffect(() => {
    if (isSubcategoryUpdated === false) {
      return;
    }
    let path = `/admin/subcategories?size=10`;
    if (subcategoryPageNumber !== null) {
      path += `&page=${subcategoryPageNumber}`
    } else {
      path += `&page=0`;
    }
    if (subcategorySearchCond !== null && subcategorySearchCond) {
      path += `&searchName=${subcategorySearchCond}`
    }
    if (selectedCategory) {
      path += `&categoryId=${selectedCategory}`
    }
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(json => {
        const {data, error, message} = json;
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setSubcategoryTotalPages(totalPages);
        setSubcategoryPageNumber(number);
        setIsSubcategoryUpdated(false);
      });
  }, [isSubcategoryUpdated])


  return (
    <>
      <Container className={"mt-5"}>
        <h3 className={"text-center p-2"}>카테고리 관리</h3>
        <div className={"d-flex justify-content-around"}>
          <div className={"category p-5 w-100"}>
            <Form onSubmit={onSubmitCategorySearchName}>
              <InputGroup className={"pb-5"}>
                <InputGroupText>카테고리 이름 검색</InputGroupText>
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
                        <ListGroupItem active={isActiveList(elem.id, selectedCategory)} tag="button"
                                       category_id={elem.id} onClick={onClickCategoryItem}>
                          [{elem.nameKor}][{elem.name}]
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
                    <PaginationLink href="#" tag={"button"}
                                    onClick={() => onClickCategoryFirstPage(categoryPageNumber)}>&lt;&lt;</PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={togglePrevPage(categoryPageNumber, categoryTotalPages, 5)}>
                    <PaginationLink tag={"button"} href="#"
                                    onClick={() => onClickCategoryPreviousPage(categoryPageNumber)}>&lt;</PaginationLink>
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
                    <PaginationLink tag={"button"} href="#"
                                    onClick={() => onClickCategoryNextPage(categoryPageNumber)}>></PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={!hasNextPage(categoryPageNumber, categoryTotalPages, 5)}>
                    <PaginationLink tag={"button"} href="#"
                                    onClick={() => onClickCategoryLastPage(categoryPageNumber)}>>></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </div>
            </div>
            <div>
              {/*-------------------------update-------------------------------------------*/}
              <hr/>
              <h4 className={"text-center"}>수정</h4>
              <Form onSubmit={onSubmitCategoryEdit}>
                {
                  selectedCategory === -1 ?
                    <ListGroupItem action={true} active={true} className={"mb-2"}>
                      카테고리를 선택해주세요
                    </ListGroupItem> :
                    categories.filter((elem) => parseInt(elem.id) === parseInt(selectedCategory)).map((elem) => {
                      return (
                        <ListGroupItem category_id={elem.id} action={true} active={true} className={"mb-2"}>
                          선택된 카테고리: {elem.nameKor} ({elem.name}) ({elem.id})
                        </ListGroupItem>
                      )
                    })}
                {
                  selectedCategory !== -1 ? (
                      categories.filter((elem) => parseInt(elem.id) === parseInt(selectedCategory)).map((elem) => {
                        return (
                          <InputGroup className={"mb-2"}>
                            <InputGroupText>한국 이름</InputGroupText>
                            <Input name={"nameKor"} placeholder={"바꿀 한국 이름 입력"} value={categoryNameKorUpdateInput}
                                   onChange={onChangeCategoryNameKorUpdateInput}/>
                            <InputGroupText>영어 이름</InputGroupText>
                            <Input name={"name"} placeholder={"바꿀 영어 이름 입력"} value={categoryNameUpdateInput}
                                   onChange={onChangeCategoryNameUpdateInput}/>
                          </InputGroup>
                        )
                      })
                    ) :
                    (
                      <InputGroup className={"mb-2"}>
                        <InputGroupText>한국 이름</InputGroupText>
                        <Input name={"name_kor"} placeholder={"바꿀 한국 이름 입력"} /*value={"원래 한국이름"}*//>
                        <InputGroupText>영어 이름</InputGroupText>
                        <Input name={"name"} placeholder={"바꿀 영어 이름 입력"} /*value = {"default eng name"}*//>
                      </InputGroup>
                    )
                }


                <div className={"d-flex justify-content-between"}>
                  <Button className={"button"} onClick={() => onClickDeleteCategorySelected()}>삭제</Button>
                  <Button className={"submit bg-primary"} type={"submit"}>수정</Button>
                </div>
              </Form>
            </div>
            <hr/>
            <Form onSubmit={onSubmitCategoryAdd}>
              <h4 className={"text-center"}>카테고리 추가</h4>
              <InputGroup className={"mb-2"}>
                <InputGroupText>한국 이름</InputGroupText>
                <Input name={"name_kor"} placeholder={"바꿀 한국 이름 입력"} onChange={onChangeCategoryNameKorAddInput}
                       value={categoryNameKorAddInput}/>
                <InputGroupText>영어 이름</InputGroupText>
                <Input name={"name"} placeholder={"바꿀 영어 이름 입력"} onChange={onChangeCategoryNameAddInput}
                       value={categoryNameAddInput}/>
              </InputGroup>

              <div className={"d-flex justify-content-end"}>
                <Button className={"submit bg-primary"} type={"submit"}>추가</Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );


}

export default CategoryManage;