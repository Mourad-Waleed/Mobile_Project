import { currentUser } from '../data/mockData';

// Mock authentication for the prototype. It is NOT secure and is not meant to be.
// - Accounts live in memory and disappear when the app reloads.
// - Passwords are never passed in, stored or checked.
// A real version would call an authentication service instead.

const accounts = [currentUser];

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

// Returns { user } on success or { error } with a friendly message.
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
