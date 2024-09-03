import {Button, Col, Container, Form, Input, ListGroup, ListGroupItem, Nav, NavItem, NavLink, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import logo from "../images/logo.jpg"
import {checkLogin, getLoginType, handleLogout, logout, SOCIAL_TYPE} from "../utils/LoginUtils";
import {fetchWithAuth} from "../utils/fetchUtils";

const Header = () => {
  //variables
  const isLogin = checkLogin(sessionStorage);
  const [searchNameValue, setSearchNameValue] = useState("");

  //hooks

  //useEffects

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

  //renders
  const renderLogout = () => {
    const loginType = getLoginType(sessionStorage);
    switch (loginType) {
      case SOCIAL_TYPE.KAKAO: {
        return (
          <NavItem>
            <NavLink href={"/logout"} onClick={handleLogout}>로그아웃</NavLink>
          </NavItem>
        )
      }
      case SOCIAL_TYPE.NONE: {
        return (
          <NavItem>
            <NavLink href={"/logout"} onClick={() => {
              logout(sessionStorage)
              window.location.href = "/";
            }}>로그아웃</NavLink>
          </NavItem>
        );
      }
    }

  }

  return (
    <>
      <Container className={"d-flex flex-column"}>
        <div className={"w-100 d-flex flex-row-reverse"}>
          <div className={""}>
            <Nav className={""}>
              {
                !isLogin ? (
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
                    {renderLogout()}
                    <NavItem className={"small"}>
                      <NavLink href={"/users/profile"}>마이페이지</NavLink>
                    </NavItem>
                    <NavItem className={"small"}>
                      <NavLink href="">장바구니</NavLink>
                    </NavItem>
                  </>
                )
              }


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
            <Col style={{height: "100px"}} className={"d-flex justify-content-center flex-column"}>
              <Form action="" className={"d-flex justify-content-center"} onSubmit={searchOnsubmit}>
                <Input type="text" className={"me-2"} name={"search"} placeholder={"검색어를 입력해주세요 :)"}
                       value={searchNameValue} onChange={searchNameOnchange}/>
                <Button className={"p-1 bg-primary"} style={{width: "50px"}}>검색</Button>
              </Form>
            </Col>
            <Col style={{height: "100px"}} className={"d-flex flex-column justify-content-center"}>
              <div className={"d-flex justify-content-around"}>
                {/*<span><a href="" className={"text-decoration-none text-warning"}>카톡상담</a></span>*/}
                <span><a href="/items/on_discount" className={"text-decoration-none text-black"}>세일상품</a></span>
                <span><a href="/items/reviews" className={"text-decoration-none text-black"}>상품후기</a></span>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Header;