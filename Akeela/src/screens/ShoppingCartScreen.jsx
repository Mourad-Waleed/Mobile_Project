import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../components/AppButton';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import { icons } from '../constants/images';
import { groupMembers } from '../data/mockData';
import { colors, radius, spacing, typography } from '../theme/theme';
import { formatPrice } from '../utils/format';

function sumItems(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function ItemRow({ item, onDecrease, onIncrease, onRemove, editable = true }) {
  return (
    <View style={styles.itemRow}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.price)} each</Text>
        <Text style={styles.lineTotal}>{formatPrice(item.price * item.quantity)}</Text>
      </View>

      {editable ? (
        <View style={styles.controls}>
          <TouchableOpacity style={styles.quantityButton} onPress={onDecrease}>
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={onIncrease}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.fixedQuantity}>× {item.quantity}</Text>
      )}
    </View>
  );
}

export default function ShoppingCartScreen({
  cartItems = [],
  isGroupOrder = false,
  onBack,
  onChangeQuantity,
  onRemoveItem,
  onContinue,
  onBrowseMenu,
  userName = 'You',
  restaurantName = 'Your restaurant',
}) {
  const ownTotal = sumItems(cartItems);
  const membersTotal = isGroupOrder
    ? groupMembers.reduce((sum, member) => sum + sumItems(member.items), 0)
    : 0;
  const hasItems = cartItems.length > 0 || isGroupOrder;

  return (
    <ScreenContainer>
      <ScreenHeader title="Shopping cart" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>{isGroupOrder ? 'GROUP ORDER' : 'YOUR ORDER'}</Text>
          <Text style={styles.title}>{restaurantName}</Text>
          <Text style={styles.subtitle}>
            {isGroupOrder
              ? 'Everyone’s selections, organized by participant.'
              : 'Review your selected food before continuing.'}
          </Text>
        </View>

        {!hasItems ? (
          <View style={styles.emptyCard}>
            <Image source={icons.cart} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.subtitle}>Choose something tasty from the menu to get started.</Text>
            <AppButton title="Browse menu" onPress={onBrowseMenu} />
          </View>
        ) : (
          <>
            <View style={styles.sectionCard}>
              <View style={styles.participantHeading}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{userName.slice(0, 1).toUpperCase()}</Text>
                </View>
                <View style={styles.participantCopy}>
                  <Text style={styles.participantName}>{userName} (you)</Text>
                  <Text style={styles.muted}>
                    {cartItems.length} item type{cartItems.length === 1 ? '' : 's'}
                  </Text>
                </View>
                <Text style={styles.subtotal}>{formatPrice(ownTotal)}</Text>
              </View>

              {cartItems.length ? (
                cartItems.map((item) => (
                  <ItemRow
                    key={item.cartItemId}
                    item={item}
                    onDecrease={() => onChangeQuantity(item.cartItemId, -1)}
                    onIncrease={() => onChangeQuantity(item.cartItemId, 1)}
                    onRemove={() => onRemoveItem(item.cartItemId)}
                  />
                ))
              ) : (
                <Text style={styles.emptyOwn}>You haven’t added any items yet.</Text>
              )}
            </View>

            {isGroupOrder &&
              groupMembers.map((member) => (
                <View key={member.name} style={styles.sectionCard}>
                  <View style={styles.participantHeading}>
                    <View style={[styles.avatar, styles.memberAvatar]}>
                      <Text style={styles.avatarText}>{member.name.slice(0, 1)}</Text>
                    </View>
                    <View style={styles.participantCopy}>
                      <Text style={styles.participantName}>{member.name}</Text>
                      <Text style={styles.muted}>Participant</Text>
                    </View>
                    <Text style={styles.subtotal}>{formatPrice(sumItems(member.items))}</Text>
                  </View>

                  {member.items.map((item) => (
                    <ItemRow key={item.name} item={item} editable={false} />
                  ))}
                </View>
              ))}

            <View style={styles.totalCard}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Food subtotal</Text>
                <Text style={styles.totalValue}>{formatPrice(ownTotal + membersTotal)}</Text>
              </View>
              <Text style={styles.muted}>Delivery and final fees are shown in the order summary.</Text>
            </View>

            <AppButton
              title={isGroupOrder ? 'Review group order' : 'Review order'}
              onPress={onContinue}
            />
            <AppButton title="Continue shopping" variant="secondary" onPress={onBrowseMenu} />
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.md },
  intro: { marginBottom: spacing.xs },
  eyebrow: { ...typography.eyebrow, color: colors.primary, marginBottom: spacing.xs },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.xs, lineHeight: 22 },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  participantHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatar: { backgroundColor: colors.successTint },
  avatarText: { color: colors.primary, fontWeight: '700' },
  participantCopy: { flex: 1 },
  participantName: { ...typography.heading, fontSize: 16, color: colors.text },
  muted: { ...typography.label, color: colors.textMuted, marginTop: 2 },
  subtotal: { ...typography.label, color: colors.text, fontSize: 14 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  itemInfo: { flex: 1 },
  itemName: { ...typography.body, color: colors.text, fontWeight: '600' },
  itemPrice: { ...typography.label, color: colors.textMuted, marginTop: 3 },
  lineTotal: { ...typography.label, color: colors.primary, marginTop: 4 },
  controls: { alignItems: 'center', gap: spacing.xs },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  quantityButtonText: { color: colors.text, fontSize: 20, lineHeight: 22 },
  quantity: { ...typography.label, color: colors.text, minWidth: 20, textAlign: 'center' },
  removeButton: { padding: 4 },
  removeText: { ...typography.label, color: colors.danger },
  fixedQuantity: { ...typography.label, color: colors.textMuted },
  totalCard: {
    padding: spacing.md,
    backgroundColor: colors.primaryTint,
    borderRadius: radius.md,
    gap: spacing.sm,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { ...typography.heading, color: colors.text },
  totalValue: { ...typography.heading, color: colors.primary, fontSize: 20 },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyIcon: { width: 56, height: 56 },
  emptyTitle: { ...typography.heading, color: colors.text },
  emptyOwn: { ...typography.body, color: colors.textMuted, paddingVertical: spacing.sm },
});
