import { cuisineIcons, menuItems, providers } from '../data/mockData';

export function getProviders() {
  return providers;
}

export function getProviderById(providerId) {
  return providers.find((provider) => provider.providerId === providerId) ?? null;
}

export function getFeaturedProviders(limit = 4) {
  return providers.filter((provider) => provider.isAvailable).slice(0, limit);
}

export function getCuisines() {
  const names = [...new Set(providers.map((provider) => provider.cuisine))];
  return names.map((name) => ({ name, icon: cuisineIcons[name] ?? '🍽️' }));
}

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

export function isMenuItemOrderable(item) {
  const provider = getProviderById(item.providerId);
  return Boolean(provider && provider.isAvailable && item.isAvailable);
}

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
