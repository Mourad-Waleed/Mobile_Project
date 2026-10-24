
import React from 'react';
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
      <View style={styles.container}>
        <Text style={styles.title}>Group not found</Text>
        <Text style={styles.subtitle}>
          We couldn't find this group order.
        </Text>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onBack}
        >
          <Text style={styles.secondaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const groupName = group.groupName || group.name || 'Group Order';

  const restaurantName =
    group.provider?.name ||
    group.providerName ||
    group.restaurantName ||
    'Selected restaurant';

  const invitationCode =
    group.code || group.invitationCode || group.groupCode || 'Not available';

  const deadline = group.deadline
    ? String(group.deadline)
    : 'No deadline set';

  const status = group.status || 'Open';

  const organizerId =
    group.organizerId ||
    group.organizer?.id ||
    group.createdBy;

  const isOrganizer =
    currentUserId != null &&
    organizerId != null &&
    String(currentUserId) === String(organizerId);

  const participants = Array.isArray(group.participants)
    ? group.participants
    : [];

  const handleShareCode = async () => {
    try {
      await Share.share({
        message: `Join my group order at ${restaurantName}!\nGroup: ${groupName}\nInvitation code: ${invitationCode}`,
      });
    } catch {
      Alert.alert(
        'Unable to share',
        'Please share the invitation code manually.'
      );
    }
  };

  const handleFinalize = () => {
    Alert.alert(
      'Finalize Group Order',
      'Are you sure you want to finalize this group order?',
      [
        { text: 'Keep Open', style: 'cancel' },
        {
          text: 'Finalize',
          onPress: () => onFinalize?.(group),
        },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Group Order',
      'Are you sure you want to cancel this group order?',
      [
        { text: 'Keep Open', style: 'cancel' },
        {
          text: 'Cancel Group',
          style: 'destructive',
          onPress: () => onCancel?.(group),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{groupName}</Text>
      <Text style={styles.subtitle}>{restaurantName}</Text>

      <View style={styles.statusRow}>
        <Text style={styles.statusLabel}>Group status</Text>

        <View
          style={[
            styles.statusBadge,
            status !== 'Open' && styles.closedBadge,
          ]}
        >
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Invitation Code</Text>

        <Text style={styles.code}>{invitationCode}</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleShareCode}
        >
          <Text style={styles.primaryButtonText}>
            Share Invitation Code
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Group Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Restaurant</Text>
          <Text style={styles.infoValue}>{restaurantName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Deadline</Text>
          <Text style={styles.infoValue}>{deadline}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Participants</Text>
          <Text style={styles.infoValue}>
            {participants.length}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Participants</Text>

        {participants.length === 0 ? (
          <Text style={styles.emptyText}>
            No participant information is available yet.
          </Text>
        ) : (
          participants.map((participant, index) => {
            const name =
              typeof participant === 'string'
                ? participant
                : participant.name ||
                  participant.fullName ||
                  `Participant ${index + 1}`;

            return (
              <View
                key={participant.id || `${name}-${index}`}
                style={styles.participantRow}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {name.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <Text style={styles.participantName}>{name}</Text>
              </View>
            );
          })
        )}
      </View>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onViewParticipants}
      >
        <Text style={styles.secondaryButtonText}>Participants & Invitations</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onViewMenu}
      >
        <Text style={styles.secondaryButtonText}>View Restaurant Menu</Text>
      </TouchableOpacity>

      {isOrganizer && status === 'Open' && (
        <>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleFinalize}
          >
            <Text style={styles.primaryButtonText}>Finalize Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel Group</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 16,
  },
  backText: {
    color: '#C2410C',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#1F2933',
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#5B6470',
    fontSize: 16,
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  statusLabel: {
    color: '#5B6470',
    fontSize: 14,
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  closedBadge: {
    backgroundColor: '#E5E7EB',
  },
  statusText: {
    color: '#1F2933',
    fontSize: 13,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    color: '#1F2933',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 14,
  },
  code: {
    color: '#C2410C',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 3,
    textAlign: 'center',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  infoLabel: {
    color: '#5B6470',
    fontSize: 14,
    flex: 1,
  },
  infoValue: {
    color: '#1F2933',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  emptyText: {
    color: '#5B6470',
    fontSize: 14,
    lineHeight: 21,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#C2410C',
    fontWeight: '700',
    fontSize: 16,
  },
  participantName: {
    color: '#1F2933',
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#C2410C',
    borderRadius: 9,
    paddingVertical: 15,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C2410C',
    borderRadius: 9,
    paddingVertical: 15,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  secondaryButtonText: {
    color: '#C2410C',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#DC2626',
    borderRadius: 9,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '700',
  },
});