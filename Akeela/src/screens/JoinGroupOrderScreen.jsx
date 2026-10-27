import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import TextField from '../components/TextField';
import { icons } from '../constants/images';
import { GROUP_STATUS, getGroupDetails, joinGroup } from '../repositories/groupRepository';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function JoinGroupOrderScreen({ user, onBack, onJoined }) {
  const [groupCode, setGroupCode] = useState('');
  const [error, setError] = useState('');
  const [foundGroup, setFoundGroup] = useState(null);

  const isOpen = foundGroup?.status === GROUP_STATUS.open;

  const handleFindGroup = () => {
    if (!groupCode.trim()) {
      setError('Please enter a group invitation code.');
      return;
    }

    const group = getGroupDetails(groupCode);

    if (!group) {
      setFoundGroup(null);
      setError('Group not found. Check the code and try again.');
      return;
    }

    setError('');
    setFoundGroup(group);
  };

  const handleConfirmJoin = () => {
    const result = joinGroup(foundGroup.code, user);

    if (result.error) {
      setError(result.error);
      return;
    }

    setError('');
    onJoined(result.group.code);
  };

  return (
    <ScreenContainer>
      <ScreenHeader title="Join a Group Order" onBack={onBack} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>
            Have an invitation code? Enter it below to join your friends and order together.
          </Text>

          <View style={styles.infoCard}>
            <Image source={icons.group} style={styles.infoIcon} />
            <Text style={styles.infoTitle}>Eat together, order together!</Text>
            <Text style={styles.infoDescription}>
              Ask the person who created the group to share the invitation code with you.
            </Text>
          </View>

          <TextField
            label="Group Invitation Code *"
            value={groupCode}
            onChangeText={(text) => {
              setGroupCode(text);
              setError('');
              setFoundGroup(null);
            }}
            error={error}
            placeholder="Enter your group code"
            autoCapitalize="characters"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleFindGroup}
          />

          {!foundGroup ? (
            <AppButton title="Find Group" onPress={handleFindGroup} />
          ) : (
            <View style={styles.groupCard}>
              <Text style={styles.groupLabel}>GROUP FOUND · {foundGroup.status.toUpperCase()}</Text>
              <Text style={styles.groupName}>{foundGroup.groupName}</Text>
              <Text style={styles.groupDetail}>
                Restaurant: {foundGroup.provider?.name ?? 'Unknown restaurant'}
              </Text>
              <Text style={styles.groupDetail}>Deadline: {foundGroup.deadline}</Text>
              <Text style={styles.groupDetail}>Organizer: {foundGroup.organizerName}</Text>

              {isOpen ? (
                <AppButton title="Join this group" onPress={handleConfirmJoin} />
              ) : (
                <Text style={styles.closedText}>
                  This group is {foundGroup.status.toLowerCase()} and can no longer be joined.
                </Text>
              )}
            </View>
          )}

          <Text style={styles.footerText}>
            By joining, you'll be able to select your own items from the group's restaurant menu.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
  infoCard: {
    backgroundColor: colors.primaryTint,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  infoIcon: {
    width: 40,
    height: 40,
    marginBottom: spacing.sm,
  },
  infoTitle: {
    ...typography.heading,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  infoDescription: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 21,
    textAlign: 'center',
  },
  groupCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  groupLabel: {
    ...typography.eyebrow,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  groupName: {
    ...typography.heading,
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  groupDetail: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  closedText: {
    ...typography.label,
    color: colors.danger,
    marginTop: spacing.md,
  },
  footerText: {
    ...typography.label,
    fontWeight: '400',
    color: colors.textMuted,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
