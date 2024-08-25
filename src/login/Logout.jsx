import {useEffect} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";
import {logout} from "../utils/LoginUtils";

const Logout = () => {
  useEffect(() => {
    logout(localStorage);

    window.location.href = "/";
  }, []);

  return (
    <>
      <div>asdf</div>
    </>
  )
}

export default Logout;