import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import TextField from '../components/TextField';
import AppButton from '../components/AppButton';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function DeliveryAddressScreen({ onBack, onConfirm }) {
  const [form, setForm] = useState({ recipient: '', phone: '', street: '', building: '', apartment: '', instructions: '' });
  const [errors, setErrors] = useState({});
  const update = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: '' }));
  };
  const submit = () => {
    const next = {};
    if (!form.recipient.trim()) next.recipient = 'Enter the recipient name.';
    if (!/^[0-9+\s()-]{8,}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number (at least 8 digits).';
    if (!form.street.trim()) next.street = 'Enter the street and area.';
    if (!form.building.trim()) next.building = 'Enter the building number or name.';
    setErrors(next);
    if (Object.keys(next).length) return;
    onConfirm?.(form);
  };
  return (
    <ScreenContainer>
      <ScreenHeader title="Delivery address" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.title}>Where should we deliver?</Text>
          <Text style={styles.subtitle}>Add the delivery details for your order.</Text>
        </View>
        <View style={styles.formCard}>
          <TextField label="Recipient name *" value={form.recipient} onChangeText={(v) => update('recipient', v)} error={errors.recipient} placeholder="e.g. Mourad Waleed" autoCapitalize="words" />
          <TextField label="Phone number *" value={form.phone} onChangeText={(v) => update('phone', v)} error={errors.phone} placeholder="e.g. 010 1234 5678" keyboardType="phone-pad" />
          <TextField label="Street and area *" value={form.street} onChangeText={(v) => update('street', v)} error={errors.street} placeholder="Street, district, city" />
          <View style={styles.row}>
            <View style={styles.half}><TextField label="Building *" value={form.building} onChangeText={(v) => update('building', v)} error={errors.building} placeholder="Building no." /></View>
            <View style={styles.half}><TextField label="Apartment" value={form.apartment} onChangeText={(v) => update('apartment', v)} placeholder="Floor / unit" /></View>
          </View>
          <TextField label="Delivery instructions (optional)" value={form.instructions} onChangeText={(v) => update('instructions', v)} placeholder="Landmark, gate code, etc." multiline numberOfLines={3} textAlignVertical="top" />
        </View>
        <AppButton title="Confirm address" onPress={submit} />
      </ScrollView>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  content: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.md },
  intro: { marginBottom: spacing.xs },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, lineHeight: 22, marginTop: spacing.xs },
  formCard: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  row: { flexDirection: 'row', gap: spacing.sm },
  half: { flex: 1 },
});
