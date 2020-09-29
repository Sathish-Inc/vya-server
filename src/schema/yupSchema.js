import * as yup from 'yup';

export const emailNotLongEnough = 'email must be at least 3 characters';
export const passwordNotLongEnough = 'password must be at least 3 characters';
export const invalidEmail = 'email must be a valid email';

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const userRegistrationSchema = yup.object().shape({
  userName: yup.string().min(3).max(255).required(),
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: registerPasswordValidation,
  firstName: yup.string().min(3).max(255).required(),
  lastName: yup.string(),
  gender: yup.string().min(3).max(255).required(),
  mobile: yup.string().min(3).max(255).required(),
  dob: yup.string(),
});

export const userSignUpSchema = yup.object().shape({
  userName: yup.string().min(3).max(255).required(),
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: registerPasswordValidation,
  mobile: yup.string().min(3).max(255).required(),
});

const loginError = 'Invalid Login';

export const userloginSchema = yup.object().shape({
  email: yup.string().min(3, loginError).max(255).email(loginError)
    .required(),
  password: yup.string().min(3, loginError).max(255).required(),
});

export const adminloginSchema = yup.object().shape({
  email: yup.string().min(3, loginError).max(255).required(),
  password: yup.string().min(3, loginError).max(255).required(),
});

const changeExistingPassword = {
  oldPassword: yup.string().min(3).max(255).required(),
  newPassword: yup.string().min(3).max(255).required(),
};

export const changeExistingPasswordSchema = yup
  .object()
  .shape(changeExistingPassword);

const newPasswordSchema = {
  newPassword: yup.string().min(3).max(255).required(),
};

export const newPasswordCreateSchema = yup.object().shape(newPasswordSchema);
