import {useEffect} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";
import {useParams} from "react-router-dom";
import {login} from "../utils/LoginUtils";

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
    if (method === "register") {
      requestRegister(body);
    } else if ("login") {
      requestLogin(body);
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
          alert("에러처리하기");
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
          resp.json().then(data => login(localStorage, data.body));
          window.location.href = "/";
        } else {
          alert("에러처리하기");
          window.location.href = "/";
        }
      });
  }


  return <>
    <div>Loading</div>
  </>
}

export default KaKaoCallback;