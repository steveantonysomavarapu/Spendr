import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar
} from 'react-native';

import { BalanceCard } from '../components/BalanceCard.js';
import { CategoryFilter } from '../components/CategoryFilter.js';
import { ExpenseItem } from '../components/ExpenseItem.js';
import { AddExpenseModal } from '../components/AddExpenseModal.js';
import { currentUser } from '../config/firebase.js';

export function HomeScreen() {
  const [expenses, setExpenses] = useState([
    { id: '1', title: 'Groceries at Supermarket', amount: 45.50, category: 'Food 🍔', date: '2026-07-20' },
    { id: '2', title: 'Uber ride to campus', amount: 14.20, category: 'Transport 🚗', date: '2026-07-21' },
    { id: '3', title: 'Monthly Electricity Bill', amount: 65.00, category: 'Bills ⚡', date: '2026-07-21' },
    { id: '4', title: 'Movie Ticket & Snacks', amount: 22.00, category: 'Entertainment 🎬', date: '2026-07-22' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  // Totals calculation
  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const monthlyBudget = 1000;
  const remainingBudget = monthlyBudget - totalSpent;

  // Filtering
  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(item => item.category === selectedCategory);

  const handleAddExpense = (newExpenseData) => {
    const newExpense = {
      id: Date.now().toString(),
      ...newExpenseData,
      date: new Date().toISOString().split('T')[0]
    };
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header & User Badge */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Spendr 💸</Text>
          <Text style={styles.subtitle}>Production Expense Tracker</Text>
        </View>
        <View style={styles.userBadge}>
          <Text style={styles.userText}>{currentUser.displayName}</Text>
        </View>
      </View>

      {/* Balance Summary Card Component */}
      <BalanceCard totalSpent={totalSpent} remainingBudget={remainingBudget} />

      {/* Category Slicer Filter Component */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Transactions Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Transactions ({filteredExpenses.length})
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Expense List */}
      <FlatList
        data={filteredExpenses}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ExpenseItem item={item} onDelete={handleDeleteExpense} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No expenses found for this category.</Text>
          </View>
        }
      />

      {/* Add Expense Form Modal Component */}
      <AddExpenseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddExpense}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
    paddingTop: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8fafc'
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8'
  },
  userBadge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155'
  },
  userText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13
  },
  listContainer: {
    paddingBottom: 20
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center'
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14
  }
});
