// Prices are stored as integer piasters; show them as Egyptian pounds.
export function formatPrice(piasters) {
  return `EGP ${(piasters / 100).toFixed(2)}`;
}
