import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { colors } from '../theme/theme';

const TOP_INSET = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 54;

export default function ScreenContainer({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: TOP_INSET,
    backgroundColor: colors.background,
  },
});
