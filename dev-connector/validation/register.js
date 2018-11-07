const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword  : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is requiered";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is requiered";
  }  

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be between 8 and 30 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is requiered";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password and confirm password must be same";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is requiered";
  }  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
