const emailRegExp = /\S+@\S+\.\S+/;
const specialCharRegExp = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

function validateNewPasswordInput(password) {
  if (!password) {
    return "Required";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters";
  } else if (password.toUpperCase() === password) {
    return "Password must contain a lowercase letter";
  } else if (password.toLowerCase() === password) {
    return "Password must contain an uppercase letter";
  } else if (!specialCharRegExp.test(password)) {
    return "Password must contain a special character";
  } else {
    return null;
  }
}

export function validateSignIn(formData) {
  const formErrors = {};

  if (!formData.username) {
    formErrors.username = "Required";
  }

  if (!formData.password) {
    formErrors.password = "Required";
  }

  return formErrors;
}

export function validateRegister(formData) {
  const formErrors = {};

  if (!formData.email) {
    formErrors.email = "Required";
  } else if (!emailRegExp.test(formData.email.toLowerCase())) {
    formErrors.email = "Valid email is required";
  }

  if (!formData.username) {
    formErrors.username = "Required";
  } else if (formData.username.length < 8) {
    formErrors.username = "Username must be at least 8 characters";
  } else if (emailRegExp.test(formData.username.toLowerCase())) {
    formErrors.username = "Username must not be an email";
  }

  const passwordError = validateNewPasswordInput(formData.password);
  if (passwordError) formErrors.password = passwordError;

  const confirmPasswordError = validateNewPasswordInput(
    formData.confirmPassword,
  );
  if (confirmPasswordError) formErrors.confirmPassword = confirmPasswordError;

  return formErrors;
}

export function validateForgotPasswordCode(formData) {
  const formErrors = {};

  if (!formData.username) {
    formErrors.username = "Required";
  }

  return formErrors;
}

export function validateForgotPassword(formData) {
  const formErrors = {};

  if (!formData.username) {
    formErrors.username = "Required";
  }

  if (!formData.confirmationCode) {
    formErrors.confirmationCode = "Required";
  }

  const passwordError = validateNewPasswordInput(formData.password);
  if (passwordError) formErrors.password = passwordError;

  return formErrors;
}

export function validateChangePassword(formData) {
  const formErrors = {};

  const previousPasswordError = validateNewPasswordInput(
    formData.previousPassword,
  );
  if (previousPasswordError)
    formErrors.previousPassword = previousPasswordError;

  const proposedPasswordError = validateNewPasswordInput(
    formData.proposedPassword,
  );
  if (proposedPasswordError)
    formErrors.proposedPasswordError = proposedPasswordError;

  return formErrors;
}
