import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';
import ProviderThumb from './ProviderThumb';
import StatusBadge from './StatusBadge';

// A restaurant row for the Browse list. Unavailable restaurants stay tappable
// (the details screen explains the situation) but look clearly dimmed.
export default function RestaurantCard({ provider, onPress }) {
  const { name, cuisine, emoji, deliveryTime, isAvailable } = provider;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${cuisine}, ${isAvailable ? 'available' : 'unavailable'}`}
      accessibilityHint="Opens restaurant details"
      style={({ pressed }) => [styles.card, !isAvailable && styles.cardUnavailable, pressed && styles.pressed]}
    >
      <ProviderThumb emoji={emoji} size={64} isAvailable={isAvailable} />
      <View style={styles.details}>
        <Text style={[styles.name, !isAvailable && styles.muted]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {cuisine} · {deliveryTime}
        </Text>
        <View style={styles.badgeRow}>
          <StatusBadge isAvailable={isAvailable} />
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardUnavailable: {
    backgroundColor: colors.background,
  },
  pressed: {
    opacity: 0.8,
  },
  details: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.heading,
    color: colors.text,
  },
  muted: {
    color: colors.textMuted,
  },
  meta: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  badgeRow: {
    marginTop: spacing.sm,
  },
  chevron: {
    fontSize: 24,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
});
