import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';
import ProviderThumb from './ProviderThumb';
import StatusBadge from './StatusBadge';

export default function FeaturedCard({ provider, onPress }) {
  const { name, cuisine, emoji, deliveryTime, isAvailable } = provider;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${cuisine}, ${isAvailable ? 'available' : 'unavailable'}`}
      accessibilityHint="Opens restaurant details"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <ProviderThumb emoji={emoji} size={72} isAvailable={isAvailable} />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {cuisine} · {deliveryTime}
      </Text>
      <View style={styles.badgeRow}>
        <StatusBadge isAvailable={isAvailable} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 190,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.8,
  },
  name: {
    ...typography.heading,
    color: colors.text,
    marginTop: spacing.md,
  },
  meta: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  badgeRow: {
    marginTop: spacing.sm,
  },
});
