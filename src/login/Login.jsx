import {Button, Col, Container, Form, Input, InputGroup, InputGroupText} from "reactstrap";
import logo from '../images/logo.jpg'
import {useContext, useEffect, useReducer, useRef, useState} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";
import {login} from "../utils/LoginUtils";

const Login = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }

    setLoaded(true);
  }, [loaded]);

  const onInputEmail = (event) => {
    setEmail(event.target.value);
  }

  //이벤트가 넘어옴
  const onInputPassword = (event) => {
    setPassword(event.target.value);
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    const loginBody = {
      "email": email,
      "password": password
    }

    fetchWithAuth("/auth/login", {
      method: "post",
      body: JSON.stringify(loginBody),
      headers: {"Content-Type": "application/json"}
    })
      .then((resp) => {
          if (resp.status === 200) {
            resp.json().then((data) => {
              login(localStorage, data.body);
              window.location.href = "/";
            });
            return;
          }
          return resp.json().then((data) => {
              setError(true);
              if (data.body?.email) {
                setEmailError(data.body.email);
              } else {
                setEmailError(null);
              }
            }
          );
        }
      );

  };

  return (
    <>
      <Container className={"d-flex justify-content-center pt-5"}>
        <Col xs={6}>
          <div className={"mb-3 d-flex justify-content-center"}>
            <a>
              <img src={logo} alt={"logo"}/>
            </a>
          </div>
          <h3 className={"text-center"}>로그인</h3>
          <div>
            <Form onSubmit={onSubmitForm}>
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  이메일
                </InputGroupText>
                <Input placeholder={"이메일을 입력해주세요"} type={"text"} onInput={onInputEmail} value={email}/>
              </InputGroup>
              {emailError ? <div><p className={"alert-danger text-end pe-3"}>{emailError}</p></div> : null}
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  비밀번호
                </InputGroupText>
                <Input placeholder={"비밀번호를 입력해주세요"} type={"password"} onInput={onInputPassword} value={password}/>
              </InputGroup>
              {error ? <div><p className={"alert-danger text-end pe-3"}>로그인 정보가 바르지 않습니다.</p></div> : null}
              <div>
                <Button type={"submit"} className={"w-100 bg-primary"}>로그인</Button>
                <hr/>
                <Button tag={"a"} className={"w-100 mb-3 bg-gradient"} href={"/join"}>회원가입</Button>
              </div>
              <div>
                <a href={"/member/find"} className={"w-100 d-block text-end"}>비밀번호 찾기</a>
              </div>
            </Form>
          </div>
        </Col>
      </Container>
    </>
  )
}

export default Login;