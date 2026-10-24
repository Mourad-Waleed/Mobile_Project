import { getProviderById } from './restaurantRepository';

// Group orders live in memory only: they disappear when the app reloads and are
// not shared between devices. A real backend would replace the inside of these
// functions without changing any screen.

export const GROUP_STATUS = {
  open: 'Open',
  finalized: 'Finalized',
  cancelled: 'Cancelled',
};

// Letters and digits people can read out loud: no 0/O or 1/I.
const CODE_CHARACTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 6;

const groups = [];

export function normalizeCode(code) {
  return code.trim().toUpperCase();
}

function generateUniqueCode() {
  let code;
  do {
    code = Array.from(
      { length: CODE_LENGTH },
      () => CODE_CHARACTERS[Math.floor(Math.random() * CODE_CHARACTERS.length)],
    ).join('');
  } while (groups.some((group) => group.code === code));
  return code;
}

// Stores a new Open group and returns it. `organizer` is the logged-in user.
export function createGroup({ groupName, providerId, deadline, deliveryNotes = '', organizer }) {
  const group = {
    code: generateUniqueCode(),
    groupName,
    providerId,
    deadline,
    deliveryNotes,
    organizerId: organizer.userId,
    organizerName: organizer.displayName,
    status: GROUP_STATUS.open,
    // Just the id and display name: the app has no richer participant data yet.
    participants: [{ id: organizer.userId, name: organizer.displayName }],
  };
  groups.push(group);
  return group;
}

export function findGroupByCode(code) {
  const normalized = normalizeCode(code);
  return groups.find((group) => group.code === normalized) ?? null;
}

// The group plus its restaurant, ready for a screen to display.
export function getGroupDetails(code) {
  const group = findGroupByCode(code);
  if (!group) {
    return null;
  }
  return { ...group, provider: getProviderById(group.providerId) };
}

// Returns { group } on success or { error } with a friendly message.
export function joinGroup(code, user) {
  const group = findGroupByCode(code);
  if (!group) {
    return { error: 'Group not found. Check the code and try again.' };
  }
  if (group.status !== GROUP_STATUS.open) {
    return { error: `This group is ${group.status.toLowerCase()} and can no longer be joined.` };
  }
  if (group.participants.some((participant) => participant.id === user.userId)) {
    return {
      error:
        group.organizerId === user.userId
          ? 'You created this group, so you are already in it.'
          : 'You have already joined this group.',
    };
  }
  group.participants.push({ id: user.userId, name: user.displayName });
  return { group };
}

// Only the organizer can close an Open group. Returns { group } or { error }.
function closeGroup(code, user, status) {
  const group = findGroupByCode(code);
  if (!group) {
    return { error: 'Group not found.' };
  }
  if (group.organizerId !== user.userId) {
    return { error: 'Only the organizer can do this.' };
  }
  if (group.status !== GROUP_STATUS.open) {
    return { error: `This group is already ${group.status.toLowerCase()}.` };
  }
  group.status = status;
  return { group };
}

export function finalizeGroup(code, user) {
  return closeGroup(code, user, GROUP_STATUS.finalized);
}

export function cancelGroup(code, user) {
  return closeGroup(code, user, GROUP_STATUS.cancelled);
}
