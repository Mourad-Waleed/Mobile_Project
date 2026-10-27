import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme/theme';

export default function ScreenHeader({ title, onBack }) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={8}
        style={({ pressed }) => [styles.back, pressed && styles.pressed]}
      >
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>
      <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  back: {
    minHeight: 44,
    justifyContent: 'center',
    paddingRight: spacing.md,
  },
  pressed: {
    opacity: 0.6,
  },
  backText: {
    ...typography.heading,
    fontSize: 16,
    color: colors.primary,
  },
  title: {
    flex: 1,
    ...typography.heading,
    color: colors.text,
  },
});
