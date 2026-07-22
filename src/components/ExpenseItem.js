import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export function ExpenseItem({ item, onDelete }) {
  return (
    <View style={styles.expenseItem}>
      <View style={styles.expenseLeft}>
        <Text style={styles.expenseTitle}>{item.title}</Text>
        <View style={styles.tagRow}>
          <Text style={styles.expenseCategory}>{item.category}</Text>
          <Text style={styles.expenseDate}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.expenseRight}>
        <Text style={styles.expenseAmount}>-${Number(item.amount).toFixed(2)}</Text>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155'
  },
  expenseLeft: {
    flex: 1
  },
  expenseTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8
  },
  expenseCategory: {
    color: '#818cf8',
    fontSize: 12
  },
  expenseDate: {
    color: '#64748b',
    fontSize: 12
  },
  expenseRight: {
    alignItems: 'flex-end'
  },
  expenseAmount: {
    color: '#f43f5e',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  deleteText: {
    color: '#ef4444',
    fontSize: 12
  }
});
