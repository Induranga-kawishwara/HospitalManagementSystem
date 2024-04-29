import Joi from "joi";
import JoiPhoneNumberExtensions from "joi-phone-number";
import passwordComplexity from "joi-password-complexity";

const JoiPhoneNumber = Joi.extend(JoiPhoneNumberExtensions);
const today = new Date();
const fiveYearsAgo = new Date(
  today.getFullYear() - 5,
  today.getMonth(),
  today.getDate()
);

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const passwordSchema = Joi.string()
  .required()
  .label("Password")
  .custom((value, helpers) => {
    const complexityResult =
      passwordComplexity(complexityOptions).validate(value);
    if (complexityResult.error) {
      return helpers.error("Password must meet the complexity requirements");
    }
    return value;
  }, "complexity");

const patientValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    gender: Joi.string().required().label("Gender"),
    birthday: Joi.date()
      .required()
      .max("now")
      .message("Birthday cannot be in the future.")
      .max(fiveYearsAgo)
      .message("You must be at least 5 years old."),
    typeOfPosition: Joi.string().required().label("Type of Position"),
    phonenumber: JoiPhoneNumber.string()
      .phoneNumber()
      .required()
      .label("Phone Number"),
    address: Joi.string().required().label("Address"),
    city: Joi.string().required().label("City"),
    email: Joi.string().email().required().label("Email"),
    password: passwordSchema,
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
