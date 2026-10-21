import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

// A message for the whole form (not one field), such as "account already exists".
export default function FormMessage({ message }) {
  if (!message) return null;

  return (
    <View style={styles.box} accessibilityRole="alert">
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.dangerTint,
  },
  text: {
    ...typography.label,
    fontWeight: '500',
    color: colors.danger,
  },
});
