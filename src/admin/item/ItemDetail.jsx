import {Link, useParams} from "react-router-dom";
import {Button, Col, Container, Input, InputGroup, InputGroupText, Row} from "reactstrap";
import {useEffect, useState} from "react";

const ItemDetail = (props) => {
  //variables
  const {itemId} = useParams();
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState({});

  //requests
  const requestItem = () => {
    const path = "/admin/items/" + itemId;
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setItem(data.data);
      });
  };

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    requestItem();
    setLoaded(true);
  }, [loaded]);

  //onClicks

  //onSubmits

  //onChanges

  return (
    <>
      <Container className={"w-75"}>

        <h2 className={"text-center p-4"}>아이템 상세</h2>
        <div className={"box"}>
          <Row className={"mb-3"}>
            <Col>
              <InputGroup>
                <InputGroupText>카테고리</InputGroupText>
                <Input className={"bg-white"} disabled={true} type={"select"}>
                  <option>카테고리</option>
                </Input>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupText>서브카테고리</InputGroupText>
                <Input className={"bg-white"} disabled={true} value={"아이템 이름1"}>
                  <option>서브 카테고리</option>
                </Input>
              </InputGroup>
            </Col>
          </Row>

          <InputGroup className={"mb-3"}>
            <InputGroupText>아이템 이름</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={item ? item.nameKor : null}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>아이템 영어이름</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={item ? item.name : null}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>출시일</InputGroupText>
            <Input className={"bg-white"} type={"date"} disabled={false} value={item ? item.releasedAt : null}/>
            <Input className={"bg-white"} type={"time"} disabled={true}/>
          </InputGroup>

          <Row className={"mb-3"}>
            <Col>
              <InputGroup>
                <InputGroupText>생성일</InputGroupText>
                <Input className={"bg-white"} disabled={true} type={"date"}/>
                <Input className={"bg-white"} disabled={true} type={"time"}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupText>수정일</InputGroupText>
                <Input className={"bg-white"} disabled={true} type={"date"}/>
                <Input className={"bg-white"} disabled={true} type={"time"}/>
              </InputGroup>
            </Col>
          </Row>

          <Row className={"mb-3"}>
            <Col>
              <InputGroup>
                <InputGroupText>가격</InputGroupText>
                <Input className={"bg-white"} disabled={true} value={item ? item.price : null} type={"number"} min={0}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupText>수량</InputGroupText>
                <Input className={"bg-white"} disabled={true} value={item ? item.quantity : null} type={"number"} min={0} max={20000000}/>
              </InputGroup>
            </Col>
          </Row>

          <InputGroup className={"mb-3"}>
            <InputGroupText>ImageFiles</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={"아이템 이미지 파일들"}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>상태</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={item ? item.status : null}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>설명</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={item ? item.description : null} type={"textarea"}/>
          </InputGroup>
        </div>
        <div className={"buttons"}>
          <Button className={"w-100 mb-3"} to={"/admin/items/delete" + itemId}>삭제</Button>
          <Link className={"w-100 bg-primary btn text-white"} to={"/admin/items/edit/" + itemId}>수정</Link>
        </div>
      </Container>
    </>
  )
}

export default ItemDetail;