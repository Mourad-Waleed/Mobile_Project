import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function GroupOrderDetailsScreen({
  group,
  onBack,
  onViewMenu,
  onViewParticipants,
  onFinalize,
  onCancel,
  currentUserId,
}) {
  if (!group) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Group Order" onBack={onBack} />
        <EmptyState title="Group not found" message="We couldn't find this group order." />
      </ScreenContainer>
    );
  }

  const isOrganizer = currentUserId === group.organizerId;
  const isOpen = group.status === 'Open';

  const handleFinalize = () => {
    Alert.alert('Finalize Group Order', 'Are you sure you want to finalize this group order?', [
      { text: 'Keep Open', style: 'cancel' },
      { text: 'Finalize', onPress: onFinalize },
    ]);
  };

  const handleCancel = () => {
    Alert.alert('Cancel Group Order', 'Are you sure you want to cancel this group order?', [
      { text: 'Keep Open', style: 'cancel' },
      { text: 'Cancel Group', style: 'destructive', onPress: onCancel },
    ]);
  };

  return (
    <ScreenContainer>
      <ScreenHeader title={group.groupName} onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>{group.provider?.name ?? 'Selected restaurant'}</Text>

        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Group status</Text>
          <View style={[styles.statusBadge, !isOpen && styles.closedBadge]}>
            <Text style={styles.statusText}>{group.status}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Invitation Code</Text>
          <Text style={styles.code}>{group.code}</Text>
          <AppButton title="Share Invitation Code" onPress={() => {}} style={styles.shareButton} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Group Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Restaurant</Text>
            <Text style={styles.infoValue}>{group.provider?.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Deadline</Text>
            <Text style={styles.infoValue}>{group.deadline}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Participants</Text>
            <Text style={styles.infoValue}>{group.participants.length}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Participants</Text>

          {group.participants.map((participant) => (
            <View key={participant.id} style={styles.participantRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{participant.name.charAt(0).toUpperCase()}</Text>
              </View>
              <Text style={styles.participantName}>{participant.name}</Text>
            </View>
          ))}
        </View>

        <AppButton
          title="Participants & Invitations"
          variant="secondary"
          onPress={onViewParticipants}
        />
        <AppButton title="View Restaurant Menu" variant="secondary" onPress={onViewMenu} />

        {isOrganizer && isOpen && (
          <>
            <AppButton title="Finalize Order" onPress={handleFinalize} />
            <AppButton title="Cancel Group" variant="outline" onPress={handleCancel} />
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusLabel: {
    ...typography.body,
    color: colors.textMuted,
  },
  statusBadge: {
    backgroundColor: colors.successTint,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  closedBadge: {
    backgroundColor: colors.disabled,
  },
  statusText: {
    ...typography.label,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  code: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 3,
    textAlign: 'center',
    marginVertical: spacing.sm,
  },
  shareButton: {
    marginTop: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  infoLabel: {
    ...typography.body,
    color: colors.textMuted,
    flex: 1,
  },
  infoValue: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    textAlign: 'right',
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  participantName: {
    ...typography.body,
    color: colors.text,
  },
});
