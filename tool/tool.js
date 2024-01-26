const isValidEmail = (email) => {
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegExp.test(email);
};

const isValidPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasDigit &&
    hasSpecialChar
  );
};

const isValidName = (name) => {
  const nameRegExp = /[a-zA-Z]/;

  return nameRegExp.test(name);
};

export { isValidEmail, isValidPassword, isValidName };
