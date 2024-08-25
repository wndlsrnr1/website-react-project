import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../store/action";
import {fetchWithAuth} from "../utils/fetchUtils";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchWithAuth("/logout", {method: "get"})
      .then(resp => {
        dispatch(logout());
      });
    window.location.href = "/";
  }, []);

  return (
    <>
      <div>asdf</div>
    </>
  )
}

export default Logout;