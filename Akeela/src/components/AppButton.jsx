import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { colors, radius, spacing } from '../theme/theme';

export default function AppButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
}) {
  const [pressed, setPressed] = useState(false);
  const isText = variant === 'text';
  const isPrimary = variant === 'primary';

  const backgroundColor =
    variant === 'primary' ? colors.primary : variant === 'secondary' ? colors.surface : 'transparent';

  const borderWidth = variant === 'secondary' ? 1 : variant === 'outline' ? 1.5 : 0;
  const borderColor = variant === 'secondary' ? colors.border : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={[
        {
          minHeight: isText ? 44 : 52,
          alignSelf: isText ? 'auto' : 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: isText ? spacing.sm : spacing.md,
          marginTop: isText ? 0 : spacing.sm + 4,
          backgroundColor,
          borderWidth,
          borderColor,
          borderRadius: radius.md - 2,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: isPrimary ? colors.onPrimary : colors.primary,
          fontSize: 16,
          fontWeight: '700',
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
