import React, { useState } from "react";

import _ from "lodash";
import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
import { connect } from "react-redux";

import { login } from "../actions/auth";

const Login = ({ login, history }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({
    errors: {}
  });
  const onChangeForm = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };
  const onSubmitForm = e => {
    e.preventDefault();
    login(userInfo, history);
  };
  // const testPrivate = () => {
  //   const token = localStorage.getItem("token");
  //   Fingerprint2.getV18({}, fingerprint => {
  //     Axios.defaults.headers.common["Authorization"] = token;
  //     Axios.defaults.headers.common["fingerprint"] = fingerprint;
  //     Axios.get("/api/users/test-private")
  //       .then(res => console.log(res))
  //       .catch(err => console.log(err));
  //   });
  // };
  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={e => onSubmitForm(e)}>
        <FormGroup>
          <Label for="email" className="d-flex justify-content-between">
            <span className="text-danger">
              {error.errors.email ? error.errors.email : ""}
            </span>
          </Label>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={e => onChangeForm(e)}
            invalid={error.errors.email ? true : false}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={userInfo.password}
            onChange={e => onChangeForm(e)}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      <Button>Test Private</Button>
    </Container>
  );
};

export default connect(
  null,
  { login }
)(Login);
