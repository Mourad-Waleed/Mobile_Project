import { Image, StyleSheet, View } from 'react-native';
import { colors, radius } from '../theme/theme';

export default function ProviderThumb({ image, size = 56, isAvailable = true }) {
  return (
    <View style={[styles.tile, { width: size, height: size }]}>
      <Image
        source={image}
        resizeMode="cover"
        style={[styles.photo, !isAvailable && styles.photoDimmed]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    overflow: 'hidden',
    borderRadius: radius.md,
    backgroundColor: colors.primaryTint,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoDimmed: {
    opacity: 0.45,
  },
});
