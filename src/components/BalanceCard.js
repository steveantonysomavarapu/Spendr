import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export function BalanceCard({ totalSpent, remainingBudget, monthlyBudget, onEditBudget }) {
  return (
    <View style={styles.cardRow}>
      <View style={[styles.card, styles.spentCard]}>
        <Text style={styles.cardLabel}>Total Spent</Text>
        <Text style={styles.cardValue}>${totalSpent.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={[styles.card, styles.budgetCard]} onPress={onEditBudget} activeOpacity={0.8}>
        <View style={styles.budgetHeader}>
          <Text style={styles.cardLabel}>Budget Remaining</Text>
          <Text style={styles.editBadge}>Edit</Text>
        </View>
        <Text style={[styles.cardValue, remainingBudget < 0 && { color: '#ef4444' }]}>
          ${remainingBudget.toFixed(2)}
        </Text>
        <Text style={styles.targetSubtext}>Target: ${monthlyBudget.toFixed(2)}</Text>
      </TouchableOpacity>
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
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  editBadge: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: 'bold',
    backgroundColor: '#065f46',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  targetSubtext: {
    color: '#a7f3d0',
    fontSize: 11,
    marginTop: 4
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold'
  }
});
