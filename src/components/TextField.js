import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

// Labelled input with an optional error message. With isPassword it hides the
// text and shows a Show/Hide control. Other props (keyboardType, autoCapitalize,
// placeholder...) go straight to TextInput.
export default function TextField({
  label,
  value,
  onChangeText,
  error,
  isPassword = false,
  ...inputProps
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const hasError = Boolean(error);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[styles.inputRow, isFocused && styles.inputFocused, hasError && styles.inputError]}
      >
        <TextInput
          {...inputProps}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && isHidden}
          placeholderTextColor={colors.textMuted}
          accessibilityLabel={label}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isPassword && (
          <Pressable
            onPress={() => setIsHidden((hidden) => !hidden)}
            accessibilityRole="button"
            accessibilityLabel={isHidden ? `Show ${label}` : `Hide ${label}`}
            hitSlop={8}
          >
            <Text style={styles.toggle}>{isHidden ? 'Show' : 'Hide'}</Text>
          </Pressable>
        )}
      </View>
      {hasError && (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.text,
    marginBottom: spacing.xs + 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    ...typography.body,
    color: colors.text,
  },
  toggle: {
    ...typography.label,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  error: {
    ...typography.label,
    fontWeight: '500',
    color: colors.danger,
    marginTop: spacing.xs + 2,
  },
});
