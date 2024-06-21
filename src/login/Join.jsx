import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, Input, InputGroup, InputGroupText} from "reactstrap";
import logo from "../images/logo.jpg";
import {useEffect, useState} from "react";

const Join = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordEquals, setPasswordEquals] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  // const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);


  //email값 변경시 email 인증 상태값 취소
  useEffect(() => {
    if (emailCheck === true) {
      setEmailCheck(false);
    }
  }, [email]);


  const onClickEmailCheck = (event) => {
    //fetch API로 이메일 있는 지 확인
    fetch("/email/check?email=" + email, {method: "get"})
      .then((resp) => {
        if (resp.status === 200) {
          setEmailCheck(true);
        } else {
          setEmailCheck(false);
        }
      });
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    let form = new FormData();
    form.append("email", email);
    form.append("password", password);
    form.append("password2", password2);
    form.append("address", address);
    form.append("name", name);

    fetch("/user/join", {
      method: "post", body: form
    }).then((resp) => {
      if (resp.status === 201) {
        window.location.href = "/";
        return {error: null};
      }
      return resp.json();
    })
      .then((data) => {
        setError(data.error);
        console.log("/user/join data", data)
      });
  };

  const checkPasswordEquals = (password, password2) => {

  }


  //----------------------Controlled Input start --------------------------
  const onInputEmail = (event) => {
    setEmail(event.target.value);
  }

  //이벤트가 넘어옴
  const onInputPassword = (event) => {
    setPassword(event.target.value);
  }

  const onInputPassword2 = (event) => {
    setPassword2(event.target.value);
  }

  const onInputAddress = (event) => {
    setAddress(event.target.value);
  }

  const onInputName = (event) => {
    setName(event.target.value);
  }
//----------------------Controlled Input end --------------------------

  return (
    <>
      <Container className={"d-flex justify-content-center pt-5"}>
        <Col xs={6}>
          <div className={"mb-3 d-flex justify-content-center"}>
            <a>
              <img src={logo} alt={"logo"}/>
            </a>
          </div>
          <h3 className={"text-center pb-3"}>회원가입</h3>
          <div>
            <Form onSubmit={onSubmitForm}>
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  이메일
                </InputGroupText>
                <Input placeholder={"이메일을 입력해주세요"} type={"text"} name={"email"} onInput={onInputEmail} value={email}/>
                {
                  emailCheck === false ?
                    <Button type={"button"} onClick={onClickEmailCheck}>확인</Button>:
                    <InputGroupText className={"bg-success text-white"}>✔</InputGroupText>
                }
              </InputGroup>
              {error?.fieldErrors?.email == null ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.fieldErrors?.email}</p></div>}
              {/*mabe there is some error*/}
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  이름
                </InputGroupText>
                <Input placeholder={"이름을 입력해주세요"} type={"text"} name={"name"} onInput={onInputName} value={name}/>
              </InputGroup>
              {error?.fieldErrors?.name == null ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.fieldErrors?.email}</p></div>}
              {/*mabe there is some error*/}
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  비밀번호
                </InputGroupText>
                <Input placeholder={"비밀번호를 입력해주세요"} type={"password"} name={"password"} onInput={onInputPassword}
                       value={password}/>
              </InputGroup>
              {error?.fieldErrors?.password == null ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.fieldErrors?.password}</p></div>}
              {/*mabe there is some error*/}
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  비밀번호 확인
                </InputGroupText>
                <Input placeholder={"비밀번호를 입력해주세요"} type={"password"} name={"password2"} onInput={onInputPassword2}
                       value={password2}/>
              </InputGroup>
              {error?.fieldErrors?.password2 == null ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.fieldErrors?.password2}</p></div>}
              {/*mabe there is some error*/}
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  주소
                </InputGroupText>
                <Input placeholder={"주소를 입력해주세요"} type={"text"} name={"address"} onInput={onInputAddress}
                       value={address}/>
              </InputGroup>
              {error?.fieldErrors?.address == null ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.fieldErrors?.address}</p></div>}
              {/*mabe there is some error*/}
              {error?.globalErrors == null ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error.globalErrors}</p></div>}
              {/*mybe there is some error*/}
              <div>
                <Button type={"submit"} className={"w-100 bg-primary"}>회원가입</Button>
              </div>
            </Form>
          </div>

        </Col>

      </Container>
    </>
  )
}

export default Join;