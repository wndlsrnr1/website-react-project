import {Button, Col, Container, Form, Input, InputGroup, InputGroupText} from "reactstrap";
import logo from "../images/logo.jpg";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";

const Join = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [passwordEquals, setPasswordEquals] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState({});
  // const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.isLogin);


  //email값 변경시 email 인증 상태값 취소
  useEffect(() => {
    console.log("errors: ", error);
    console.log("emailExists: ", emailExists);
    if (emailExists === true) {
      setEmailExists(false);
    }
  }, [email]);

  useEffect(() => {
  }, []);


  const onClickEmailCheck = (event) => {
    //fetch API로 이메일 있는 지 확인

    event.preventDefault();

    fetchWithAuth("/users/check/email",
      {method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify({"email": email})}
    )
      .then((resp) => {
        if (resp.status !== 200) {
          resp.json().then(data => {
            setEmailExists(false);
            setError({...error, "email": data.body.email});
          });
        } else {
          resp.json().then(data => {
              setEmailExists(data.body.emailExists);
            const updatedObject = {...error};
            delete updatedObject.email;
            setError(updatedObject);
            }
          );
        }
      });
  }

  const onSubmitForm = (event) => {
    event.preventDefault();

    if (password2 === password) {
      if (error?.password2) {
        const updatedError = {...error};
        delete error.password2;
        setError(updatedError);
      }
    } else {
      setError({password2: "비밀번호가 서로 일치해야합니다"});
      return;
    }

    const jsonBody = JSON.stringify({
      "email": email,
      "password": password,
      "address": address,
      "name": name,
    });

    fetchWithAuth("/auth/register", {
      method: "post", body: jsonBody, headers: {"Content-Type": "application/json"}

    }).then((resp) => {
      if (resp.status === 200) {
        window.location.href = "/";
        return;
      }
      return resp.json().then((data) => {
        setError(data.body);
      });
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
                  emailExists ?
                    <InputGroupText className={"bg-success text-white"}>✔</InputGroupText> :
                    <Button type={"button"} onClick={onClickEmailCheck}>확인</Button>
                }
              </InputGroup>
              {!error?.email == null ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.email}</p></div>}
              {/*mabe there is some error*/}
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  이름
                </InputGroupText>
                <Input placeholder={"이름을 입력해주세요"} type={"text"} name={"name"} onInput={onInputName} value={name}/>
              </InputGroup>
              {!error?.name ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.name}</p></div>}
              {/*mabe there is some error*/}
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  비밀번호
                </InputGroupText>
                <Input placeholder={"비밀번호를 입력해주세요"} type={"password"} name={"password"} onInput={onInputPassword}
                       value={password}/>
              </InputGroup>
              {!error?.password ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.password}</p></div>}
              {/*mabe there is some error*/}
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  비밀번호 확인
                </InputGroupText>
                <Input placeholder={"비밀번호를 입력해주세요"} type={"password"} name={"password2"} onInput={onInputPassword2}
                       value={password2}/>
              </InputGroup>
              {!error?.password2 ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.password2}</p></div>}
              {/*mabe there is some error*/}
              <InputGroup className={"mb-3"}>
                <InputGroupText className={"w-25 text-center"}>
                  주소
                </InputGroupText>
                <Input placeholder={"주소를 입력해주세요"} type={"text"} name={"address"} onInput={onInputAddress}
                       value={address}/>
              </InputGroup>
              {!error?.address == null ? null :
                <div><p className={"alert-danger text-end pe-3"}>{error?.address}</p></div>}
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