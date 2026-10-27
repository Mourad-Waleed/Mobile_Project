import { currentUser } from '../data/mockData';

const accounts = [currentUser];

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export function mockLogin(email) {
  const user = accounts.find((account) => account.email === normalizeEmail(email));
  if (!user) {
    return { error: 'We could not find an account with that email. Try signing up first.' };
  }
  return { user };
}

export function mockRegister({ fullName, email }) {
  const normalizedEmail = normalizeEmail(email);
  if (accounts.some((account) => account.email === normalizedEmail)) {
    return { error: 'An account with this email already exists. Try logging in instead.' };
  }
  const user = {
    userId: `u${accounts.length + 1}`,
    displayName: fullName.trim(),
    email: normalizedEmail,
  };
  accounts.push(user);
  return { user };
}
