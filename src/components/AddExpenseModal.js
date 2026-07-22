import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { CATEGORIES } from '../utils/categories.js';

export function AddExpenseModal({ visible, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food 🍔');

  const handleSubmit = () => {
    if (!title.trim() || !amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid title and positive amount.');
      return;
    }

    onAdd({
      title: title.trim(),
      amount: parseFloat(amount),
      category
    });

    setTitle('');
    setAmount('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
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
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.saveText}>Save Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
