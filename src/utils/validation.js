const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export function validateEmail(email) {
  const value = email.trim();
  if (!value) return 'Please enter your email address.';
  if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address, like name@example.com.';
  return null;
}

export function validateFullName(fullName) {
  const value = fullName.trim();
  if (!value) return 'Please enter your full name.';
  if (value.length < 2) return 'Your name should be at least 2 characters.';
  return null;
}

export function validateLoginPassword(password) {
  if (!password) return 'Please enter your password.';
  return null;
}

export function validateNewPassword(password) {
  if (!password) return 'Please choose a password.';
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters for your password.`;
  }
  return null;
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Please confirm your password.';
  if (password !== confirmPassword) return 'The passwords do not match.';
  return null;
}

function collectErrors(checks) {
  const errors = {};
  Object.entries(checks).forEach(([field, message]) => {
    if (message) errors[field] = message;
  });
  return errors;
}

export function validateLoginForm({ email, password }) {
  return collectErrors({
    email: validateEmail(email),
    password: validateLoginPassword(password),
  });
}

export function validateSignUpForm({ fullName, email, password, confirmPassword }) {
  return collectErrors({
    fullName: validateFullName(fullName),
    email: validateEmail(email),
    password: validateNewPassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  });
}
