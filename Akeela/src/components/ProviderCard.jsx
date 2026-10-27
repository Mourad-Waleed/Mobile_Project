import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';
import { providerImages } from '../constants/images';
import AppButton from './AppButton';
import ProviderThumb from './ProviderThumb';
import StatusBadge from './StatusBadge';

export default function ProviderCard({ provider, onPress, onStartGroup }) {
  const { name, cuisine, isAvailable } = provider;

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.info}>
        <ProviderThumb image={providerImages[provider.providerId]} size={56} isAvailable={isAvailable} />
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
      </TouchableOpacity>

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
  details: {
    flex: 1,
    marginLeft: spacing.md,
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
