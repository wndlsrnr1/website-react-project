import {useEffect} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";
import {logout} from "../utils/LoginUtils";

const Logout = () => {
  useEffect(() => {
    logout(sessionStorage);
    window.location.href = "/";
  }, []);

  return (
    <>
      <div>Loading</div>
    </>
  )
}

export default Logout;