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
  const [subcategories, setSubcategories] = useState([]);

  //About Paging Category
  const [categoryPageSize, setCategoryPageSize] = useState(0);
  const [categoryTotalElements, setCategoryTotalElements] = useState(0);
  const [categoryTotalPages, setCategoryTotalPages] = useState(0);
  const [categoryNumberOfElements, setCategoryNumberOfElements] = useState(0);
  const [subcategoryPageNumber, setSubcategoryPageNumber] = useState(0);
  const [categoryPageNumber, setCategoryPageNumber] = useState(0);

  //About Paging Subcategory
  const [subcategoryPageSize, setSubcategoryPageSize] = useState(0);
  const [subcategoryTotalElements, setSubcategoryTotalElements] = useState(0);
  const [subcategoryTotalPages, setSubcategoryTotalPages] = useState(0);
  const [subcategoryNumberOfElements, setSubcategoryNumberOfElements] = useState(0);

  const [selectedSubcategory, setSelectedSubcategory] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [categorySearchCond, setCategorySearchCond] = useState(null);
  const [subcategorySearchCond, setSubcategorySearchCond] = useState(null);
  //controlled input
  const [categorySearchInput, setCategorySearchInput] = useState("");
  const [subcategorySearchInput, setSubcategorySearchInput] = useState("");

  const [categoryNameKorUpdateInput, setCategoryNameKorUpdateInput] = useState("");
  const [categoryNameUpdateInput, setCategoryNameUpdateInput] = useState("");
  const [subcategoryNameKorUpdateInput, setSubcategoryNameKorUpdateInput] = useState("");
  const [subcategoryNameUpdateInput, setSubcategoryNameUpdateInput] = useState("");
  const [categoryNameAddInput, setCategoryNameAddInput] = useState("");
  const [categoryNameKorAddInput, setCategoryNameKorAddInput] = useState("");
  const [subcategoryNameAddInput, setSubcategoryNameAddInput] = useState("");
  const [subcategoryNameKorAddInput, setSubcategoryNameKorAddInput] = useState("");
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);
  const [isSubcategoryUpdated, setIsSubcategoryUpdated] = useState(false);

  //Contollred input : Edit category
  const [categoryNameInput, setCategoryNameInput] = useState("");
  const [categoryNameKorInput, setCategoryNameKorInput] = useState("");
  //Contollred input : add category
  const [subcategoryNameInput, setSubcategoryNameInput] = useState("");
  const [subcategoryNameKorInput, setSubcategoryNameKorInput] = useState("");


  const onChangeSubcategoryInput = (event) => {
    const value = event.currentTarget.value;
    setSubcategorySearchInput(value);
  }

  const onSubmitSubcategorySearchName = (event) => {
    event.preventDefault();
    let path = `/admin/subcategories?size=10&page=${0}`;
    if (selectedCategory !== -1) {
      path += `&categoryId=${selectedCategory}`
    }
    if (!subcategorySearchInput && !subcategorySearchCond) {
      return;
    }
    path += `&searchName=${subcategorySearchInput}`;
    fetch(path, {method: "get"})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(resp => {
        const {data, error, message} = resp;
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setSubcategories(content);
        setSubcategoryPageSize(size);
        setSubcategoryTotalElements(totalElements);
        setSubcategoryTotalPages(totalPages);
        setSubcategoryNumberOfElements(number);
        setSubcategoryPageNumber(number);
        setSubcategorySearchCond(subcategorySearchInput);
        setSelectedSubcategory(-1);
      });
    setIsLoaded(true);
  }
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
        setCategoryPageSize(size);
        setCategoryTotalElements(totalElements);
        setCategoryTotalPages(totalPages);
        setCategoryNumberOfElements(number);
        setCategoryPageNumber(number);
      });
    setIsLoaded(true);

    fetch("/admin/subcategories?size=10&page=0", {method: "get"})
      .then((response) => {
        if (response.status !== response.ok) {
          console.error("response status is not 200")
        }
        return response.json();
      }).then(json => {
      const {data, error, message} = json;
      const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
      setSubcategories(content);
      setSubcategoryPageSize(size);
      setSubcategoryTotalElements(totalElements);
      setSubcategoryTotalPages(totalPages);
      setSubcategoryNumberOfElements(number);
      setSubcategoryPageNumber(number);
    });
  }, [categories]);


  //check State on Develope process
  useEffect(() => {
  })

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
        setCategoryPageSize(size);
        setCategoryTotalElements(totalElements);
        setCategoryTotalPages(totalPages);
        setCategoryNumberOfElements(number);
        setSubcategoryPageNumber(number);
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
      setSubcategories([]);
      setSubcategoryPageSize(0);
      setSubcategoryTotalElements(0);
      setSubcategoryTotalPages(0);
      setSubcategoryNumberOfElements(0);
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
      setSubcategories(content);
      setSubcategoryPageSize(size);
      setSubcategoryTotalElements(totalElements);
      setSubcategoryTotalPages(totalPages);
      setSubcategoryNumberOfElements(number);
      setSubcategoryPageNumber(number);
    });
  }, [selectedCategory]);
  /*
  @PutMapping("/category/create")
    public ResponseEntity createCategory(@Validated CreateCategoryRequest request) {
        return categoryCRUDService.createCategory(request);
    }
   */
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

  const onClickSubCategoryItem = (event) => {
    event.preventDefault();
    const subcategoryId = event.currentTarget.getAttribute("subcategory_id");
    if (subcategoryId === selectedSubcategory) {
      setSelectedSubcategory(-1);
      return;
    }
    setSelectedSubcategory(subcategoryId);
  }

  const onClickSubCategoryPage = (pageNumber) => {
    let requestPath = `/admin/subcategories?size=10&page=${pageNumber - 1}`;
    if (subcategorySearchCond !== null && subcategorySearchCond !== undefined && subcategorySearchCond) {
      requestPath += `&searchName=${subcategorySearchCond}`;
    }
    if (selectedCategory) {
      requestPath += `&categoryId=${selectedCategory}`;
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
        setSubcategories(content);
        setSubcategoryPageSize(size);
        setSubcategoryTotalElements(totalElements);
        setSubcategoryTotalPages(totalPages);
        setSubcategoryNumberOfElements(number);
        setSubcategoryPageNumber(number);
      });
  }

  const onClickSubCategoryPreviousPage = (pageNumber) => {
    const previous = (Math.floor(pageNumber / 5) - 1) * 5 + 1;
    onClickSubCategoryPage(previous);
  }

  const onClickSubCategoryFirstPage = () => {
    onClickSubCategoryPage(1);
  }

  const onClickSubCategoryNextPage = (pageNumber) => {
    onClickSubCategoryPage(Math.floor(pageNumber / 5) * 5 + 5 + 1);
  }

  const onClickSubCategoryLastPage = () => {
    onClickSubCategoryPage(subcategoryTotalPages);
  }

  //
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


  const onChangeSubcategoryNameKorUpdateInput = (event) => {
    const value = event.currentTarget.value;
    setSubcategoryNameKorUpdateInput(value);
  }

  const onChangeSubcategoryNameUpdateInput = (event) => {
    const value = event.currentTarget.value;
    setSubcategoryNameUpdateInput(value);
  }

  const onChangeCategoryNameAddInput = (event) => {
    const value = event.currentTarget.value;
    setCategoryNameAddInput(value);
  }

  const onChangeCategoryNameKorAddInput = (event) => {
    const value = event.currentTarget.value;
    setCategoryNameKorAddInput(value);
  }

  const onChangeSubcategoryNameKorAddInput = (event) => {
    const value = event.currentTarget.value;
    setSubcategoryNameKorAddInput(value);
  }

  const onChangeSubcategoryNameAddInput = (event) => {
    const value = event.currentTarget.value;
    setSubcategoryNameAddInput(value);
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

  const onSubmitSubcategoryAdd = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("name", subcategoryNameAddInput);
    formData.append("nameKor", subcategoryNameKorAddInput);
    formData.append("categoryId", selectedCategory);

    fetch("/admin/subcategory/create", {method: "put", body: formData})
      .then(resp => {
            setIsSubcategoryUpdated(true);
        }
      )
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

    console.log(path);
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(json => {
        const {data, error, message} = json;
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setCategories(content);
        setCategoryPageSize(size);
        setCategoryTotalElements(totalElements);
        setCategoryTotalPages(totalPages);
        setCategoryNumberOfElements(number);
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
    console.log(path);
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(json => {
        const {data, error, message} = json;
        const {content, empty, number, numberOfElements, size, totalElements, totalPages} = data;
        setSubcategories(content);
        setSubcategoryPageSize(size);
        setSubcategoryTotalElements(totalElements);
        setSubcategoryTotalPages(totalPages);
        setSubcategoryNumberOfElements(number);
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
              <h4 className={"text-center"}>수정</h4>
              <Form onSubmit={onSubmitCategoryEdit}>
                {
                  selectedCategory === -1 ?
                    <ListGroupItem action={true} active={true} className={"mb-2"}>
                      카테고리를 선택해주세요z
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

          <div className={"subcategory p-5 w-100"}>
            <Form onSubmit={onSubmitSubcategorySearchName}>
              <InputGroup className={"pb-5"}>
                <InputGroupText>이름 검색</InputGroupText>
                <Input name={"subcategory_cond"} type="text" placeholder={"서브카테고리 이름을 검색해주세요"}
                       onChange={onChangeSubcategoryInput} value={subcategorySearchInput}/>
                <Button className={"bg-primary"}>검색</Button>
              </InputGroup>
            </Form>

            <h3 className={"text-center"}>서브카테고리</h3>

            <div className={"pb-5"}>
              <ListGroup className={"pb-4"}>
                {
                  subcategories.map((elem, index) => {
                    return (
                      <ListGroupItem active={isActiveList(elem.subcategoryId, selectedSubcategory)} tag="button"
                                     category_id={elem.categoryId} subcategory_id={elem.subcategoryId}
                                     onClick={onClickSubCategoryItem}>
                        {elem.nameKor} ({elem.name})
                      </ListGroupItem>
                    )
                  })
                }
              </ListGroup>

              <div className={"d-flex justify-content-center"}>
                <Pagination size={"sm"}>
                  <PaginationItem disabled={togglePrevPage(subcategoryPageNumber, subcategoryTotalPages, 5)}>
                    <PaginationLink href="#" tag={"button"}
                                    onClick={() => onClickSubCategoryFirstPage()}>&lt;&lt;</PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={togglePrevPage(subcategoryPageNumber, subcategoryTotalPages, 5)}>
                    <PaginationLink tag={"button"} href="#"
                                    onClick={() => onClickSubCategoryPreviousPage(subcategoryPageNumber)}>&lt;</PaginationLink>
                  </PaginationItem>
                  {
                    makePageArray(subcategoryPageNumber, 5).map((elem, index) => {
                      return (
                        <PaginationItem active={pageActive(elem, subcategoryPageNumber)}
                                        disabled={isDisablePage(elem, subcategoryTotalPages)} key={elem.toString()}>
                          <PaginationLink tag={"button"} href="#"
                                          onClick={() => onClickSubCategoryPage(elem)}>{elem}</PaginationLink>
                        </PaginationItem>
                      )
                    })
                  }
                  <PaginationItem disabled={!hasNextPage(subcategoryPageNumber, subcategoryTotalPages, 5)}>
                    <PaginationLink tag={"button"} href="#"
                                    onClick={() => onClickSubCategoryNextPage(subcategoryPageNumber)}>></PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={!hasNextPage(subcategoryPageNumber, subcategoryTotalPages, 5)}>
                    <PaginationLink tag={"button"} href="#"
                                    onClick={() => onClickSubCategoryLastPage()}>>></PaginationLink>
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


                {
                  selectedSubcategory !== -1 ? (
                    subcategories.filter(elem => elem.subcategoryId == selectedSubcategory).map((elem => {
                      return (
                        <ListGroupItem action={true} active={true} className={"mb-2"}
                                       subcategory_id={elem.subcategoryId} category_id={elem.categoryId}>
                          {elem.nameKor} ({elem.name})
                        </ListGroupItem>
                      )
                    }))
                  ) : (
                    <ListGroupItem action={true} active={true} className={"mb-2"}>
                      서브카테고리를 선택해주세요
                    </ListGroupItem>
                  )
                }
                <Form>
                  <InputGroup className={"mb-2"}>
                    <InputGroupText>한국 이름</InputGroupText>
                    <Input name={"name_kor"} placeholder={"바꿀 한국 이름 입력"}
                           onChange={onChangeSubcategoryNameKorUpdateInput} value={subcategoryNameKorUpdateInput}/>
                    <InputGroupText>영어 이름</InputGroupText>
                    <Input name={"name"} placeholder={"바꿀 영어 이름 입력"} onChange={onChangeSubcategoryNameUpdateInput}
                           value={subcategoryNameUpdateInput}/>
                  </InputGroup>

                  <div className={"d-flex justify-content-between"}>
                    <Button className={"button"}>삭제</Button>
                    <Button className={"submit bg-primary"} type={"submit"}>수정</Button>
                  </div>
                </Form>

              </FormGroup>
            </div>
            <div>
              <h4 className={"text-center"}>추가</h4>
              {
                selectedCategory !== -1 ? (
                  categories.filter(elem => elem.id == selectedCategory).map((elem, idx) => {
                    return (
                      <ListGroupItem action={true} active={true} className={"mb-2"}>선택된
                        카테고리: {elem.nameKor} (elem.name)</ListGroupItem>
                    )
                  })
                ) : (
                  <ListGroupItem action={true} active={true} className={"mb-2"}>카테고리를 선택해주세요</ListGroupItem>
                )
              }
              <Form onSubmit={onSubmitSubcategoryAdd}>
                <InputGroup className={"mb-2"}>
                  <InputGroupText>한국 이름</InputGroupText>
                  <Input name={"name_kor"} placeholder={"바꿀 한국 이름 입력"} onChange={onChangeSubcategoryNameKorAddInput}
                         value={subcategoryNameKorAddInput}/>
                  <InputGroupText>영어 이름</InputGroupText>
                  <Input name={"name"} placeholder={"바꿀 영어 이름 입력"} onChange={onChangeSubcategoryNameAddInput}
                         value={subcategoryNameAddInput}/>
                </InputGroup>
                <div className={"d-flex justify-content-end"}>
                  <Button className={"submit bg-primary"} type={"submit"}>추가</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );


}

export default CategoryManage;