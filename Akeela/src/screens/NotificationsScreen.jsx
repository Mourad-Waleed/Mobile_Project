import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import { icons } from '../constants/images';
import { colors, radius, spacing } from '../theme/theme';

const initialNotifications = [
  {
    id: 'n1',
    title: 'Group order invitation',
    message: 'You have been invited to join a group food order.',
    time: '10 minutes ago',
    read: false,
    icon: icons.group,
  },
  {
    id: 'n2',
    title: 'Order confirmed',
    message: 'Your food order has been confirmed successfully.',
    time: '1 hour ago',
    read: false,
    icon: icons.check,
  },
  {
    id: 'n3',
    title: 'Group order update',
    message: 'Your group order details have been updated.',
    time: 'Yesterday',
    read: true,
    icon: icons.notification,
  },
  {
    id: 'n4',
    title: 'Discover new restaurants',
    message: 'Explore restaurants and share a meal with friends.',
    time: '2 days ago',
    read: true,
    icon: icons.search,
  },
];

export default function NotificationsScreen({ onBack }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((item) => ({ ...item, read: true })));
  };

  return (
    <ScreenContainer>
      <ScreenHeader title="Notifications" onBack={onBack} />

      <View style={styles.container}>
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryTitle}>Your notifications</Text>
            <Text style={styles.summaryText}>
              {unreadCount === 0
                ? 'You are all caught up!'
                : `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`}
            </Text>
          </View>

          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {notifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => markAsRead(item.id)}
              activeOpacity={0.8}
              style={[styles.notificationCard, !item.read && styles.unreadCard]}
            >
              <View style={styles.iconContainer}>
                <Image source={item.icon} style={styles.notificationIcon} />
              </View>

              <View style={styles.notificationContent}>
                <View style={styles.titleRow}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  {!item.read && <View style={styles.unreadDot} />}
                </View>

                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {notifications.length === 0 && (
            <View style={styles.emptyState}>
              <Image source={icons.notification} style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>No notifications</Text>
              <Text style={styles.emptyMessage}>New updates will appear here.</Text>
            </View>
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
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  summaryText: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  markAllButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  markAllText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  unreadCard: {
    backgroundColor: '#FFF7ED',
    borderColor: colors.primaryTint,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    width: 26,
    height: 26,
  },
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  notificationTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  message: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  time: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyIcon: {
    width: 48,
    height: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  emptyMessage: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
