import {useContext, useEffect} from "react";
import {Button} from "reactstrap";
import {handleDelete} from "../utils/LoginUtils";

const MyPage = () => {

  return (
    <>
      <Button onClick={handleDelete}>카카오 회원 탈퇴하기</Button>
    </>
  )
}

export default MyPage;