
import React, { useState } from 'react';

import { GROUP_STATUS, getGroupDetails, joinGroup } from '../repositories/groupRepository';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Steps: enter a code -> review the group that was found -> confirm.
// After joining, onJoined(code) lets the app open the group's details.
// Groups are mock data in memory (see groupRepository), so a code only works
// for a group created during the current app session.
export default function JoinGroupOrderScreen({
  user,
  onBack,
  onJoined,
}) {
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        {/* Heading */}
        <Text style={styles.title}>Join a Group Order</Text>

        <Text style={styles.subtitle}>
          Have an invitation code? Enter it below to join your
          friends and order together.
        </Text>

        {/* Information card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>👥</Text>

          <Text style={styles.infoTitle}>
            Eat together, order together!
          </Text>

          <Text style={styles.infoDescription}>
            Ask the person who created the group to share
            the invitation code with you.
          </Text>
        </View>

        {/* Group code input */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Group Invitation Code *</Text>

          <TextInput
            style={[
              styles.input,
              error ? styles.inputError : null,
            ]}
            value={groupCode}
            onChangeText={(text) => {
              setGroupCode(text);
              setError('');
              setFoundGroup(null);
            }}
            placeholder="Enter your group code"
            placeholderTextColor="#8A929B"
            autoCapitalize="characters"
            autoCorrect={false}
            accessibilityLabel="Group invitation code"
            returnKeyType="done"
            onSubmitEditing={handleFindGroup}
          />

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
        </View>

        {/* Find button */}
        {!foundGroup ? (
          <TouchableOpacity
            style={styles.joinButton}
            onPress={handleFindGroup}
            accessibilityRole="button"
            accessibilityLabel="Find group"
          >
            <Text style={styles.joinButtonText}>Find Group</Text>
          </TouchableOpacity>
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
              <TouchableOpacity
                style={[styles.joinButton, styles.spacedButton]}
                onPress={handleConfirmJoin}
                accessibilityRole="button"
                accessibilityLabel="Confirm and join group"
              >
                <Text style={styles.joinButtonText}>Join this group</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.errorText}>
                This group is {foundGroup.status.toLowerCase()} and can no longer be joined.
              </Text>
            )}
          </View>
        )}

        <Text style={styles.footerText}>
          By joining, you'll be able to select your own items
          from the group's restaurant menu.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
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
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },

  subtitle: {
    color: '#5B6470',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },

  infoCard: {
    backgroundColor: '#FFEDD5',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 28,
  },

  infoIcon: {
    fontSize: 36,
    marginBottom: 12,
  },

  infoTitle: {
    color: '#1F2933',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },

  infoDescription: {
    color: '#5B6470',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },

  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    color: '#1F2933',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5D9DE',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2933',
  },

  inputError: {
    borderColor: '#DC2626',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 6,
  },

  joinButton: {
    backgroundColor: '#C2410C',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },

  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D5D9DE',
    padding: 16,
  },

  groupLabel: {
    color: '#9A3412',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },

  groupName: {
    color: '#1F2933',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },

  groupDetail: {
    color: '#5B6470',
    fontSize: 15,
    lineHeight: 22,
  },

  spacedButton: {
    marginTop: 16,
  },

  footerText: {
    color: '#5B6470',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 18,
  },
});
