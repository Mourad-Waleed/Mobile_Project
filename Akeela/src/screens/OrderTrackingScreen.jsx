import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../components/AppButton';
import Icon from '../components/Icon';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import { icons } from '../constants/images';
import { colors, radius, spacing, typography } from '../theme/theme';

const statuses = [
  { title: 'Order confirmed', detail: 'Your order has been placed.', time: 'Just now' },
  { title: 'Preparing your food', detail: 'The restaurant is preparing the items.', time: 'Next' },
  { title: 'Out for delivery', detail: 'A courier is on the way.', time: 'Later' },
  { title: 'Delivered', detail: 'Enjoy your meal!', time: 'Final step' },
];

export default function OrderTrackingScreen({ onBack, address, onFinish }) {
  const [activeStep, setActiveStep] = useState(0);

  const addressLine = [
    address?.street,
    address?.building && `Building ${address.building}`,
    address?.apartment && `Apartment ${address.apartment}`,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <ScreenContainer>
      <ScreenHeader title="Order tracking" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.successIcon}>
            <Image source={icons.check} style={styles.successImage} />
          </View>
          <Text style={styles.title}>Order placed!</Text>
          <Text style={styles.subtitle}>Reference #AK-2048</Text>
          <View style={styles.etaCard}>
            <Text style={styles.etaLabel}>ESTIMATED DELIVERY</Text>
            <Text style={styles.etaValue}>
              {activeStep >= 3 ? 'Delivered' : activeStep === 2 ? 'On the way' : '30–40 min'}
            </Text>
          </View>
        </View>

        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Map</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order progress</Text>
          {statuses.map((status, index) => {
            const complete = index < activeStep;
            const current = index === activeStep;
            return (
              <View key={status.title} style={styles.timelineRow}>
                <View style={styles.timelineRail}>
                  <View style={[styles.dot, complete && styles.dotComplete, current && styles.dotCurrent]}>
                    {complete ? <Icon name="check" size={12} color="#FFFFFF" strokeWidth={2.5} /> : null}
                  </View>
                  {index < statuses.length - 1 && (
                    <View style={[styles.line, index < activeStep && styles.lineComplete]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.statusHeading}>
                    <Text style={[styles.statusTitle, !complete && !current && styles.pending]}>
                      {status.title}
                    </Text>
                    <Text style={styles.statusTime}>
                      {complete ? 'Done' : current ? 'Now' : status.time}
                    </Text>
                  </View>
                  <Text style={styles.statusDetail}>{status.detail}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery destination</Text>
          <Text style={styles.addressName}>{address?.recipient || 'Recipient not set'}</Text>
          <Text style={styles.addressText}>{addressLine || 'No address provided'}</Text>
          {address?.phone ? <Text style={styles.addressText}>{address.phone}</Text> : null}
        </View>

        {activeStep < statuses.length - 1 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => setActiveStep(activeStep + 1)}
          >
            <Text style={styles.nextButtonText}>Next status →</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveredBanner}>
            <Text style={styles.deliveredText}>Your order has been delivered.</Text>
          </View>
        )}

        <AppButton title="Back to home" onPress={onFinish} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.md },
  hero: { alignItems: 'center', paddingVertical: spacing.md },
  successIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.successTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  successImage: { width: 34, height: 34 },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xs },
  etaCard: {
    marginTop: spacing.md,
    width: '100%',
    backgroundColor: colors.primaryTint,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  etaLabel: { ...typography.eyebrow, color: colors.primary },
  etaValue: { ...typography.title, color: colors.primary, marginTop: spacing.xs },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#E8EFE8',
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: { ...typography.heading, color: colors.textMuted },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  sectionTitle: { ...typography.heading, color: colors.text, marginBottom: spacing.md },
  timelineRow: { flexDirection: 'row', minHeight: 70 },
  timelineRail: { alignItems: 'center', width: 28, marginRight: spacing.sm },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  dotComplete: { backgroundColor: colors.success, borderColor: colors.success },
  dotCurrent: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  line: { flex: 1, width: 2, backgroundColor: colors.border, marginVertical: 2 },
  lineComplete: { backgroundColor: colors.success },
  timelineContent: { flex: 1, paddingBottom: spacing.md },
  statusHeading: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  statusTitle: { ...typography.body, color: colors.text, fontWeight: '700', flex: 1 },
  pending: { color: colors.textMuted, fontWeight: '400' },
  statusTime: { ...typography.label, color: colors.textMuted },
  statusDetail: { ...typography.label, color: colors.textMuted, lineHeight: 18, marginTop: 3 },
  addressName: { ...typography.body, color: colors.text, fontWeight: '700' },
  addressText: { ...typography.body, color: colors.textMuted, marginTop: spacing.xs, lineHeight: 21 },
  nextButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: { ...typography.label, color: colors.primary },
  deliveredBanner: { backgroundColor: colors.successTint, borderRadius: radius.md, padding: spacing.md },
  deliveredText: { ...typography.body, color: colors.success, textAlign: 'center', fontWeight: '600' },
});
