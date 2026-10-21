import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import CuisineChip from '../components/CuisineChip';
import EmptyState from '../components/EmptyState';
import RestaurantCard from '../components/RestaurantCard';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import SearchBar from '../components/SearchBar';
import { getCuisines, searchProviders } from '../repositories/restaurantRepository';
import { colors, spacing, typography } from '../theme/theme';

// Browse: search by name or cuisine and filter by cuisine.
// initialCuisine pre-selects a filter (from a Home shortcut); autoFocusSearch
// opens the keyboard (from the Home search bar).
export default function BrowseRestaurantsScreen({
  initialCuisine = null,
  autoFocusSearch = false,
  onBack,
  onProviderPress,
}) {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState(initialCuisine);

  const cuisines = getCuisines();
  const results = searchProviders({ query, cuisine });
  const hasFilters = query.trim().length > 0 || cuisine !== null;

  const clearFilters = () => {
    setQuery('');
    setCuisine(null);
  };

  return (
    <ScreenContainer>
      <ScreenHeader title="Restaurants" onBack={onBack} />
      <View style={styles.controls}>
        <SearchBar value={query} onChangeText={setQuery} autoFocus={autoFocusSearch} />
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.chips}
        >
          <CuisineChip label="All" selected={cuisine === null} onPress={() => setCuisine(null)} />
          {cuisines.map((item) => (
            <CuisineChip
              key={item.name}
              label={item.name}
              icon={item.icon}
              selected={cuisine === item.name}
              onPress={() => setCuisine(item.name)}
            />
          ))}
        </ScrollView>
      </View>
      <Text style={styles.count}>
        {results.length} {results.length === 1 ? 'restaurant' : 'restaurants'}
      </Text>
      <FlatList
        data={results}
        keyExtractor={(provider) => provider.providerId}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <EmptyState
            title="No restaurants found"
            message="Try a different name or cuisine."
            actionLabel={hasFilters ? 'Clear search and filters' : undefined}
            onAction={clearFilters}
          />
        }
        renderItem={({ item }) => (
          <RestaurantCard provider={item} onPress={() => onProviderPress(item.providerId)} />
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  controls: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
  },
  chips: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  count: {
    ...typography.label,
    color: colors.textMuted,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  separator: {
    height: spacing.sm + 2,
  },
});
