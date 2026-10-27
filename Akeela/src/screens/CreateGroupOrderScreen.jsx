import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import TextField from '../components/TextField';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function CreateGroupOrderScreen({ providerId, provider, onBack, onCreate }) {
  const [groupName, setGroupName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [errors, setErrors] = useState({});

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

    onCreate({
      groupName: groupName.trim(),
      deadline: deadline.trim(),
      deliveryNotes: deliveryNotes.trim(),
      providerId,
    });
  };

  return (
    <ScreenContainer>
      <ScreenHeader title="Create Group Order" onBack={onBack} />

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
            Start a group and invite your friends to order together.
          </Text>

          <View style={styles.restaurantCard}>
            <Text style={styles.restaurantLabel}>SELECTED RESTAURANT</Text>
            <Text style={styles.restaurantName}>{provider?.name || 'Selected restaurant'}</Text>
          </View>

          <TextField
            label="Group Name *"
            value={groupName}
            onChangeText={(text) => {
              setGroupName(text);
              setErrors({ ...errors, groupName: '' });
            }}
            error={errors.groupName}
            placeholder="e.g. Friday Lunch"
            autoCapitalize="words"
          />

          <TextField
            label="Order Deadline *"
            value={deadline}
            onChangeText={(text) => {
              setDeadline(text);
              setErrors({ ...errors, deadline: '' });
            }}
            error={errors.deadline}
            placeholder="e.g. Today at 2:00 PM"
          />
          <Text style={styles.helperText}>
            Enter when your group should stop accepting orders.
          </Text>

          <TextField
            label="Delivery Notes (Optional)"
            value={deliveryNotes}
            onChangeText={setDeliveryNotes}
            placeholder="e.g. Deliver to Building A"
            multiline
            textAlignVertical="top"
          />

          <AppButton title="Create Group" onPress={handleCreateGroup} />

          <Text style={styles.footerText}>
            You can invite participants after creating your group.
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
  restaurantCard: {
    backgroundColor: colors.primaryTint,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  restaurantLabel: {
    ...typography.eyebrow,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  restaurantName: {
    ...typography.heading,
    color: colors.text,
  },
  helperText: {
    ...typography.label,
    fontWeight: '400',
    color: colors.textMuted,
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
  },
  footerText: {
    ...typography.label,
    fontWeight: '400',
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
