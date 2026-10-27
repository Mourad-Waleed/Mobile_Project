export function formatPrice(piasters) {
  return `EGP ${(piasters / 100).toFixed(2)}`;
}
