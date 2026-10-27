import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../constants/images';
import { colors, spacing } from '../theme/theme';

const tabs = [
  { name: 'home', label: 'Home', icon: icons.home },
  { name: 'orderHistory', label: 'Order History', icon: icons.history },
  { name: 'settings', label: 'Settings', icon: icons.settings },
];

export default function TabBar({ active, onChange }) {
  return (
    <View style={styles.bar}>
      {tabs.map((tab) => {
        const selected = tab.name === active;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => onChange(tab.name)}
          >
            <Image
              source={tab.icon}
              style={[styles.icon, { opacity: selected ? 1 : 0.45 }]}
            />
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  label: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  labelSelected: {
    color: colors.primary,
  },
});
