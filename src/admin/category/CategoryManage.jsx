import {
  Button,
  Container,
  FormGroup,
  Input,
  InputGroup, InputGroupButtonDropdown,
  InputGroupText,
  ListGroup,
  ListGroupItem,
  Pagination, PaginationItem, PaginationLink
} from "reactstrap";

const CategoryManage = () => {

  return (
    <>
      <Container className={"mt-5"}>
        <h3 className={"text-center p-2"}>카테고리 관리</h3>
        <div className={"d-flex justify-content-around"}>
          <div className={"category p-5 w-100"}>
            <InputGroup className={"pb-5"}>
              <InputGroupText>이름 검색</InputGroupText>
              <Input name={"category_cond"} type="text" placeholder={"카테고리 이름을 검색해주세요"}/>
              <Button className={"bg-primary"}>검색</Button>
            </InputGroup>
            <h3 className={"text-center"}>카테고리</h3>
            <div className={"pb-5"}>
              <ListGroup className={"pb-4"}>
                <ListGroupItem action active={false} tag="button">
                  Cras justo odio
                </ListGroupItem>
                <ListGroupItem action active={true} tag="button">
                  Dapibus ac facilisis in
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Morbi leo risus
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
              </ListGroup>

              <div className={"d-flex justify-content-center"}>
                <Pagination size={"sm"}>
                  <PaginationItem disabled>
                    <PaginationLink href="#" tag={"button"}>&lt;&lt;</PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled>
                    <PaginationLink tag={"button"} href="#" >&lt;</PaginationLink>
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
                <ListGroupItem action active={true} className={"mb-2"}>Dapibus ac facilisis
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
                <ListGroupItem action tag="button">
                  Morbi leo risus
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
                <ListGroupItem action tag="button">
                  Porta ac consectetur ac
                </ListGroupItem>
              </ListGroup>

              <div className={"d-flex justify-content-center"}>
                <Pagination size={"sm"}>
                  <PaginationItem disabled>
                    <PaginationLink href="#" tag={"button"}>&lt;&lt;</PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled>
                    <PaginationLink tag={"button"} href="#" >&lt;</PaginationLink>
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
                <Input type={"select"} value={"null"} action active={true} className={"mb-2 bg-primary text-white"}>
                  <option value="1">카테고리1</option>
                  <option value="1">카테고리2</option>
                  <option value="1">카테고리3</option>
                </Input>
                <ListGroupItem action active={true} className={"mb-2"}>Dapibus ac facilisis in</ListGroupItem>

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
              <ListGroupItem action active={true} className={"mb-2"}>Dapibus ac facilisis in</ListGroupItem>
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
  )


}

export default CategoryManage;