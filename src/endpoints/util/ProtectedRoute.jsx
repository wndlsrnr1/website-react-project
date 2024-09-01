import {useEffect, useState} from "react";
import {Link, Redirect, Route, useLocation} from "react-router-dom";
import {checkLogin} from "../../utils/LoginUtils";
import {fetchWithAuth} from "../../utils/fetchUtils";

const PrivateRoute = ({component: Component, ...rest}) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkLogin(localStorage)) {
      setIsAdmin(false);
      return;
    }
    checkAdminStatus();

  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await fetchWithAuth("/auth/users", {method: "get"});
      setIsAdmin(true);
      setLoading(false);
    } catch (error) {
      console.error("Error checking admin status", error);
      setIsAdmin(false);
      setLoading(false);
    }
  }

  if (loading) {
    return (<div>Loading</div>);
  }

  return (
    <Route {...rest} render={(props) => isAdmin ? <Component {...props}/> : <Redirect to={"/"} />}
    />
  )
}

export default PrivateRoute