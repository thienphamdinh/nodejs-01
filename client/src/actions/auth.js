import Axios from "axios";
import _ from "lodash";

import getFingerprint from "../helpers/getFingerprint";
import setHeaders from "../helpers/setHeaders";

import jwtDecode from "jwt-decode";

export const getErrors = err => {
  return {
    type: "GET_ERRORS",
    payload: err
  };
};

export const register = (data, history) => {
  return dispatch => {
    Axios.post("/api/users/register", data)
      .then(res => {
        dispatch(getErrors({}));
        history.push("/");
      })
      .catch(err => {
        if (err) {
          dispatch(getErrors(_.get(err, "response.data")));
        }
      });
  };
};

export const login = ({ email, password }, history) => {
  return dispatch => {
    getFingerprint(fingerprint => {
      Axios.post("/api/users/login", { email, password })
        .then(res => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          const decoded = jwtDecode(token);
          dispatch(setCurrentUser(decoded));
          setHeaders(token, fingerprint);
          dispatch(getErrors({}));
          history.push("/");
        })
        .catch(err => {
          if (err) {
            dispatch(getErrors(_.get(err, "response.data")));
          }
        });
    });
  };
};

export const setCurrentUser = data => {
  return {
    type: "SET_CURRENT_USER",
    payload: data
  };
};
