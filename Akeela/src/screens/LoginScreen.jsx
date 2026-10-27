import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AuthLayout from '../components/AuthLayout';
import FormMessage from '../components/FormMessage';
import TextField from '../components/TextField';
import { currentUser } from '../data/mockData';
import { mockLogin } from '../services/mockAuth';
import { colors, spacing, typography } from '../theme/theme';
import { validateLoginForm } from '../utils/validation';

// Login. onLogin(user) is called after a successful mock login,
// onGoToSignUp switches to the Sign Up screen.
export default function LoginScreen({ onLogin, onGoToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);

  // Editing a field clears that field's old error and the form-level message.
  const updateField = (field, setter) => (text) => {
    setter(text);
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setFormError(null);
  };

  const handleSubmit = () => {
    const nextErrors = validateLoginForm({ email, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = mockLogin(email);
    if (result.error) {
      setFormError(result.error);
      return;
    }
    onLogin(result.user);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to join or start a group order.">
      <FormMessage message={formError} />
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
        placeholder="Enter your password"
        isPassword
        autoCapitalize="none"
        autoComplete="password"
      />
      <AppButton title="Log in" onPress={handleSubmit} />

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>New here?</Text>
        <AppButton title="Create an account" variant="text" onPress={onGoToSignUp} />
      </View>

      <Text style={styles.hint}>Demo account: {currentUser.email} (any password)</Text>
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
  hint: {
    ...typography.label,
    fontWeight: '500',
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
