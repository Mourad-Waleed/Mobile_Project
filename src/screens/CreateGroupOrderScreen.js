import React, { useState } from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CreateGroupOrderScreen({
  providerId,
  provider,
  onBack,
  onCreate,
}) {
  const [groupName, setGroupName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const [errors, setErrors] = useState({});

  const restaurantName =
    provider?.name ||
    provider?.providerName ||
    provider?.restaurantName ||
    'Selected restaurant';

  const handleCreateGroup = () => {
    const newErrors = {};

    if (!groupName.trim()) {
      newErrors.groupName = 'Please enter a group name.';
    }

    if (!deadline.trim()) {
      newErrors.deadline = 'Please enter an order deadline.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const groupData = {
      groupName: groupName.trim(),
      deadline: deadline.trim(),
      deliveryNotes: deliveryNotes.trim(),
      providerId,
    };

    if (onCreate) {
      onCreate(groupData);
      return;
    }

    Alert.alert(
      'Group details ready!',
      'Your form is valid. The group has not been saved yet.'
    );
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
        {/* Header */}
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create Group Order</Text>

        <Text style={styles.subtitle}>
          Start a group and invite your friends to order together.
        </Text>

        {/* Restaurant information */}
        <View style={styles.restaurantCard}>
          <Text style={styles.restaurantLabel}>
            SELECTED RESTAURANT
          </Text>

          <Text style={styles.restaurantName}>
            {restaurantName}
          </Text>
        </View>

        {/* Group name */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Group Name *</Text>

          <TextInput
            style={[
              styles.input,
              errors.groupName && styles.inputError,
            ]}
            value={groupName}
            onChangeText={(text) => {
              setGroupName(text);

              if (errors.groupName) {
                setErrors((previous) => ({
                  ...previous,
                  groupName: '',
                }));
              }
            }}
            placeholder="e.g. Friday Lunch"
            placeholderTextColor="#8A929B"
            autoCapitalize="words"
            accessibilityLabel="Group name"
          />

          {errors.groupName ? (
            <Text style={styles.errorText}>
              {errors.groupName}
            </Text>
          ) : null}
        </View>

        {/* Deadline */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Order Deadline *</Text>

          <TextInput
            style={[
              styles.input,
              errors.deadline && styles.inputError,
            ]}
            value={deadline}
            onChangeText={(text) => {
              setDeadline(text);

              if (errors.deadline) {
                setErrors((previous) => ({
                  ...previous,
                  deadline: '',
                }));
              }
            }}
            placeholder="e.g. Today at 2:00 PM"
            placeholderTextColor="#8A929B"
            accessibilityLabel="Order deadline"
          />

          <Text style={styles.helperText}>
            Enter when your group should stop accepting orders.
          </Text>

          {errors.deadline ? (
            <Text style={styles.errorText}>
              {errors.deadline}
            </Text>
          ) : null}
        </View>

        {/* Delivery notes */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Delivery Notes (Optional)</Text>

          <TextInput
            style={[styles.input, styles.notesInput]}
            value={deliveryNotes}
            onChangeText={setDeliveryNotes}
            placeholder="e.g. Deliver to Building A"
            placeholderTextColor="#8A929B"
            multiline
            textAlignVertical="top"
            accessibilityLabel="Delivery notes"
          />
        </View>

        {/* Create button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateGroup}
          accessibilityRole="button"
          accessibilityLabel="Create group"
        >
          <Text style={styles.createButtonText}>
            Create Group
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          You can invite participants after creating your group.
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

  restaurantCard: {
    backgroundColor: '#FFEDD5',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },

  restaurantLabel: {
    color: '#9A3412',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },

  restaurantName: {
    color: '#1F2933',
    fontSize: 18,
    fontWeight: '700',
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
    paddingVertical: 13,
    fontSize: 15,
    color: '#1F2933',
  },

  inputError: {
    borderColor: '#DC2626',
  },

  notesInput: {
    minHeight: 100,
  },

  helperText: {
    color: '#5B6470',
    fontSize: 12,
    marginTop: 6,
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 6,
  },

  createButton: {
    backgroundColor: '#C2410C',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },

  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  footerText: {
    color: '#5B6470',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 20,
  },
});