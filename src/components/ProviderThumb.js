import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme/theme';

// Placeholder "image" for a provider: an emoji on a tinted tile.
// Greyed out when the provider is unavailable.
export default function ProviderThumb({ emoji, size = 56, isAvailable = true }) {
  return (
    <View
      style={[
        styles.tile,
        { width: size, height: size },
        !isAvailable && styles.unavailable,
      ]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Text style={{ fontSize: size * 0.5, opacity: isAvailable ? 1 : 0.45 }}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.primaryTint,
  },
  unavailable: {
    backgroundColor: colors.disabled,
  },
});
