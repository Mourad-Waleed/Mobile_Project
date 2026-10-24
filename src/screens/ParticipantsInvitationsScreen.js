
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';

const ParticipantsInvitationsScreen = ({
  group,
  onBack,
  currentUserId,
}) => {
  if (!group) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Group information could not be found.
        </Text>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const groupName = group.groupName || group.name || 'Group Order';

  const restaurantName =
    group.provider?.name ||
    group.providerName ||
    group.restaurantName ||
    'Restaurant';

  const invitationCode =
    group.code ||
    group.invitationCode ||
    group.groupCode ||
    'No code available';

  const participants = Array.isArray(group.participants)
    ? group.participants
    : [];

  const organizerId =
    group.organizerId ||
    group.organizer?.id ||
    group.createdBy;

  const status = group.status || 'Open';

  const isOrganizer =
    currentUserId != null &&
    organizerId != null &&
    String(currentUserId) === String(organizerId);

  const handleShareInvitation = async () => {
    if (invitationCode === 'No code available') {
      Alert.alert('Invitation unavailable', 'No invitation code was found.');
      return;
    }

    try {
      await Share.share({
        message:
          `Join my group food order!\n\n` +
          `Restaurant: ${restaurantName}\n` +
          `Group: ${groupName}\n` +
          `Invitation code: ${invitationCode}\n\n` +
          `Open the app and enter this code to join.`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share the invitation.');
    }
  };

  const getParticipantName = (participant, index) => {
    if (typeof participant === 'string') {
      return participant;
    }

    return (
      participant.name ||
      participant.username ||
      participant.fullName ||
      participant.user?.name ||
      `Participant ${index + 1}`
    );
  };

  const getParticipantId = (participant) => {
    if (typeof participant === 'string') {
      return participant;
    }

    return participant.id || participant.userId || participant.user?.id;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backLinkText}>‹ Back to Group Details</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Participants & Invitations</Text>

      <Text style={styles.subtitle}>
        See who's joining your order and invite others to participate.
      </Text>

      {/* Group information */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Group Information</Text>

        <Text style={styles.groupName}>{groupName}</Text>

        <Text style={styles.restaurantName}>{restaurantName}</Text>

        <View style={styles.statusRow}>
          <Text style={styles.label}>Group status</Text>

          <View
            style={[
              styles.statusBadge,
              status.toLowerCase() === 'open'
                ? styles.openBadge
                : styles.closedBadge,
            ]}
          >
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>

      {/* Invitation code */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Invite Friends</Text>

        <Text style={styles.description}>
          Share this code with anyone who wants to join your group order.
        </Text>

        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>INVITATION CODE</Text>
          <Text style={styles.codeText}>{invitationCode}</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleShareInvitation}
        >
          <Text style={styles.primaryButtonText}>Share Invitation</Text>
        </TouchableOpacity>
      </View>

      {/* Participants */}
      <View style={styles.card}>
        <View style={styles.participantsHeader}>
          <Text style={styles.sectionTitle}>Participants</Text>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>{participants.length}</Text>
          </View>
        </View>

        {participants.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No participants yet</Text>

            <Text style={styles.emptyDescription}>
              Share the invitation code with your friends so they can join.
            </Text>
          </View>
        ) : (
          participants.map((participant, index) => {
            const participantId = getParticipantId(participant);

            const isParticipantOrganizer =
              organizerId != null &&
              participantId != null &&
              String(participantId) === String(organizerId);

            return (
              <View
                key={String(participantId || index)}
                style={styles.participantRow}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {getParticipantName(participant, index)
                      .charAt(0)
                      .toUpperCase()}
                  </Text>
                </View>

                <View style={styles.participantInfo}>
                  <Text style={styles.participantName}>
                    {getParticipantName(participant, index)}
                  </Text>

                  {isParticipantOrganizer && (
                    <Text style={styles.organizerLabel}>Organizer</Text>
                  )}
                </View>
              </View>
            );
          })
        )}

        {isOrganizer && (
          <Text style={styles.organizerNote}>
            You are the organizer of this group.
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onBack}
      >
        <Text style={styles.secondaryButtonText}>Back to Group Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  backLink: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backLinkText: {
    fontSize: 15,
    color: '#4F46E5',
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
    marginBottom: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  groupName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 14,
  },
  restaurantName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
    marginBottom: 18,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  openBadge: {
    backgroundColor: '#DCFCE7',
  },
  closedBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#166534',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 16,
  },
  codeBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  codeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#6366F1',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#3730A3',
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  participantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  countBadge: {
    backgroundColor: '#E0E7FF',
    borderRadius: 20,
    minWidth: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countText: {
    color: '#3730A3',
    fontWeight: '700',
  },
  emptyState: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 7,
  },
  emptyDescription: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 19,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4338CA',
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  organizerLabel: {
    fontSize: 12,
    color: '#4F46E5',
    marginTop: 4,
    fontWeight: '600',
  },
  organizerNote: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 14,
    lineHeight: 18,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  backButton: {
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  errorText: {
    fontSize: 16,
    color: '#B91C1C',
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});

export default ParticipantsInvitationsScreen;
