import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AuthLayout from '../components/AuthLayout';
import FormMessage from '../components/FormMessage';
import TextField from '../components/TextField';
import { mockRegister } from '../services/mockAuth';
import { colors, spacing, typography } from '../theme/theme';
import { validateSignUpForm } from '../utils/validation';

export default function SignUpScreen({ onSignUp, onGoToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);

  const updateField = (field, setter) => (text) => {
    setter(text);
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setFormError(null);
  };

  const handleSubmit = () => {
    const nextErrors = validateSignUpForm({ fullName, email, password, confirmPassword });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = mockRegister({ fullName, email });
    if (result.error) {
      setFormError(result.error);
      return;
    }
    onSignUp(result.user);
  };

  return (
    <AuthLayout title="Create your account" subtitle="Sign up to start ordering with friends.">
      <FormMessage message={formError} />
      <TextField
        label="Full name"
        value={fullName}
        onChangeText={updateField('fullName', setFullName)}
        error={errors.fullName}
        placeholder="Your full name"
        autoCapitalize="words"
        autoComplete="name"
      />
      <TextField
        label="Email"
        value={email}
        onChangeText={updateField('email', setEmail)}
        error={errors.email}
        placeholder="name@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
      />
      <TextField
        label="Password"
        value={password}
        onChangeText={updateField('password', setPassword)}
        error={errors.password}
        placeholder="At least 6 characters"
        isPassword
        autoCapitalize="none"
        autoComplete="new-password"
      />
      <TextField
        label="Confirm password"
        value={confirmPassword}
        onChangeText={updateField('confirmPassword', setConfirmPassword)}
        error={errors.confirmPassword}
        placeholder="Repeat your password"
        isPassword
        autoCapitalize="none"
        autoComplete="new-password"
      />
      <AppButton title="Sign up" onPress={handleSubmit} />

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Already have an account?</Text>
        <AppButton title="Log in" variant="text" onPress={onGoToLogin} />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  switchText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
