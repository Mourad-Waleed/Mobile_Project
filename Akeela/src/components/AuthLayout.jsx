
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { logoImage } from '../constants/images';
import { colors, radius, spacing, typography } from '../theme/theme';
import ScreenContainer from './ScreenContainer';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image
              source={logoImage}
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="Akeela logo"
            />

            <Text style={styles.eyebrow}>AKEELA</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <View style={styles.card}>{children}</View>
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
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },

  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  logo: {
    width: 88,
    height: 88,
    alignSelf: 'center',
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },

  eyebrow: {
    ...typography.eyebrow,
    color: colors.primary,
    textAlign: 'center',
  },

  title: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },

  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    lineHeight: 22,
    textAlign: 'center',
  },

  card: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
