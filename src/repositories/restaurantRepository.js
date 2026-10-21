import { cuisineIcons, menuItems, providers } from '../data/mockData';

// The one place screens read restaurant data from. Today it reads the mock
// data; a real backend or database could replace the inside of these functions
// without changing any screen.

export function getProviders() {
  return providers;
}

export function getProviderById(providerId) {
  return providers.find((provider) => provider.providerId === providerId) ?? null;
}

// The first few available providers, shown on the Home screen.
export function getFeaturedProviders(limit = 4) {
  return providers.filter((provider) => provider.isAvailable).slice(0, limit);
}

// Unique cuisines in the order they first appear: [{ name, icon }].
export function getCuisines() {
  const names = [...new Set(providers.map((provider) => provider.cuisine))];
  return names.map((name) => ({ name, icon: cuisineIcons[name] ?? '🍽️' }));
}

// query matches the name or cuisine (ignoring case); cuisine is an exact
// cuisine name, or null for all cuisines.
export function searchProviders({ query = '', cuisine = null } = {}) {
  const text = query.trim().toLowerCase();
  return providers.filter((provider) => {
    const matchesCuisine = !cuisine || provider.cuisine === cuisine;
    const matchesText =
      !text ||
      provider.name.toLowerCase().includes(text) ||
      provider.cuisine.toLowerCase().includes(text);
    return matchesCuisine && matchesText;
  });
}

export function getMenuItems(providerId) {
  return menuItems.filter((item) => item.providerId === providerId);
}

// Menu items grouped by category, in the shape SectionList expects:
// [{ title, data: [item, ...] }].
export function getMenuSections(providerId) {
  const sections = [];
  getMenuItems(providerId).forEach((item) => {
    let section = sections.find((candidate) => candidate.title === item.category);
    if (!section) {
      section = { title: item.category, data: [] };
      sections.push(section);
    }
    section.data.push(item);
  });
  return sections;
}
