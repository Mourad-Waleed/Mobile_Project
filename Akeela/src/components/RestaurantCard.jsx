import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';
import { providerImages } from '../constants/images';
import Icon from './Icon';
import ProviderThumb from './ProviderThumb';
import StatusBadge from './StatusBadge';

export default function RestaurantCard({ provider, onPress }) {
  const { name, cuisine, deliveryTime, isAvailable } = provider;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.card, !isAvailable && styles.cardUnavailable]}
    >
      <ProviderThumb image={providerImages[provider.providerId]} size={64} isAvailable={isAvailable} />
      <View style={styles.details}>
        <Text style={[styles.name, !isAvailable && styles.muted]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {cuisine} · {deliveryTime}
        </Text>
        <View style={styles.badgeRow}>
          <StatusBadge isAvailable={isAvailable} />
        </View>
      </View>
      <Icon name="chevron-right" size={18} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardUnavailable: {
    backgroundColor: colors.background,
  },
  details: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.heading,
    color: colors.text,
  },
  muted: {
    color: colors.textMuted,
  },
  meta: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  badgeRow: {
    marginTop: spacing.sm,
  },
});
