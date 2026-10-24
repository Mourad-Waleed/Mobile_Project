import { ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import ScreenContainer from '../components/ScreenContainer';
import { getGroupDetails } from '../repositories/groupRepository';
import { colors, radius, spacing, typography } from '../theme/theme';

// Shown right after a group is created. Looks the group up by its code, so it
// always shows what was really stored.
export default function GroupCreatedScreen({ groupCode, onDone }) {
  const group = getGroupDetails(groupCode);

  if (!group) {
    return (
      <ScreenContainer>
        <View style={styles.content}>
          <Text style={styles.title}>Group not found</Text>
          <AppButton title="Back to the app" onPress={onDone} />
        </View>
      </ScreenContainer>
    );
  }

  const shareCode = () =>
    Share.share({
      message: `Join my group order "${group.groupName}" with code ${group.code}.`,
    });

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>GROUP CREATED</Text>
        <Text style={styles.title}>{group.groupName}</Text>
        <Text style={styles.subtitle}>
          Share this code with your friends so they can join from "Join with code".
        </Text>

        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>INVITATION CODE</Text>
          <Text style={styles.code} selectable accessibilityLabel={`Invitation code ${group.code}`}>
            {group.code}
          </Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.detail}>Restaurant: {group.provider?.name ?? 'Unknown restaurant'}</Text>
          <Text style={styles.detail}>Deadline: {group.deadline}</Text>
          {group.deliveryNotes ? (
            <Text style={styles.detail}>Delivery notes: {group.deliveryNotes}</Text>
          ) : null}
          <Text style={styles.detail}>Organizer: {group.organizerName}</Text>
          <Text style={styles.detail}>Status: {group.status}</Text>
        </View>

        <View style={styles.actions}>
          <AppButton title="Share code" variant="secondary" onPress={shareCode} />
          <AppButton title="Back to the app" onPress={onDone} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.eyebrow,
    color: colors.success,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  codeCard: {
    alignItems: 'center',
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.primaryTint,
  },
  codeLabel: {
    ...typography.label,
    color: colors.primary,
  },
  code: {
    marginTop: spacing.sm,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 6,
    color: colors.text,
  },
  details: {
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  detail: {
    ...typography.body,
    color: colors.text,
  },
  actions: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
});
