const validator = require("validator");
const _ = require("lodash");
const { User } = require("../models/user");

const validateRegisterInput = async data => {
  let errors = {};

  data.email = _.get(data, "email", "");
  data.password = _.get(data, "password", "");
  data.password2 = _.get(data, "password2", "");
  data.userType = _.get(data, "userType", "");
  data.fullName = _.get(data, "fullName", "");
  data.phone = _.get(data, "phone", "");
  data.DOB = _.get(data, "DOB", "");

  if (validator.isEmpty(data.email)) {
    //true: "" / false: have value
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    //true: is email / false: not is email
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password has at least 6 characters";
  } else {
    const user = await User.findOne({ email: data.email });
    if (user) errors.email = "Email exists";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password = "Confirm password is required";
  } else if (validator.equals(data.password, data.password2)) {
    errors.password = "Password is not match";
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = "Phone is required";
  } else {
    const user = await User.findOne({ phone: data.phone });
    if (user) errors.phone = "Phone exists";
  }
  return {
    isValid: _.isEmpty(errors),
    errors
  };
};

module.exports = validateRegisterInput;
