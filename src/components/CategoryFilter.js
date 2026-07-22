import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../utils/categories.js';

export function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <View style={styles.categoryWrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              selectedCategory === cat && styles.categoryChipActive
            ]}
            onPress={() => onSelectCategory(cat)}
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
  );
}

const styles = StyleSheet.create({
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
  }
});
