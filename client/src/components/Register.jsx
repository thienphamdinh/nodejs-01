import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";

import _ from "lodash";
import { connect } from "react-redux";

import { register } from "../actions/auth";

const Register = ({ register, errors, history }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    password2: "",
    fullName: "",
    userType: "",
    phone: "",
    DOB: ""
  });
  const onChangeForm = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };
  const onSubmitForm = e => {
    e.preventDefault();
    register(userInfo, history);
  };

  return (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={onSubmitForm}>
        <FormGroup>
          <Label for="email" className="d-flex justify-content-between">
            <span className="text-danger">
              {errors.email ? errors.email : ""}
            </span>
          </Label>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={onChangeForm}
            invalid={errors.email ? true : false}
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
            onChange={onChangeForm}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password2">Cofinrmed Password</Label>
          <Input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confinrmed password "
            onChange={onChangeForm}
          />
        </FormGroup>
        <FormGroup>
          <Label for="full-Name">Full Name</Label>
          <Input
            type="text"
            name="name"
            id="full-Name"
            placeholder="Enter your full name"
            onChange={onChangeForm}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input
            type="text"
            name="name"
            id="fullName"
            placeholder="Enter your phone"
            onChange={onChangeForm}
          />
        </FormGroup>
        <FormGroup>
          <Label for="userType">Select User Type</Label>
          <Input
            type="select"
            name="userType"
            id="userType"
            value={userInfo.userType}
            onChange={onChangeForm}
          >
            <option value="-1">Select User Type...</option>
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="dob">DoB</Label>
          <Input
            type="date"
            name="DOB"
            id="dob"
            value={userInfo.DOB}
            onChange={onChangeForm}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
};

export default connect(
  state => ({ errors: state.errorsReducer }),
  { register }
)(Register);
