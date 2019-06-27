import Axios from "axios";

const setHeaders = (token, fingerprint) => {
  if (token && fingerprint) {
    Axios.defaults.headers.common["Authorization"] = token;
    Axios.defaults.headers.common["fingerprint"] = fingerprint;
  } else {
    delete Axios.defaults.headers.common["Authorization"];
    delete Axios.defaults.headers.common["fingerprint"];
  }
};
export default setHeaders;
