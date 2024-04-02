import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import JoiPhoneNumber from "joi-phone-number";

const patientValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    gender: Joi.string().required().label("Gender"),
    phoneNum: JoiPhoneNumber.string()
      .phoneNumber()
      .required()
      .label("Phone Number"),
    addressOne: Joi.string().required().label("Address one"),
    addressTwo: Joi.string().required().label("Address two"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

const staffValidation = (data) => {
  const schema = Joi.object({
    staffID: Joi.string().required().label("StaffID"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    gender: Joi.string().required().label("Gender"),
    phoneNum: JoiPhoneNumber.string()
      .phoneNumber()
      .required()
      .label("Phone Number"),
    addressOne: Joi.string().required().label("Address one"),
    addressTwo: Joi.string().required().label("Address two"),
    email: Joi.string().email().required().label("Email"),
  });
  return schema.validate(data);
};

export { patientValidation, staffValidation };
