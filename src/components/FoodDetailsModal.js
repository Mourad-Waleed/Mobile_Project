import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';
import { formatPrice } from '../utils/format';
import AppButton from './AppButton';
import StatusBadge from './StatusBadge';

// Bottom sheet with a food item's details. It is shown whenever `item` is set,
// and closes through onClose (Close button, tapping outside, or Android back).
export default function FoodDetailsModal({ item, onClose }) {
  return (
    <Modal visible={Boolean(item)} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        style={styles.overlay}
        onPress={onClose}
        accessibilityLabel="Close food details"
      >
        {/* The inner Pressable stops taps on the sheet from reaching the overlay. */}
        <Pressable style={styles.sheet} onPress={() => {}}>
          {item && (
            <View>
              <Text style={styles.category}>{item.category.toUpperCase()}</Text>
              <Text style={styles.name} accessibilityRole="header">
                {item.name}
              </Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
              <View style={styles.badgeRow}>
                <StatusBadge isAvailable={item.isAvailable} />
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <AppButton title="Close" variant="secondary" onPress={onClose} />
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    padding: spacing.lg,
    borderTopLeftRadius: radius.md + 6,
    borderTopRightRadius: radius.md + 6,
    backgroundColor: colors.surface,
  },
  category: {
    ...typography.eyebrow,
    color: colors.primary,
  },
  name: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.xs,
  },
  price: {
    ...typography.heading,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  badgeRow: {
    marginTop: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    marginVertical: spacing.md,
  },
});
