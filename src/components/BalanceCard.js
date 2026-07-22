import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function BalanceCard({ totalSpent, remainingBudget }) {
  return (
    <View style={styles.cardRow}>
      <View style={[styles.card, styles.spentCard]}>
        <Text style={styles.cardLabel}>Total Spent</Text>
        <Text style={styles.cardValue}>${totalSpent.toFixed(2)}</Text>
      </View>

      <View style={[styles.card, styles.budgetCard]}>
        <Text style={styles.cardLabel}>Budget Remaining</Text>
        <Text style={[styles.cardValue, remainingBudget < 0 && { color: '#ef4444' }]}>
          ${remainingBudget.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1
  },
  spentCard: {
    backgroundColor: '#1e1b4b',
    borderColor: '#4338ca'
  },
  budgetCard: {
    backgroundColor: '#064e3b',
    borderColor: '#059669'
  },
  cardLabel: {
    color: '#cbd5e1',
    fontSize: 13,
    marginBottom: 4
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold'
  }
});
