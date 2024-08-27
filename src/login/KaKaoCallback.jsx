import {useEffect} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";

const KaKaoCallback = () => {
  //variables

  //hooks

  //useEffects
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const error = new URL(window.location.href).searchParams.get("error");
    const errorDescription = new URL(window.location.href).searchParams.get("error_description");
    const state = new URL(window.location.href).searchParams.get("state");
    const method = new URL(window.location.href).searchParams.get("method");

    // return;
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

    if (method === "login") {
      requestLogin(body);
    } else if (method === "delete") {
      requestDelete(body);
    } else if (method === "register") {
      requestRegister(body);
    } else {
      window.location.href = "/";
    }


  }, [])
  //onClicks

  //onSubmits

  //onChanges

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
          window.location.href = "/";
        } else {
          window.location.href = "/";
        }
      });
  }
  const requestDelete = (body) => {
    fetchWithAuth("/auth/users/kakao", {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    })
      .then((resp) => {
        if (resp.ok) {
          window.location.href = "/";
        } else {
          window.location.href = "/";
        }
      });
  }
  return <>
    <div>Loading</div>
  </>
}

export default KaKaoCallback;