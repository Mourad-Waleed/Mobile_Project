import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import CuisineChip from '../components/CuisineChip';
import FeaturedCard from '../components/FeaturedCard';
import IconButton from '../components/IconButton';
import ScreenContainer from '../components/ScreenContainer';
import SearchBar from '../components/SearchBar';
import { icons } from '../constants/images';
import { getCuisines, getFeaturedProviders } from '../repositories/restaurantRepository';
import { colors, spacing, typography } from '../theme/theme';

export default function HomeScreen({
  user,
  cartCount,
  onSearchPress,
  onCuisinePress,
  onBrowsePress,
  onProviderPress,
  onGroupOrderPress,
  onCartPress,
  onNotificationsPress,
  onProfilePress,
}) {
  const cuisines = getCuisines();
  const featured = getFeaturedProviders();

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.padded}>
          <View style={styles.topRow}>
            <Text style={styles.eyebrow}>AKEELA</Text>

            <View style={styles.iconRow}>
              <IconButton source={icons.cart} label="Cart" count={cartCount} onPress={onCartPress} />
              <IconButton
                source={icons.notification}
                label="Notifications"
                onPress={onNotificationsPress}
              />
              <IconButton source={icons.profile} label="My profile" onPress={onProfilePress} />
            </View>
          </View>

          <Text style={styles.greeting}>Hello, {user?.displayName || 'there'}</Text>
          <Text style={styles.subtitle}>What are we ordering today?</Text>

          <View style={styles.search}>
            <SearchBar onPress={onSearchPress} />
          </View>
        </View>

        <Text style={[styles.sectionTitle, styles.padded]}>Explore cuisines</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {cuisines.map((cuisine) => (
            <CuisineChip
              key={cuisine.name}
              variant="tile"
              label={cuisine.name}
              image={cuisine.image}
              onPress={() => onCuisinePress(cuisine.name)}
            />
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, styles.padded]}>Featured restaurants</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {featured.map((provider) => (
            <FeaturedCard
              key={provider.providerId}
              provider={provider}
              onPress={() => onProviderPress(provider.providerId)}
            />
          ))}
        </ScrollView>

        <View style={styles.padded}>
          <AppButton title="Browse All Restaurants" onPress={onBrowsePress} />

          <View style={styles.groupLink}>
            <Text style={styles.groupText}>Ordering with friends?</Text>
            <AppButton title="Start or Join a Group" variant="text" onPress={onGroupOrderPress} />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  padded: {
    paddingHorizontal: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconRow: {
    flexDirection: 'row',
    gap: spacing.sm + 2,
  },
  eyebrow: {
    ...typography.eyebrow,
    color: colors.primary,
  },
  greeting: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  search: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  row: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm + 2,
  },
  groupLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  groupText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
