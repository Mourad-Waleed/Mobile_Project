import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProviderThumb from '../components/ProviderThumb';
import ScreenContainer from '../components/ScreenContainer';
import { providerImages } from '../constants/images';
import { colors, radius, spacing, typography } from '../theme/theme';

const orders = [
  {
    id: 'ORD-1001',
    providerId: 'p5',
    restaurant: 'Burger Yard',
    items: '2 Burgers, 1 Fries, 2 Drinks',
    date: 'Oct 20, 2026',
    total: 420,
    status: 'Completed',
  },
  {
    id: 'ORD-1002',
    providerId: 'p7',
    restaurant: 'Pasta Corner',
    items: '1 Penne Arrabbiata, 1 Margherita Pizza',
    date: 'Oct 18, 2026',
    total: 350,
    status: 'Completed',
  },
  {
    id: 'ORD-1003',
    providerId: 'p6',
    restaurant: 'Green Bowl',
    items: '2 Quinoa Power Bowls',
    date: 'Oct 15, 2026',
    total: 280,
    status: 'Cancelled',
  },
];

const filters = ['All', 'Completed', 'Cancelled'];

export default function OrderHistoryScreen({ onReorder }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredOrders =
    selectedFilter === 'All'
      ? orders
      : orders.filter((order) => order.status === selectedFilter);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Order History</Text>
          <Text style={styles.subtitle}>Your previous food orders</Text>
        </View>

        <View style={styles.filterRow}>
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter;

            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={[styles.filterButton, isSelected && styles.selectedFilter]}
              >
                <Text style={[styles.filterText, isSelected && styles.selectedFilterText]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.orderList}>
          {filteredOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No orders found</Text>
              <Text style={styles.emptyText}>Your orders in this category will appear here.</Text>
            </View>
          ) : (
            filteredOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderTop}>
                  <ProviderThumb image={providerImages[order.providerId]} size={46} />

                  <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{order.restaurant}</Text>
                    <Text style={styles.orderId}>{order.id}</Text>
                  </View>

                  <View
                    style={[
                      styles.statusBadge,
                      order.status === 'Completed' ? styles.completedBadge : styles.cancelledBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        order.status === 'Completed' ? styles.completedText : styles.cancelledText,
                      ]}
                    >
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.items}>{order.items}</Text>
                <Text style={styles.date}>{order.date}</Text>

                <View style={styles.orderBottom}>
                  <View>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.total}>EGP {order.total}</Text>
                  </View>

                  <TouchableOpacity style={styles.reorderButton} onPress={() => onReorder(order)}>
                    <Text style={styles.reorderText}>Reorder</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedFilterText: {
    color: colors.onPrimary,
  },
  orderList: {
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  orderId: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  completedBadge: {
    backgroundColor: colors.successTint,
  },
  cancelledBadge: {
    backgroundColor: colors.dangerTint,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  completedText: {
    color: colors.success,
  },
  cancelledText: {
    color: colors.danger,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  items: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 21,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  orderBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  totalLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  total: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginTop: 3,
  },
  reorderButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.md,
  },
  reorderText: {
    color: colors.onPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
