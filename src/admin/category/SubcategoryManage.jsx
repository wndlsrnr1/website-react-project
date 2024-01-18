import {Button, Container, Form, Input, InputGroup, InputGroupText, ListGroup, ListGroupItem} from "reactstrap";
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

const SubcategoryManage = () => {
  //같은 경로로 보내는 request는 한 곳에만 작성하기
  //Variable
  const [loaded, setLoaded] = useState(false);
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
      });
  }

  //Effects
  useEffect(() => {
    if (loaded) {
      return;
    }
    const path = "/admin/subcategories?page=0&size=10"
    requestSubcategory(path);
  }, [loaded])

  //category request
  useEffect(() => {
    setSelectedSubcategoryId(-1);
  }, [subcategorySearchInputCond])

  //Submit
  const searchSubcategoryByOnSubmit = (event) => {
    event.preventDefault();
    setSubcategorySearchInputCond(subCategorySearchInput);
    let path = `/admin/subcategories?page=0&size=10`
    if (subCategorySearchInput == null || subcategorySearchInputCond === subCategorySearchInput) {
      return;
    }
    if (path !== "") {
      path += `&searchName=${subCategorySearchInput}`
    }
    requestSubcategory(path);
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

  //onChange
  const onChangeSubcategoryInput = (event) => {
    const value = event.currentTarget.value;
    setSubCategorySearchInput(value);
  }

  return (
    <>
      <Container className={"mt-5"}>
        <h3 className={"text-center p-2"}>서브 카테고리 관리</h3>
        <div className={"category p-5 w-100"}>
          <div>
            <Form onSubmit={searchSubcategoryByOnSubmit}>
              <InputGroup className={"pb-5"}>
                <InputGroupText>서브카테고리 이름 검색</InputGroupText>
                <Input name={"category_cond"} type="text" placeholder={"카테고리 이름을 검색해주세요"}
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
                                   category_id={"123"}
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
        </div>
      </Container>
    </>
  );
}

export default SubcategoryManage;