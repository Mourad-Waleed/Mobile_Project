import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { colors } from '../theme/theme';

// Stopgap for the status bar / notch area. React Native's built-in SafeAreaView
// is deprecated, and react-native-safe-area-context is not installed yet.
// When navigation is chosen, replace this padding with the library's insets.
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
