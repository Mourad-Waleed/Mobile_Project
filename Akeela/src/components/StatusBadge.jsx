import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function StatusBadge({ isAvailable }) {
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: isAvailable ? colors.successTint : colors.dangerTint },
      ]}
    >
      <Text style={[styles.label, { color: isAvailable ? colors.success : colors.danger }]}>
        {isAvailable ? 'Available' : 'Unavailable'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
  },
  label: {
    ...typography.label,
  },
});
