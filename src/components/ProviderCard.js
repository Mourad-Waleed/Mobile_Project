import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';
import AppButton from './AppButton';
import StatusBadge from './StatusBadge';

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

// onPress opens the provider (menu); onStartGroup starts a group order.
// The info area and the button are separate, so a screen reader can reach both.
export default function ProviderCard({ provider, onPress, onStartGroup }) {
  const { name, cuisine, isAvailable } = provider;

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${cuisine}, ${isAvailable ? 'available' : 'unavailable'}`}
        accessibilityHint="Opens the provider"
        style={({ pressed }) => [styles.info, pressed && styles.pressed]}
      >
        <View style={[styles.avatar, !isAvailable && styles.avatarMuted]}>
          <Text style={[styles.initials, !isAvailable && styles.initialsMuted]}>
            {getInitials(name)}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={[styles.name, !isAvailable && styles.textMuted]} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.cuisine} numberOfLines={1}>
            {cuisine}
          </Text>
          <View style={styles.badgeRow}>
            <StatusBadge isAvailable={isAvailable} />
          </View>
        </View>
      </Pressable>

      <AppButton title="Start group" onPress={onStartGroup} disabled={!isAvailable} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
  avatar: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.primaryTint,
    marginRight: spacing.md,
  },
  avatarMuted: {
    backgroundColor: colors.disabled,
  },
  initials: {
    ...typography.heading,
    color: colors.primary,
  },
  initialsMuted: {
    color: colors.disabledText,
  },
  details: {
    flex: 1,
  },
  name: {
    ...typography.heading,
    color: colors.text,
  },
  textMuted: {
    color: colors.textMuted,
  },
  cuisine: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  badgeRow: {
    marginTop: spacing.sm,
  },
});
