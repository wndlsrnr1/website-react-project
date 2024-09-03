import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Container,
  Form, FormGroup, Input, Label,
  Modal,
  ModalBody, ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import {useEffect, useState} from "react";
import {getLoginType, handleDelete, handleLogout, logout, SOCIAL_TYPE} from "../utils/LoginUtils";
import {fetchWithAuth} from "../utils/fetchUtils";
import {useHistory} from "react-router-dom";

const CancelMembership = () => {
  //variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmToggle, setConfirmToggle] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [modalCheckOpen, setModalCheckOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const [errorsGlobal, setErrorsGlobal] = useState(null);
  const history = useHistory();


  //hooks
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  //useEffects

  //onClicks

  //onSubmits
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmToggle) {
      // Open confirmation modal
      setModalOpen(true);
    } else {
      setModalCheckOpen(true);
    }
  };

  //onChanges

  //requests
  const handleConfirm = async () => {
    // Here you would make an API call to delete the user's membership
    const deleteResponse = await fetchWithAuth("/users", {
      "method": "DELETE",
      "body": JSON.stringify({
        "email": email,
        "password": password
      }),
      "headers": {"Content-Type": "application/json"}
    });

    if (!deleteResponse.ok) {
      deleteResponse.json().then(data => {
        setErrors(data.body);
        setErrorsGlobal("가입정보가 맞지 않습니다");
      });
      setModalOpen(false);
      return;
    }

    setResponseMessage('성공적으로 회원 탈퇴 처리 되었습니다');
    setModalOpen(false);
    logout(sessionStorage);
    setTimeout(() => {
      history.push('/');
    }, 2000);

  };

  return (
    <Container>
      <h2>회원 탈퇴</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">이메일</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => {
              if (errors) {
                setErrors(null);
              }
              if (errorsGlobal) {
                setErrorsGlobal(null);
              }
              setEmail(e.target.value);
            }}
            required
          />
          {errors !== null && errors?.email ?
            <div><p className={"alert-danger text-end pe-3"}>{errors.email}</p></div> :
            null}
        </FormGroup>
        <FormGroup>
          <Label for="password">비밀번호</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => {
              if (errors) {
                setErrors(null);
              }
              if (errorsGlobal) {
                setErrorsGlobal(null);
              }
              setPassword(e.target.value)
            }}
            required
          />
          {errors !== null && errors?.password ?
            <div><p className={"alert-danger text-end pe-3"}>{errors.password}</p></div> :
            null}
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={confirmToggle}
              onChange={(e) => {
                setConfirmToggle(e.target.checked);
              }}
            />
            {' '}회원 탈퇴에 동의합니다
          </Label>
          {errorsGlobal &&
            <div><p className={"alert-danger text-end pe-3"}>{errorsGlobal}</p></div>
          }
        </FormGroup>
        <Button color="danger" type="submit">회원 탈퇴</Button>
      </Form>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>탈퇴 확인</ModalHeader>
        <ModalBody>
          정말 회원을 탈퇴 하시겠습니까?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleConfirm}>네, 탈퇴하겠습니다</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>취소</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCheckOpen}>
        <ModalHeader>동의 사항 확인</ModalHeader>
        <ModalBody>
          동의 사항을 체크해주세요
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => setModalCheckOpen(false)}>확인</Button>{' '}
        </ModalFooter>
      </Modal>
      {/* Show the response message if any */}
      {responseMessage && <div className="alert alert-success mt-3">{responseMessage}</div>}
    </Container>
  )

  /*
  //variables
  const [toggleModal, setToggleModal] = useState(false);

  //hooks

  //useEffects
  useEffect(() => {

  }, []);

  //onClicks

  //onSubmits

  //onChanges

  //requests
  const handleCancelMembership = () => {
    //todo: implement request to delete user
    fetchWithAuth("/")
  }

  const renderCancelButton = () => {
    const socialType = getLoginType(sessionStorage);
    switch (socialType) {
      case SOCIAL_TYPE.NONE: {
        return (<Button onClick={handleDelete} className={"bg-danger btn-sm"}>회원 탈퇴하기</Button>)
      }
      case SOCIAL_TYPE.KAKAO:
        return (<Button onClick={handleDelete} className={"bg-danger btn-sm"}>회원 탈퇴하기</Button>);
      default:
        return null;
    }
  }
  return (
    <>
      <Container>
        {renderCancelButton()}
        <Modal>
          <ModalHeader/>
          <ModalBody>
            정말 탈퇴하시겠습니까?
          </ModalBody>
          <ButtonGroup>
            <Button onClick={() => {
              setToggleModal(!toggleModal);
              handleCancelMembership();
            }}>네</Button>
            <Button onClick={() => {
              setToggleModal(!toggleModal);
            }}>아니오</Button>
          </ButtonGroup>
        </Modal>
      </Container>
    </>
  )
   */
}
export default CancelMembership