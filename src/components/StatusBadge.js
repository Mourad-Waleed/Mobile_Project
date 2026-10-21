import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

// Shows availability with a dot AND a text label, so it never relies on colour alone.
export default function StatusBadge({ isAvailable }) {
  const tint = isAvailable ? colors.successTint : colors.dangerTint;
  const ink = isAvailable ? colors.success : colors.danger;

  return (
    <View style={[styles.badge, { backgroundColor: tint }]}>
      <View style={[styles.dot, { backgroundColor: ink }]} />
      <Text style={[styles.label, { color: ink }]}>
        {isAvailable ? 'Available' : 'Unavailable'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    marginRight: spacing.xs + 2,
  },
  label: {
    ...typography.label,
  },
});
