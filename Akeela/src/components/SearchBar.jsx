import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { icons } from '../constants/images';
import { colors, radius, spacing, typography } from '../theme/theme';
import Icon from './Icon';

export default function SearchBar({
  value = '',
  onChangeText,
  placeholder = 'Search restaurants or cuisines',
  onPress,
  autoFocus = false,
}) {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.box}>
        <Image source={icons.search} style={styles.icon} />
        <Text style={styles.placeholder}>{placeholder}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.box}>
      <Image source={icons.search} style={styles.icon} />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoFocus={autoFocus}
        autoCorrect={false}
        returnKeyType="search"
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          hitSlop={10}
          style={styles.clear}
          accessibilityLabel="Clear search"
        >
          <Icon name="close" size={14} color={colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: spacing.sm,
  },
  placeholder: {
    flex: 1,
    ...typography.body,
    color: colors.textMuted,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    ...typography.body,
    color: colors.text,
  },
  clear: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
});
