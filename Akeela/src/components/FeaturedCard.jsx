import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';
import { providerImages } from '../constants/images';
import ProviderThumb from './ProviderThumb';
import StatusBadge from './StatusBadge';

export default function FeaturedCard({ provider, onPress }) {
  const { name, cuisine, deliveryTime, isAvailable } = provider;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <ProviderThumb image={providerImages[provider.providerId]} size={72} isAvailable={isAvailable} />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {cuisine} · {deliveryTime}
      </Text>
      <View style={styles.badgeRow}>
        <StatusBadge isAvailable={isAvailable} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 190,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: {
    ...typography.heading,
    color: colors.text,
    marginTop: spacing.md,
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
