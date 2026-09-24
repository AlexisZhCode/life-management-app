import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { CoinBadge } from '../components/CoinBadge';
import { EmptyState } from '../components/EmptyState';
import { Screen } from '../components/Screen';
import { SoftCard } from '../components/SoftCard';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { formatFriendlyDate } from '../utils/helpers';
import { REWARD_CATALOG } from '../utils/rewards';

export function RewardsScreen() {
  const { data, redeemReward } = useApp();

  const onRedeem = (id: string, title: string, cost: number) => {
    if (data.stats.coins < cost) {
      Alert.alert('Almost there', 'Finish a few more tasks to unlock this treat.');
      return;
    }
    Alert.alert('Redeem reward?', `${title} for ${cost} coins`, [
      { text: 'Not yet', style: 'cancel' },
      {
        text: 'Redeem',
        onPress: () => {
          const ok = redeemReward(id);
          if (!ok) {
            Alert.alert('Hmm', 'Could not redeem that reward.');
          }
        },
      },
    ]);
  };

  return (
    <Screen
      title="Rewards"
      subtitle="Celebrate progress with something soft."
      headerRight={
        <CoinBadge coins={data.stats.coins} streak={data.stats.currentStreak} />
      }
    >
      <SoftCard tint={colors.lavenderSoft} style={styles.banner}>
        <Text style={styles.bannerEmoji}>🎁</Text>
        <Text style={styles.bannerTitle}>Your treat shop</Text>
        <Text style={styles.bannerCopy}>
          Earn coins by finishing tasks (+5), habits (+3), and mood check-ins (+2).
        </Text>
      </SoftCard>

      <Text style={styles.section}>Available treats</Text>
      {REWARD_CATALOG.map((reward) => {
        const canAfford = data.stats.coins >= reward.cost;
        return (
          <SoftCard key={reward.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.emoji}>{reward.emoji}</Text>
              <View style={styles.body}>
                <Text style={styles.title}>{reward.title}</Text>
                <Text style={styles.desc}>{reward.description}</Text>
                <Text style={styles.cost}>{reward.cost} coins</Text>
              </View>
            </View>
            <Pressable
              style={[styles.btn, !canAfford && styles.btnDisabled]}
              onPress={() => onRedeem(reward.id, reward.title, reward.cost)}
            >
              <Text style={styles.btnText}>
                {canAfford ? 'Redeem' : 'Need more coins'}
              </Text>
            </Pressable>
          </SoftCard>
        );
      })}

      <Text style={styles.section}>Recently redeemed</Text>
      {data.redeemed.length === 0 ? (
        <EmptyState
          emoji="✨"
          title="No treats yet"
          message="Redeem something cozy when you've earned enough coins."
        />
      ) : (
        data.redeemed.slice(0, 6).map((item) => (
          <SoftCard key={item.id} style={styles.history}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.body}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>
                {formatFriendlyDate(item.redeemedAt)}
              </Text>
            </View>
          </SoftCard>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: { marginBottom: 8 },
  bannerEmoji: { fontSize: 32, marginBottom: 6 },
  bannerTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 20,
    color: colors.text,
  },
  bannerCopy: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 14,
    color: colors.textSoft,
    marginTop: 6,
    lineHeight: 20,
  },
  section: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 18,
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  emoji: { fontSize: 32 },
  body: { flex: 1 },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: colors.text,
  },
  desc: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 13,
    color: colors.textSoft,
    marginTop: 2,
  },
  cost: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 13,
    color: colors.primary,
    marginTop: 6,
  },
  btn: {
    marginTop: 14,
    backgroundColor: colors.lavender,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnDisabled: { backgroundColor: colors.border },
  btnText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.text,
    fontSize: 14,
  },
  history: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    paddingVertical: 14,
  },
});
