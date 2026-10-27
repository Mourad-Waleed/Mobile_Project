import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';
import Icon from './Icon';

export default function ScreenHeader({ title, onBack, right }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        style={styles.backButton}
        accessibilityLabel="Go back"
      >
        <Icon name="chevron-left" size={20} color={colors.primary} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    flex: 1,
    marginLeft: spacing.md,
    ...typography.heading,
    color: colors.text,
  },
  right: {
    marginLeft: spacing.sm,
  },
});
