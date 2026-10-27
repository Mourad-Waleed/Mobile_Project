import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import ProviderCard from '../components/ProviderCard';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function ProviderDiscoveryScreen({
  currentUser,
  providers,
  onJoinPress,
  onProviderPress,
  onStartGroup,
  onBack,
}) {
  const availableCount = providers.filter((provider) => provider.isAvailable).length;

  const header = (
    <View>
      <Text style={styles.eyebrow}>SHARED FOOD ORDER</Text>
      <Text style={styles.greeting}>Hello, {currentUser.displayName}</Text>
      <Text style={styles.subtitle}>What are we ordering today?</Text>

      <View style={styles.joinBanner}>
        <View style={styles.joinText}>
          <Text style={styles.joinTitle}>Have a group code?</Text>
          <Text style={styles.joinBody}>Join your friends' order.</Text>
        </View>
        <AppButton title="Join with code" variant="secondary" onPress={onJoinPress} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Food providers</Text>
        <Text style={styles.sectionCount}>{availableCount} available now</Text>
      </View>
    </View>
  );

  return (
    <ScreenContainer>
      {onBack && <ScreenHeader title="Food providers" onBack={onBack} />}
      <FlatList
        data={providers}
        keyExtractor={(provider) => provider.providerId}
        ListHeaderComponent={header}
        ListEmptyComponent={<Text style={styles.empty}>No food providers to show right now.</Text>}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProviderCard
            provider={item}
            onPress={() => onProviderPress(item)}
            onStartGroup={() => onStartGroup(item)}
          />
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.eyebrow,
    color: colors.primary,
  },
  greeting: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  joinBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primaryTint,
  },
  joinText: {
    flex: 1,
    marginRight: spacing.sm,
  },
  joinTitle: {
    ...typography.heading,
    color: colors.text,
  },
  joinBody: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
  },
  sectionCount: {
    ...typography.label,
    color: colors.textMuted,
  },
  separator: {
    height: spacing.md,
  },
  empty: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
