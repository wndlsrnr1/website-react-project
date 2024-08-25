import {
  Button,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";
import {useEffect, useRef, useState} from "react";
import Paging from "../../common/Paging";
import {fetchWithAuth} from "../../utils/fetchUtils";

const isActive = (targetId, currentId) => {
  return parseInt(targetId) === parseInt(currentId);
}

const getParamOption = (key, value) => {
  const result = {};
  result[key] = value;
  return result;
}

const getValueFromArray = (array, id, paramName) => {
  if (!array || array.length === 0 || id === -1) {
    return "";
  }
  return array.filter((elem, index) => elem.id == id)?.[0]?.[paramName];
}

const getValueFromArraySub = (array, id, paramName) => {
  if (!array || array.length === 0 || id === -1) {
    return "";
  }
  return array.filter((elem, index) => elem.subcategoryId === id)?.[0]?.[paramName];
}

const SubcategoryManage = () => {
  //같은 경로로 보내는 request는 한 곳에만 작성하기
  //Variable
  const [loaded, setLoaded] = useState(false);
  //subcategory
  const [subCategorySearchInput, setSubCategorySearchInput] = useState("");
  const [subcategorySearchInputCond, setSubcategorySearchInputCond] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [content, setContent] = useState(0);
  const [size, setSize] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [number, setNumber] = useState(0);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(-1);
  const pageGroupSize = 5;
  const pageSize = 10;
  const [errorCategory, setErrorCategory] = useState({});

  //category
  const [categorySearchInput, setCategorySearchInput] = useState("");
  const [categorySearchInputCond, setCategorySearchInputCond] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const [size2, setSize2] = useState(0);
  const [totalElements2, setTotalElements2] = useState(0);
  const [totalPages2, setTotalPages2] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [numberOfElements2, setNumberOfElements2] = useState(0);
  const [errorSubCategory, setErrorSubCategory] = useState({});
  const [categoryInputEdit, setCategoryInputEdit] = useState(-1);
  const [categoryInputNameEdit, setCategoryInputNameEdit] = useState("");
  const [categoryInputNameKorEdit, setCategoryInputNameKorEdit] = useState("");

  const [categoryInputAdd, setCategoryInputAdd] = useState(-1);
  const [categoryInputNameAdd, setCategoryInputNameAdd] = useState("");
  const [categoryInputNameKorAdd, setCategoryInputNameKorAdd] = useState("");
  //submit
  const [nameKorInputSubcategoryEdit, setNameKorInputSubcategoryEdit] = useState("");
  const [nameInputSubcategoryEdit, setNameInputSubcategoryEdit] = useState("");

  const [nameKorInputSubcategoryAdd, setNameKorInputSubcategoryAdd] = useState("");
  const [nameInputSubcategoryAdd, setNameInputSubcategoryAdd] = useState("");

  const [updatePage, setUpdatePage] = useState(false);

  //Request
  const requestSubcategory = (path) => {
    fetchWithAuth(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        const datum = data.data;
        const {content, size, totalElements, totalPages, number, numberOfElements} = datum;
        setSubcategories(content);
        setSize(size);
        setTotalElements(totalElements);
        setTotalPages(totalPages);
        setNumber(number);
        setNumberOfElements(numberOfElements);
      });
  }

  const requestCategory = (path) => {
    fetchWithAuth(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        const datum = data.data;
        const {content, size, totalElements, totalPages, number, numberOfElements} = datum;
        setCategories(content);
        setSize2(size);
        setTotalElements2(totalElements);
        setTotalPages2(totalPages);
        setNumber2(number);
        setNumberOfElements2(numberOfElements);
      });
  }

  const requestCategoryById = (path, categoryId) => {
    if (!categoryId) {
      return;
    }
    fetchWithAuth(path + "/" + categoryId)
      .then(resp => resp.json())
      .then(data => {
        const {id, name, nameKor} = data.data;
        setCategoryInputNameAdd(name);
        setCategoryInputNameEdit(name);

        setCategoryInputNameKorAdd(nameKor);
        setCategoryInputNameKorEdit(nameKor);

        setCategoryInputEdit(id);
        setCategoryInputAdd(id);
      });
  }

  const requestSubcategoryEdit = (formData, path) => {
    fetchWithAuth(path, {method: "post", body: formData})
      .then(resp => resp.json())
      .then(data => {
        setUpdatePage(true);
      });
  }

  const requestSubcategoryDelete = (path, subcategoryId) => {
    fetchWithAuth(path + "/" + subcategoryId, {method: "delete"})
      .then(resp => resp.json())
      .then((data) => {
        setUpdatePage(true);
      });
  }

  const requestSubcategoryAdd = (formData, path) => {
    fetchWithAuth(path, {method: "put", body: formData})
      .then((resp) => setUpdatePage(true));
  }

  //Effects
  useEffect(() => {
    if (loaded) {
      return;
    }
    const path = "/admin/subcategories?page=0&size=10"
    requestSubcategory(path);
    const path2 = "/admin/categories?page=0&size=10"
    requestCategory(path2);
  }, [loaded])

  useEffect(() => {
    setSelectedCategoryId(-1);
  }, [selectedSubcategoryId])

  //category request
  // useEffect(() => {
  //   setSelectedSubcategoryId(-1);
  // }, [subcategorySearchInputCond])
  //
  // useEffect(() => {
  //   setSelectedCategoryId(-1);
  // }, [categorySearchInputCond]);

  useEffect(() => {
    setNameKorInputSubcategoryEdit(getValueFromArraySub(subcategories, selectedSubcategoryId, "nameKor"));
    setNameInputSubcategoryEdit(getValueFromArraySub(subcategories, selectedSubcategoryId, "name"));
    const categoryId = parseInt(getValueFromArraySub(subcategories, selectedSubcategoryId, "categoryId"));
    requestCategoryById("/admin/category", categoryId);
  }, [selectedSubcategoryId]);

  useEffect(() => {
    if (updatePage === false) {
      return;
    }

    let categoryPath = `/admin/categories?size=${pageSize}`;
    if (number) {
      categoryPath += `&page=${number2}`
    } else {
      categoryPath += `&page=0`;
    }
    if (subcategorySearchInputCond) {
      categoryPath += `&searchName=${categorySearchInputCond}`
    }
    requestCategory(categoryPath);

    let subcategoryPath = `/admin/subcategories?size=${pageSize}`;
    if (number2) {
      subcategoryPath += `&page=${number}`
    } else {
      subcategoryPath += `&page=0`;
    }
    if (subcategorySearchInputCond) {
      subcategoryPath += `&searchName=${subcategorySearchInputCond}`
    }
    requestSubcategory(subcategoryPath);

    setUpdatePage(false);
  }, [updatePage])


  //Submit
  const searchSubcategoryByOnSubmit = (event) => {
    event.preventDefault();
    setSubcategorySearchInputCond(subCategorySearchInput);
    if (subCategorySearchInput == null || subcategorySearchInputCond === subCategorySearchInput) {
      return;
    }
    let path = `/admin/subcategories?page=0&size=10`
    if (subCategorySearchInput !== "") {
      path += `&searchName=${subCategorySearchInput}`;
    }
    requestSubcategory(path);
  }

  const searchCategoryByOnSubmit = (event) => {
    event.preventDefault();
    setCategorySearchInput(categorySearchInput);
    if (categorySearchInput == null || categorySearchInputCond === categorySearchInput) {
      return;
    }
    let path = `/admin/categories?page=0&size=10`
    if (categorySearchInput !== "") {
      path += `&searchName=${categorySearchInput}`
    }
    requestCategory(path);
  }

  const onSubmitSubcategoryEditForm = (event) => {
    event.preventDefault();
    let form = new FormData();
    const categoryId = selectedCategoryId !== -1 ? selectedCategoryId : categoryInputAdd;
    form.append("categoryId", categoryId);
    form.append("subcategoryId", selectedSubcategoryId);
    form.append("name", nameInputSubcategoryEdit);
    form.append("nameKor", nameKorInputSubcategoryEdit);
    requestSubcategoryEdit(form, "/admin/subcategory/update");
  }

  const onSubmitSubcategoryAddForm = (event) => {
    event.preventDefault();
    let formData = new FormData();
    if (selectedCategoryId === -1) {
      return;
    }
    console.log("??")
    formData.append("categoryId", selectedCategoryId);
    formData.append("name", nameInputSubcategoryAdd)
    formData.append("nameKor", nameKorInputSubcategoryAdd);
    console.log("????????????")
    requestSubcategoryAdd(formData, "/admin/subcategory/create");
  }

  //onClick
  const selectSubcategoryOnClick = (subcategoryId, currentSubcategoryId) => {
    if (subcategoryId === currentSubcategoryId) {
      setSelectedSubcategoryId(-1);
      return;
    }
    setSelectedSubcategoryId(subcategoryId);
  }

  const selectCategoryOnClick = (categoryId, currentCategoryId) => {
    if (categoryId === currentCategoryId) {
      setSelectedCategoryId(-1);
      return;
    }
    setSelectedCategoryId(categoryId);
  }

  const onClickSubcategoryDelete = (event) => {
    if (selectedSubcategoryId === -1) {
      return;
    }
    const path = `/admin/subcategory/delete`;
    console.log(path);
    requestSubcategoryDelete(path, selectedSubcategoryId);
    setSelectedSubcategoryId(-1);
  }

  //onChange
  const onChangeSubcategoryInput = (event) => {
    const value = event.currentTarget.value;
    setSubCategorySearchInput(value);
  }

  const onChangeCategoryInput = (event) => {
    const value = event.currentTarget.value;
    setCategorySearchInput(value);
  }

  const onChangeNameKorInputSubcategoryEdit = (event) => {
    const value = event.currentTarget.value;
    setNameKorInputSubcategoryEdit(value);
  }

  const onChangeNameInputSubcategoryEdit = (event) => {
    const value = event.currentTarget.value;
    setNameInputSubcategoryEdit(value);
  }

  const onChangeNameKorInputSubcategoryAdd = (event) => {
    const value = event.currentTarget.value;
    setNameKorInputSubcategoryAdd(value);
  }

  const onChangeNameInputSubcategoryAdd = (event) => {
    const value = event.currentTarget.value;
    setNameInputSubcategoryAdd(value);
  }

  return (
    <>
      <Container className={"mt-5"}>
        <h2 className={"text-center p-5"}>서브 카테고리 관리</h2>
        <Row className={"d-flex justify-content-around"}>
          <Col>
            <h4>서브 카테고리 선택</h4>
            <div>
              <Form onSubmit={searchSubcategoryByOnSubmit}>
                <InputGroup className={"pb-5"}>
                  <InputGroupText>서브카테고리 이름 검색</InputGroupText>
                  <Input name={"subcategory_cond"} type="text" placeholder={"카테고리 이름을 검색해주세요"}
                         onChange={onChangeSubcategoryInput} value={subCategorySearchInput}/>
                  <Button type={"submit"} className={"bg-primary"}>검색</Button>
                </InputGroup>
              </Form>
            </div>
            <div>
              <ListGroup className={"pb-4"}>
                {
                  subcategories.length !== 0 ? subcategories.map((subcategory, index) => {
                    return (
                      <ListGroupItem active={isActive(subcategory.subcategoryId, selectedSubcategoryId)} tag={"button"}
                                     subcategory_id={"123"}
                                     onClick={() => selectSubcategoryOnClick(subcategory.subcategoryId, selectedSubcategoryId)}>
                        카테고리 ({subcategory.categoryId}) 서브카테고리
                        ({subcategory.subcategoryId}, {subcategory.name}, {subcategory.nameKor})
                      </ListGroupItem>
                    )
                  }) : (
                    <ListGroupItem>
                      찾는 서브카테고리가 없습니다
                    </ListGroupItem>
                  )
                }
              </ListGroup>
            </div>
            <div>
              {
                subcategories.length !== 0 ? (
                  <Paging pageGroupSize={pageGroupSize} pageSize={pageSize} pageNumber={number} totalPages={totalPages}
                          requestDomain={"/admin/subcategories"} requestMethod={requestSubcategory}
                          parameterOption={getParamOption("searchName", subcategorySearchInputCond)}>

                  </Paging>
                ) : null
              }

            </div>
          </Col>
          <Col>
            <h4>카테고리 선택</h4>
            <div>
              <Form onSubmit={searchCategoryByOnSubmit}>
                <InputGroup className={"pb-5"}>
                  <InputGroupText>카테고리 이름 검색</InputGroupText>
                  <Input name={"category_cond"} type="text" placeholder={"카테고리 이름을 검색해주세요"}
                         onChange={onChangeCategoryInput} value={categorySearchInput}/>
                  <Button type={"submit"} className={"bg-primary"}>검색</Button>
                </InputGroup>
              </Form>
            </div>
            <div>
              <ListGroup className={"pb-4"}>
                {
                  categories.length !== 0 ? categories.map((category, index) => {
                    return (
                      <ListGroupItem active={isActive(category.id, selectedCategoryId)} tag={"button"}
                                     category_id={category.id}
                                     onClick={() => selectCategoryOnClick(category.id, selectedCategoryId)}>
                        아이디: ({category.id}) 이름: {category.nameKor} 영문이름:{category.name}
                      </ListGroupItem>
                    )
                  }) : (
                    <ListGroupItem>
                      찾는 서브카테고리가 없습니다
                    </ListGroupItem>
                  )
                }
              </ListGroup>
            </div>
            <div>
              <Paging pageGroupSize={pageGroupSize} pageSize={pageSize}
                      pageNumber={number2} totalPages={totalPages2}
                      requestDomain={"/admin/categories"} requestMethod={requestCategory}
                      parameterOption={getParamOption("searchName", categorySearchInputCond)}/>
            </div>
          </Col>
        </Row>


        <div className={"subcategory p-5 w-100"}>

          <hr/>
          <div className={"d-flex justify-content-evenly"}>
            <div className={"flex-grow-1 subcategory-edit pe-5"}>
              <h4 className={"p-2"}>서브 카테고리 수정</h4>
              <Form onSubmit={onSubmitSubcategoryEditForm}>
                <InputGroup className={"pb-2"}>
                  <InputGroupText>선택된카테고리</InputGroupText>
                  <Input name={"categoryId"} placeholder={"카테고리를 선택해주세요"}
                         value={selectedCategoryId !== -1 ? selectedCategoryId : (categoryInputEdit !== -1 ? categoryInputEdit : "")}
                         type={"number"} disabled={true}/>
                </InputGroup>
                {errorCategory?.error ?
                  <div><p className={"bg-danger"}>{errorCategory.error?.categoryId}</p></div> : null}
                <div className={"d-flex pb-2"}>
                  <InputGroup>
                    <InputGroupText>이름</InputGroupText>
                    <Input name={"categoryNameKor"}
                           value={selectedCategoryId !== -1 && categories.length !== 0 ? getValueFromArray(categories, selectedCategoryId, "nameKor") : categoryInputNameKorEdit}
                           type={"text"} disabled={true}/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupText>영문이름</InputGroupText>
                    <Input name={"categoryName"}
                           value={selectedCategoryId !== -1 && categories.length !== 0 ? getValueFromArray(categories, selectedCategoryId, "name") : categoryInputNameEdit}
                           type={"text"} disabled={true}/>
                  </InputGroup>
                </div>
                <hr/>
                <InputGroup className={"pb-2"}>
                  <InputGroupText>선택된 서브카테고리</InputGroupText>
                  <Input name={"subcategoryId"} value={selectedSubcategoryId !== -1 ? selectedSubcategoryId : ""}
                         type={"number"} disabled={true}/>
                </InputGroup>
                <div className={"d-flex pb-2"}>
                  <InputGroup>
                    <InputGroupText>이름</InputGroupText>
                    <Input name={"subcategoryNameKor"} type={"text"} placeholder={"변경할 이름을 입력해주세요"}
                           onChange={onChangeNameKorInputSubcategoryEdit}
                           value={nameKorInputSubcategoryEdit}/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupText>영문이름</InputGroupText>
                    <Input name={"subcategoryName"} placeholder={"변경할 영문이름을 입력해주세요"} value={nameInputSubcategoryEdit}
                           type={"text"}
                           onChange={onChangeNameInputSubcategoryEdit}
                    />
                  </InputGroup>
                </div>

                <div className={"d-flex justify-content-between"}>
                  <Button type={"button"} onClick={onClickSubcategoryDelete}>삭제</Button>
                  <Button type={"submit"} className={"bg-primary"}>수정</Button>
                </div>
              </Form>
            </div>
            <div className={"flex-grow-1 subcategory-add"}>
              <h4 className={"p-2"}>서브 카테고리 추가</h4>
              <Form onSubmit={onSubmitSubcategoryAddForm}>
                <InputGroup className={"pb-2"}>
                  <InputGroupText>선택된카테고리</InputGroupText>
                  <Input name={"categoryId"} placeholder={"카테고리를 선택해주세요"}
                         value={selectedCategoryId !== -1 ? selectedCategoryId : ""} type={"number"} disabled={true}/>
                </InputGroup>
                <div className={"d-flex pb-2"}>
                  <InputGroup>
                    <InputGroupText>이름</InputGroupText>
                    <Input name={"categoryNameKor"} value={getValueFromArray(categories, selectedCategoryId, "nameKor")}
                           type={"text"} disabled={true}/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupText>영문이름</InputGroupText>
                    <Input name={"categoryName"} value={getValueFromArray(categories, selectedCategoryId, "name")}
                           type={"text"} disabled={true}/>
                  </InputGroup>
                </div>
                <hr/>
                <div className={"d-flex pb-2"}>
                  <InputGroup>
                    <InputGroupText>이름</InputGroupText>
                    <Input name={"subcategoryNameKor"} type={"text"} placeholder={"이름을 입력해주세요"}
                           onChange={onChangeNameKorInputSubcategoryAdd}
                           value={nameKorInputSubcategoryAdd}/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupText>영문이름</InputGroupText>
                    <Input name={"subcategoryName"} placeholder={"영문이름을 입력해주세요"} value={nameInputSubcategoryAdd}
                           type={"text"}
                           onChange={onChangeNameInputSubcategoryAdd}
                    />
                  </InputGroup>
                </div>
                <div className={"d-flex justify-content-end"}>
                  <Button type={"submit"} className={"bg-primary"}>추가</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SubcategoryManage;