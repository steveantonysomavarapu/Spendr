import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput
} from 'react-native';

import { BalanceCard } from '../components/BalanceCard.js';
import { CategoryFilter } from '../components/CategoryFilter.js';
import { ExpenseItem } from '../components/ExpenseItem.js';
import { AddExpenseModal } from '../components/AddExpenseModal.js';
import { currentUser } from '../config/firebase.js';

export function HomeScreen() {
  const [expenses, setExpenses] = useState([
    { id: '1', title: 'Groceries at Supermarket', amount: 45.50, category: 'Food', date: '2026-07-20' },
    { id: '2', title: 'Uber ride to campus', amount: 14.20, category: 'Transport', date: '2026-07-21' },
    { id: '3', title: 'Monthly Electricity Bill', amount: 65.00, category: 'Bills', date: '2026-07-21' },
    { id: '4', title: 'Movie Ticket & Snacks', amount: 22.00, category: 'Entertainment', date: '2026-07-22' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [tempBudgetInput, setTempBudgetInput] = useState('1000');

  // Totals calculation
  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
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

  const handleSaveBudget = () => {
    const parsed = parseFloat(tempBudgetInput);
    if (!isNaN(parsed) && parsed >= 0) {
      setMonthlyBudget(parsed);
    }
    setBudgetModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header & User Badge */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Spendr</Text>
          <Text style={styles.subtitle}>Production Expense Tracker</Text>
        </View>
        <View style={styles.userBadge}>
          <Text style={styles.userText}>{currentUser.displayName}</Text>
        </View>
      </View>

      {/* Balance Summary Card Component */}
      <BalanceCard
        totalSpent={totalSpent}
        remainingBudget={remainingBudget}
        monthlyBudget={monthlyBudget}
        onEditBudget={() => {
          setTempBudgetInput(monthlyBudget.toString());
          setBudgetModalVisible(true);
        }}
      />

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

      {/* Edit Budget Modal Component */}
      <Modal visible={budgetModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Monthly Budget</Text>
            <Text style={styles.inputLabel}>New Budget Amount ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="1000"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              value={tempBudgetInput}
              onChangeText={setTempBudgetInput}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setBudgetModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveBudget}
              >
                <Text style={styles.saveText}>Save Budget</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    width: '100%',
    maxWidth: '98%',
    marginHorizontal: 'auto'
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 20,
    width: '100%',
    maxWidth: 400
  },
  modalTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  inputLabel: {
    color: '#cbd5e1',
    fontSize: 13,
    marginBottom: 6
  },
  input: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155'
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#334155'
  },
  cancelText: {
    color: '#cbd5e1',
    fontWeight: 'bold'
  },
  saveButton: {
    backgroundColor: '#6366f1'
  },
  saveText: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
});
