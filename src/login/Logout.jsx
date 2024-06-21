import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../store/action";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("/logout", {method: "get"})
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