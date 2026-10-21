import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import ProviderThumb from '../components/ProviderThumb';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import StatusBadge from '../components/StatusBadge';
import { getMenuItems, getProviderById } from '../repositories/restaurantRepository';
import { colors, radius, spacing, typography } from '../theme/theme';

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

// Restaurant details for the restaurant whose id is passed in.
// An unavailable restaurant shows a notice and its menu button is disabled.
export default function RestaurantDetailsScreen({ providerId, onBack, onViewMenu }) {
  const provider = getProviderById(providerId);

  if (!provider) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Restaurant" onBack={onBack} />
        <EmptyState title="Restaurant not found" message="This restaurant is no longer listed." />
      </ScreenContainer>
    );
  }

  const items = getMenuItems(provider.providerId);
  const availableItems = items.filter((item) => item.isAvailable).length;

  return (
    <ScreenContainer>
      <ScreenHeader title="Restaurant" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <ProviderThumb emoji={provider.emoji} size={96} isAvailable={provider.isAvailable} />
          <Text style={styles.name} accessibilityRole="header">
            {provider.name}
          </Text>
          <Text style={styles.cuisine}>{provider.cuisine}</Text>
          <View style={styles.badge}>
            <StatusBadge isAvailable={provider.isAvailable} />
          </View>
        </View>

        {!provider.isAvailable && (
          <View style={styles.notice} accessibilityRole="alert">
            <Text style={styles.noticeText}>
              This restaurant is unavailable right now, so its menu can't be opened. Please check
              back later or choose another restaurant.
            </Text>
          </View>
        )}

        <Text style={styles.description}>{provider.description}</Text>

        <View style={styles.infoCard}>
          <InfoRow label="Address" value={provider.address} />
          <InfoRow label="Opening hours" value={provider.openingHours} />
          <InfoRow label="Delivery time" value={provider.deliveryTime} />
          <InfoRow
            label="Menu"
            value={`${availableItems} of ${items.length} items available`}
          />
        </View>

        <AppButton
          title={provider.isAvailable ? 'View menu' : 'Menu unavailable'}
          onPress={() => onViewMenu(provider.providerId)}
          disabled={!provider.isAvailable}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  name: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  cuisine: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  badge: {
    marginTop: spacing.sm,
  },
  notice: {
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.dangerTint,
  },
  noticeText: {
    ...typography.label,
    fontWeight: '500',
    color: colors.danger,
  },
  description: {
    ...typography.body,
    color: colors.text,
    marginVertical: spacing.md,
  },
  infoCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    ...typography.eyebrow,
    color: colors.textMuted,
  },
  infoValue: {
    ...typography.body,
    color: colors.text,
    marginTop: 2,
  },
});
