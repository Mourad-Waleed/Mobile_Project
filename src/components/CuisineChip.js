import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function CuisineChip({ label, icon, selected = false, onPress, variant = 'pill' }) {
  const isTile = variant === 'tile';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        isTile ? styles.tile : styles.pill,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      {icon ? <Text style={isTile ? styles.tileIcon : styles.pillIcon}>{icon}</Text> : null}
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pill: {
    flexDirection: 'row',
    minHeight: 40,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
  },
  tile: {
    width: 84,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  pillIcon: {
    fontSize: 16,
    marginRight: spacing.xs + 2,
  },
  tileIcon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.label,
    color: colors.text,
  },
  selectedLabel: {
    color: colors.onPrimary,
  },
});
