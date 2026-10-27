import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function CuisineChip({
  label,
  image,
  selected = false,
  onPress,
  variant = 'pill',
}) {
  const isTile = variant === 'tile';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.base,
        isTile ? styles.tile : styles.pill,
        selected && styles.selected,
      ]}
    >
      {image ? (
        <Image
          source={image}
          resizeMode="contain"
          style={isTile ? styles.tileImage : styles.pillImage}
        />
      ) : null}

      <Text
        style={[styles.label, isTile && styles.tileLabel, selected && styles.selectedLabel]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
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
    width: 100,
    minHeight: 104,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillImage: {
    width: 22,
    height: 22,
    marginRight: spacing.sm,
  },
  tileImage: {
    width: 44,
    height: 44,
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.label,
    color: colors.text,
  },
  tileLabel: {
    textAlign: 'center',
    lineHeight: 18,
  },
  selectedLabel: {
    color: colors.onPrimary,
  },
});
