import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';
import { formatPrice } from '../utils/format';

// One menu item. Unavailable items cannot be pressed and are clearly dimmed.
export default function MenuItemRow({ item, onPress }) {
  const { name, description, price, isAvailable } = item;

  return (
    <Pressable
      onPress={onPress}
      disabled={!isAvailable}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isAvailable }}
      accessibilityLabel={`${name}, ${formatPrice(price)}${isAvailable ? '' : ', unavailable'}`}
      accessibilityHint={isAvailable ? 'Opens food details' : undefined}
      style={({ pressed }) => [
        styles.row,
        !isAvailable && styles.rowUnavailable,
        pressed && isAvailable && styles.pressed,
      ]}
    >
      <View style={styles.text}>
        <Text style={[styles.name, !isAvailable && styles.muted]}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={[styles.price, !isAvailable && styles.muted]}>{formatPrice(price)}</Text>
      </View>
      {isAvailable ? (
        <Text style={styles.chevron}>›</Text>
      ) : (
        <View style={styles.tag}>
          <Text style={styles.tagText}>Unavailable</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowUnavailable: {
    backgroundColor: colors.background,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    flex: 1,
  },
  name: {
    ...typography.heading,
    fontSize: 16,
    color: colors.text,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  price: {
    ...typography.label,
    fontSize: 15,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  muted: {
    color: colors.textMuted,
  },
  chevron: {
    fontSize: 24,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
  tag: {
    marginLeft: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.dangerTint,
  },
  tagText: {
    ...typography.label,
    color: colors.danger,
  },
});
