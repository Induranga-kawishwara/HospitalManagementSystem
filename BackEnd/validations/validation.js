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

const TwentyfiveYearsAgo = new Date(
  today.getFullYear() - 25,
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

const patientValidation = (data, isUpdating = false) => {
  const commonSchema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    gender: Joi.string().required().label("Gender"),
    birthday: Joi.date()
      .required()
      .max("now")
      .message("Birthday cannot be in the future.")
      .max(fiveYearsAgo)
      .message("You must be at least 5 years old."),
    phonenumber: JoiPhoneNumber.string()
      .phoneNumber()
      .required()
      .label("Phone Number"),
    address: Joi.string().required().label("Address"),
    city: Joi.string().required().label("City"),
    email: Joi.string().email().required().label("Email"),
  };

  const schema = isUpdating
    ? Joi.object(commonSchema)
    : Joi.object({ ...commonSchema, password: passwordSchema });

  return schema.validate(data);
};

const staffValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    gender: Joi.string()
      .valid("male", "female", "other")
      .required()
      .label("Gender"),
    date: Joi.date()
      .required()
      .max("now")
      .message("Birthday cannot be in the future.")
      .max(TwentyfiveYearsAgo)
      .message("You must be at least 25 years old."),
    staffType: Joi.string()
      .valid("Doctor", "Nurse", "Cleaner", "Administrative", "Other")
      .required()
      .label("Type of Position"),
    contact: Joi.string()
      .pattern(/^[0-9]{10}$/) // Matches exactly 10 digits
      .required()
      .label("Phone Number")
      .messages({
        "string.pattern.base": "{#label} must be a 10-digit number",
        "any.required": "{#label} is required.",
      }),
    address: Joi.string().required().label("Address"),
    image: Joi.string().required().label("Image"),
    email: Joi.string().email().required().label("Email").messages({
      "string.email": "Please provide a valid email address for {#label}",
      "any.required": "{#label} is required.",
    }),
    hospitalBranch: Joi.string().required().label("Hospital Branch"),
    department: Joi.string().label("Department"),
    shift: Joi.string().allow("", null).label("Shift"), // Allow empty string or null
    specialization: Joi.string().allow("", null).label("Specialization"),
    selectedDays: Joi.array()
      .items(Joi.string())
      .required()
      .label("Selected Days"),
    workingTimeStart: Joi.number()
      .required()
      .less(Joi.ref("workingTimeEnd"))
      .label("Working Time Start")
      .messages({
        "number.base": "{#label} must be a number",
        "any.required": "{#label} is required.",
        "number.less": "{#label} must be before Working Time End",
      }),
    workingTimeEnd: Joi.number().required().label("Working Time End").messages({
      "number.base": "{#label} must be a number",
      "any.required": "{#label} is required.",
    }),
    workingTimeStartMin: Joi.string()
      .required()
      .label("Working Time Start Min"),
    workingTimeEndMin: Joi.string().required().label("Working Time Start End"),
  });
  return schema.validate(data);
};

export { patientValidation, staffValidation };
