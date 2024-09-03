import {useEffect} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";
import {useParams} from "react-router-dom";
import {login, logout, SOCIAL_TYPE} from "../utils/LoginUtils";

const KaKaoCallback = () => {
  const {method} = useParams();
  //useEffects
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const error = new URL(window.location.href).searchParams.get("error");
    const errorDescription = new URL(window.location.href).searchParams.get("error_description");
    const state = new URL(window.location.href).searchParams.get("state");

    const body = {};
    if (code) {
      body["code"] = code;
    }
    if (error) {
      body["error"] = error;
    }
    if (errorDescription) {
      body["errorDescription"] = errorDescription;
    }
    if (state) {
      body["state"] = state;
    }

    alert(JSON.stringify(body))
    if (method === "register") {
      requestRegister(body);
    } else if (method === "login") {
      requestLogin(body);
    } else if (method === "logout") {
      requestLogout(body);
    } else if (method === "delete") {
      requestDelete(body);
    }


  }, [])

  //requests
  const requestRegister = (body) => {
    fetchWithAuth("/auth/register/kakao", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    })
      .then((resp) => {
        if (resp.ok) {
          window.location.href = "/";
        } else {
          alert("register call");
          window.location.href = "/";
        }
      });
  }

  const requestLogin = (body) => {
    fetchWithAuth("/auth/login/kakao", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    })
      .then((resp) => {
        if (resp.ok) {
          resp.json().then(data => login(sessionStorage, data.body, SOCIAL_TYPE.KAKAO));
          window.location.href = "/";
        } else {
          alert("로그인 실패");
          window.location.href = "/";
        }
      });
  }

  const requestLogout = (body) => {

    fetchWithAuth("/auth/logout/kakao", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    })
      .then((resp) => {
        if (resp.ok) {
          logout(sessionStorage);
          window.location.href = "/";
        } else {
          logout(sessionStorage);
          alert("logout 실패");
          window.location.href = "/";
        }
      });
  }

  const requestDelete = (body) => {
    alert("delete call");
    fetchWithAuth("/auth/users/kakao", {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    })
      .then((resp) => {
        if (resp.ok) {
          logout(sessionStorage);
          window.location.href = "/";
        } else {
          alert("회원 탈퇴 실패");
          window.location.href = "/";
        }
      });
  }

  return <>
    <h1>Loading</h1>
  </>
}

export default KaKaoCallback;