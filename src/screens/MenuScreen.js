import { useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import FoodDetailsModal from '../components/FoodDetailsModal';
import MenuItemRow from '../components/MenuItemRow';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import { getMenuSections, getProviderById } from '../repositories/restaurantRepository';
import { colors, spacing, typography } from '../theme/theme';

// Menu for the restaurant whose id is passed in (so Back returns to the same
// restaurant). Tapping an available item opens its details; unavailable items
// cannot be opened.
export default function MenuScreen({ providerId, onBack }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const provider = getProviderById(providerId);
  const sections = getMenuSections(providerId);

  return (
    <ScreenContainer>
      <ScreenHeader title={provider ? `${provider.name} menu` : 'Menu'} onBack={onBack} />
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.menuItemId}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle} accessibilityRole="header">
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => (
          <MenuItemRow item={item} onPress={() => setSelectedItem(item)} />
        )}
        ListEmptyComponent={
          <EmptyState title="No menu yet" message="This restaurant has not added any items." />
        }
      />
      <FoodDetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  separator: {
    height: spacing.sm + 2,
  },
});
