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
  return array.filter((elem, index) => elem.id == id)[0][paramName];
}

const getValueFromArraySub = (array, id, paramName) => {
  if (!array || array.length === 0 || id === -1) {
    return "";
  }
  console.log("array", array);
  console.log("id", id);

  return array.filter((elem, index) => elem.subcategoryId === id)[0][paramName];
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

  //submit
  const [nameKorInputSubcategoryEdit, setNameKorInputSubcategoryEdit] = useState("");
  const [nameInputSubcategoryEdit, setNameInputSubcategoryEdit] = useState("");

  const [nameKorInputSubcategoryAdd, setNameKorInputSubcategoryAdd] = useState("");
  const [nameInputSubcategoryAdd, setNameInputSubcategoryAdd] = useState("");

  //Request
  const requestSubcategory = (path) => {
    fetch(path, {method: "get"})
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
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
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

  //category request
  useEffect(() => {
    setSelectedSubcategoryId(-1);
  }, [subcategorySearchInputCond])

  useEffect(() => {
    setSelectedCategoryId(-1);
  }, [categorySearchInputCond]);

  useEffect(() => {
    setNameKorInputSubcategoryEdit(getValueFromArraySub(subcategories, selectedSubcategoryId, "nameKor"));
    setNameInputSubcategoryEdit(getValueFromArraySub(subcategories, selectedSubcategoryId, "name"));
  }, [selectedSubcategoryId]);

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

  }

  const onSubmitSubcategoryAddForm = (event) => {
    event.preventDefault();
  }

  //onClick
  const selectSubcategoryOnClick = (subcategoryId, currentSubcategoryId) => {
    if (subcategoryId === currentSubcategoryId) {
      setSelectedSubcategoryId(-1);
      return;
    }
    console.log(subcategoryId);
    setSelectedSubcategoryId(subcategoryId);
  }

  const selectCategoryOnClick = (categoryId, currentCategoryId) => {
    if (categoryId === currentCategoryId) {
      setSelectedCategoryId(-1);
      return;
    }
    console.log(categoryId);
    setSelectedCategoryId(categoryId);
  }

  const onClickSubcategoryDelete = (event) => {
    event.preventDefault();

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
        <h3 className={"text-center p-2"}>서브 카테고리 관리</h3>
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
                  <Input name={"categoryId"} placeholder={"카테고리를 선택해주세요"} value={selectedCategoryId === -1 ? "" : selectedCategoryId} type={"number"} disabled={true}/>
                </InputGroup>
                <div className={"d-flex pb-2"}>
                  <InputGroup>
                    <InputGroupText>이름</InputGroupText>
                    <Input name={"categoryNameKor"} value={getValueFromArray(categories, selectedCategoryId, "nameKor")} type={"text"} disabled={true}/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupText>영문이름</InputGroupText>
                    <Input name={"categoryName"} value={getValueFromArray(categories, selectedCategoryId, "name")} type={"text"} disabled={true}/>
                  </InputGroup>
                </div>
                <hr/>
                <InputGroup className={"pb-2"}>
                  <InputGroupText>선택된 서브카테고리</InputGroupText>
                  <Input name={"subcategoryId"} value={selectedSubcategoryId === -1 ? "" : selectedSubcategoryId} type={"number"} disabled={true}/>
                </InputGroup>
                <div className={"d-flex pb-2"}>
                  <InputGroup>
                    <InputGroupText>이름</InputGroupText>
                    <Input name={"subcategoryNameKor"} type={"text"} placeholder={"변경할 이름을 입력해주세요"} onChange={onChangeNameKorInputSubcategoryEdit}
                           value={nameKorInputSubcategoryEdit} />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupText>영문이름</InputGroupText>
                    <Input name={"subcategoryName"} placeholder={"변경할 영문이름을 입력해주세요"} value={nameInputSubcategoryEdit} type={"text"}
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
                  <Input name={"categoryId"} placeholder={"카테고리를 선택해주세요"} value={selectedCategoryId === -1 ? "" : selectedCategoryId} type={"number"} disabled={true}/>
                </InputGroup>
                <div className={"d-flex pb-2"}>
                  <InputGroup>
                    <InputGroupText>이름</InputGroupText>
                    <Input name={"categoryNameKor"} value={getValueFromArray(categories, selectedCategoryId, "nameKor")} type={"text"} disabled={true}/>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupText>영문이름</InputGroupText>
                    <Input name={"categoryName"} value={getValueFromArray(categories, selectedCategoryId, "name")} type={"text"} disabled={true}/>
                  </InputGroup>
                </div>
                <hr/>
                <div className={"d-flex pb-2"}>
                  <InputGroup>
                    <InputGroupText>이름</InputGroupText>
                    <Input name={"subcategoryNameKor"} type={"text"} placeholder={"이름을 입력해주세요"} onChange={onChangeNameKorInputSubcategoryAdd}
                           value={nameKorInputSubcategoryAdd} />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupText>영문이름</InputGroupText>
                    <Input name={"subcategoryName"} placeholder={"영문이름을 입력해주세요"} value={nameInputSubcategoryAdd} type={"text"}
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