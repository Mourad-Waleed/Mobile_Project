import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';
import { formatPrice } from '../utils/format';
import Icon from './Icon';

export default function MenuItemRow({ item, onPress }) {
  const { name, description, price, isAvailable } = item;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!isAvailable}
      activeOpacity={0.8}
      style={[styles.row, !isAvailable && styles.rowUnavailable]}
    >
      <View style={styles.text}>
        <Text style={[styles.name, !isAvailable && styles.muted]}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={[styles.price, !isAvailable && styles.muted]}>{formatPrice(price)}</Text>
      </View>
      {isAvailable ? (
        <Icon name="chevron-right" size={18} color={colors.textMuted} />
      ) : (
        <View style={styles.tag}>
          <Text style={styles.tagText}>Unavailable</Text>
        </View>
      )}
    </TouchableOpacity>
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
