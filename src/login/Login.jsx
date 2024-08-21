import {Button, Col, Container, Form, Input, InputGroup, InputGroupText} from "reactstrap";
import logo from '../images/logo.jpg'
import {useContext, useEffect, useReducer, useRef, useState} from "react";
import {login} from "../store/action";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     window.location.href = "/";
  //   }
  // }, [isLoggedIn]);

  const onInputEmail = (event) => {
    setEmail(event.target.value);
  }

  //이벤트가 넘어옴
  const onInputPassword = (event) => {
    setPassword(event.target.value);
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    let form = new FormData();
    form.append("email", email);
    form.append("password", password);

    fetch("/login/user", {method: "post", body: form})
      .then((resp) => {
          if (resp.status === 200) {
            dispatch(login());
            window.location.href = "/";
            return resp.json();
          }
          return resp.json();
        }
      )
      .then((data) => {
          if (data?.error != null) {
            console.log(data.error);
            setError(data.error);
          }
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
              {error?.fieldErrors?.email == null ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.fieldErrors?.email}</p></div>}
              {/*mabe there is some error*/}
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  비밀번호
                </InputGroupText>
                <Input placeholder={"비밀번호를 입력해주세요"} type={"password"} onInput={onInputPassword} value={password}/>

              </InputGroup>
              {error?.globalErrors == null ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error.globalErrors}</p></div>}
              {/*mybe there is some error*/}
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