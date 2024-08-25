import {Button, Col, Container, Form, Input, ListGroup, ListGroupItem, Nav, NavItem, NavLink, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import logo from "../images/logo.jpg"

const Header = () => {
  //variables
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [searchNameValue, setSearchNameValue] = useState("");

  //hooks

  //useEffects
  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
  });

  //onClicks

  //onSubmits
  const searchOnsubmit = (event) => {
    event.preventDefault();
    window.location.href = "/items?searchName=" + searchNameValue;
  }

  //onChanges

  const searchNameOnchange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchNameValue(value);
  }

  //requests

  return (
    <>
      <Container className={"d-flex flex-column"}>
        <div className={"w-100 d-flex flex-row-reverse"}>
          <div className={""}>
            <Nav className={""}>
              {
                (
                  <>
                    {isLoggedIn === false ? (
                      <>
                        <NavItem className={"small text-dark"}>
                          <NavLink href="/login">로그인</NavLink>
                        </NavItem>
                        <NavItem className={"small"}>
                          <NavLink href="/join">회원가입</NavLink>
                        </NavItem>
                      </>
                    ) : (
                      <>
                        <NavItem className={"small"}>
                          <NavLink href="/logout">로그아웃</NavLink>
                        </NavItem>
                      </>
                    )
                    }
                  </>
                )
              }

              <NavItem className={"small"}>
                <NavLink href="/user/mypage">마이페이지</NavLink>
              </NavItem>
              <NavItem className={"small"}>
                <NavLink href="">장바구니</NavLink>
              </NavItem>
              <NavItem className={"small"}>
                <NavLink href="">고객센터</NavLink>
              </NavItem>
            </Nav>
          </div>
        </div>
        <Container style={{height: "100px"}} className={"mb-3"}>
          <Row xs={3} style={{height: "100px"}}>
            <Col style={{height: "100px"}} className={"p-3"}>
              <a href={"/"}>
                <img src={logo} className={"w-100 h-100"} alt={"logo"}/>
              </a>
            </Col>
            <Col style={{height: "100px"}} className={"d-flex justify-content-center flex-column"} >
              <Form action="" className={"d-flex justify-content-center"} onSubmit={searchOnsubmit}>
                <Input type="text" className={"me-2"} name={"search"} placeholder={"검색어를 입력해주세요 :)"} value={searchNameValue} onChange={searchNameOnchange}/>
                <Button className={"p-1 bg-primary"} style={{width: "50px"}}>검색</Button>
              </Form>
            </Col>
            <Col style={{height: "100px"}} className={"d-flex flex-column justify-content-center"}>
              <div className={"d-flex justify-content-around"}>
                <span><a href="" className={"text-decoration-none text-warning"}>카톡상담</a></span>
                <span><a href="/items/on_discount" className={"text-decoration-none text-black"}>세일상품</a></span>
                <span><a href="" className={"text-decoration-none text-black"}>상품후기</a></span>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Header;