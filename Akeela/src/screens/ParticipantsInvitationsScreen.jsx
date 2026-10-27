import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function ParticipantsInvitationsScreen({ group, onBack, currentUserId }) {
  if (!group) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Participants" onBack={onBack} />
        <EmptyState title="Group not found" message="Group information could not be found." />
      </ScreenContainer>
    );
  }

  const isOrganizer = currentUserId === group.organizerId;
  const isOpen = group.status === 'Open';

  return (
    <ScreenContainer>
      <ScreenHeader title="Participants & Invitations" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          See who's joining your order and invite others to participate.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Group Information</Text>
          <Text style={styles.groupName}>{group.groupName}</Text>
          <Text style={styles.restaurantName}>{group.provider?.name}</Text>

          <View style={styles.statusRow}>
            <Text style={styles.label}>Group status</Text>
            <View style={[styles.statusBadge, isOpen ? styles.openBadge : styles.closedBadge]}>
              <Text style={[styles.statusText, !isOpen && styles.closedText]}>{group.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Invite Friends</Text>
          <Text style={styles.description}>
            Share this code with anyone who wants to join your group order.
          </Text>

          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>INVITATION CODE</Text>
            <Text style={styles.codeText}>{group.code}</Text>
          </View>

          <AppButton title="Share Invitation" onPress={() => {}} style={styles.shareButton} />
        </View>

        <View style={styles.card}>
          <View style={styles.participantsHeader}>
            <Text style={styles.sectionTitle}>Participants</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{group.participants.length}</Text>
            </View>
          </View>

          {group.participants.map((participant) => (
            <View key={participant.id} style={styles.participantRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{participant.name.charAt(0).toUpperCase()}</Text>
              </View>

              <View style={styles.participantInfo}>
                <Text style={styles.participantName}>{participant.name}</Text>
                {participant.id === group.organizerId && (
                  <Text style={styles.organizerLabel}>Organizer</Text>
                )}
              </View>
            </View>
          ))}

          {isOrganizer && (
            <Text style={styles.organizerNote}>You are the organizer of this group.</Text>
          )}
        </View>

        <AppButton title="Back to Group Details" variant="secondary" onPress={onBack} />
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
    lineHeight: 22,
    marginBottom: spacing.lg,
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
  },
  groupName: {
    ...typography.heading,
    fontSize: 20,
    color: colors.text,
    marginTop: spacing.md,
  },
  restaurantName: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...typography.body,
    color: colors.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  openBadge: {
    backgroundColor: colors.successTint,
  },
  closedBadge: {
    backgroundColor: colors.dangerTint,
  },
  statusText: {
    ...typography.label,
    color: colors.success,
  },
  closedText: {
    color: colors.danger,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 21,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  codeBox: {
    backgroundColor: colors.primaryTint,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  codeLabel: {
    ...typography.eyebrow,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  codeText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
    color: colors.text,
  },
  shareButton: {
    marginTop: spacing.md,
  },
  participantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  countBadge: {
    backgroundColor: colors.primaryTint,
    borderRadius: radius.pill,
    minWidth: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  countText: {
    color: colors.primary,
    fontWeight: '700',
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  organizerLabel: {
    ...typography.label,
    color: colors.primary,
    marginTop: 2,
  },
  organizerNote: {
    ...typography.label,
    fontWeight: '400',
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});
