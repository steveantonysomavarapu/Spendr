import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';

const CATEGORIES = ['All', 'Food 🍔', 'Transport 🚗', 'Bills ⚡', 'Shopping 🛍️', 'Entertainment 🎬'];

export default function App() {
  const [expenses, setExpenses] = useState([
    { id: '1', title: 'Groceries at Supermarket', amount: 45.50, category: 'Food 🍔', date: '2026-07-20' },
    { id: '2', title: 'Uber ride to campus', amount: 14.20, category: 'Transport 🚗', date: '2026-07-21' },
    { id: '3', title: 'Monthly Electricity Bill', amount: 65.00, category: 'Bills ⚡', date: '2026-07-21' },
    { id: '4', title: 'Movie Ticket & Snacks', amount: 22.00, category: 'Entertainment 🎬', date: '2026-07-22' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food 🍔');

  // Calculate totals
  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const monthlyBudget = 1000;
  const remainingBudget = monthlyBudget - totalSpent;

  // Filtered list
  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(item => item.category === selectedCategory);

  // Add new expense
  const handleAddExpense = () => {
    if (!title.trim() || !amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid title and positive amount.');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0]
    };

    setExpenses([newExpense, ...expenses]);
    setTitle('');
    setAmount('');
    setModalVisible(false);
  };

  // Delete expense
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header & Auth Badge */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Spendr 💸</Text>
          <Text style={styles.subtitle}>Production Expense Tracker</Text>
        </View>
        <View style={styles.userBadge}>
          <Text style={styles.userText}>steveantony@kalvium</Text>
        </View>
      </View>

      {/* Overview Cards */}
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

      {/* Category Slicer Filter */}
      <View style={styles.categoryWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Transactions Header */}
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
              <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No expenses found for this category.</Text>
          </View>
        }
      />

      {/* Add Expense Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Expense</Text>

            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Dinner with friends"
              placeholderTextColor="#94a3b8"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.inputLabel}>Amount ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={styles.inputLabel}>Category</Text>
            <ScrollView horizontal style={styles.modalCategoryRow}>
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.modalCatChip, category === cat && styles.modalCatChipActive]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.modalCatText, category === cat && styles.modalCatTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddExpense}
              >
                <Text style={styles.saveText}>Save Expense</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  categoryWrapper: {
    marginBottom: 16
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    marginRight: 8
  },
  categoryChipActive: {
    backgroundColor: '#6366f1'
  },
  categoryText: {
    color: '#94a3b8',
    fontSize: 13
  },
  categoryTextActive: {
    color: '#ffffff',
    fontWeight: 'bold'
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
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
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
  modalCategoryRow: {
    marginBottom: 20
  },
  modalCatChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#0f172a',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155'
  },
  modalCatChipActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1'
  },
  modalCatText: {
    color: '#94a3b8',
    fontSize: 12
  },
  modalCatTextActive: {
    color: '#ffffff',
    fontWeight: 'bold'
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
