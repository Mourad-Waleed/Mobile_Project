import { getProviderById } from './restaurantRepository';

export const GROUP_STATUS = {
  open: 'Open',
  finalized: 'Finalized',
  cancelled: 'Cancelled',
};

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
    participants: [{ id: organizer.userId, name: organizer.displayName }],
  };
  groups.push(group);
  return group;
}

export function findGroupByCode(code) {
  const normalized = normalizeCode(code);
  return groups.find((group) => group.code === normalized) ?? null;
}

export function getGroupDetails(code) {
  const group = findGroupByCode(code);
  if (!group) {
    return null;
  }
  return { ...group, provider: getProviderById(group.providerId) };
}

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
