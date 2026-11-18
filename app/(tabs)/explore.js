import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Modal } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { restaurants, categories } from '../../data/restaurants';

const priceOptions = [
  { label: 'Any Price', value: 'all' },
  { label: 'Under Rs. 1,000', value: 'under1000' },
  { label: 'Rs. 1,000 – 1,500', value: '1000to1500' },
  { label: 'Above Rs. 1,500', value: 'above1500' },
];

export default function ExploreScreen() {
  const [category, setCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState(priceOptions[0]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const filteredRestaurants = useMemo(() => restaurants.filter((restaurant) => {
    const categoryMatch = category === 'All' || restaurant.category === category;
    const menuPrices = restaurant.menu.map((food) => food.price);
    let priceMatch = true;
    if (priceFilter.value === 'under1000') priceMatch = menuPrices.some((price) => price < 1000);
    if (priceFilter.value === '1000to1500') priceMatch = menuPrices.some((price) => price >= 1000 && price <= 1500);
    if (priceFilter.value === 'above1500') priceMatch = menuPrices.some((price) => price > 1500);
    return categoryMatch && priceMatch;
  }), [category, priceFilter]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>DISCOVER SOMETHING TASTY</Text>
          <Text style={styles.title}>Explore Restaurants</Text>
          <Text style={styles.subtitle}>Find your next favourite meal.</Text>
        </View>
        <View style={styles.iconCircle}><Ionicons name="restaurant" size={27} color="#D52C59" /></View>
      </View>

      <Text style={styles.sectionTitle}>Food Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {categories.map((item) => (
          <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}>
            <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Filter by Price</Text>
      <Pressable style={styles.dropdown} onPress={() => setDropdownVisible(true)}>
        <View style={styles.dropdownLeft}>
          <Ionicons name="pricetag-outline" size={19} color="#D52C59" />
          <Text style={styles.dropdownText}>{priceFilter.label}</Text>
        </View>
        <Ionicons name="chevron-down" size={20} color="#D52C59" />
      </Pressable>

      <Modal visible={dropdownVisible} transparent animationType="fade" onRequestClose={() => setDropdownVisible(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setDropdownVisible(false)}>
          <View style={styles.dropdownMenu}>
            <Text style={styles.modalTitle}>Select Price Range</Text>
            {priceOptions.map((option) => (
              <Pressable key={option.value} style={styles.option} onPress={() => { setPriceFilter(option); setDropdownVisible(false); }}>
                <Text style={[styles.optionText, priceFilter.value === option.value && styles.optionSelected]}>{option.label}</Text>
                {priceFilter.value === option.value && <Ionicons name="checkmark-circle" size={20} color="#D52C59" />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <View style={styles.resultsHeader}>
        <View>
          <Text style={styles.sectionTitle}>Restaurants</Text>
          <Text style={styles.resultCount}>{filteredRestaurants.length} restaurants found</Text>
        </View>
        <Pressable onPress={() => { setCategory('All'); setPriceFilter(priceOptions[0]); }}>
          <Text style={styles.clear}>Reset</Text>
        </Pressable>
      </View>

      {filteredRestaurants.length === 0 ? (
        <View style={styles.empty}><Ionicons name="search-outline" size={38} color="#D52C59" /><Text style={styles.emptyTitle}>No restaurants found</Text><Text style={styles.emptyText}>Try another category or price range.</Text></View>
      ) : filteredRestaurants.map((item) => (
        <Pressable key={item.id} style={styles.card} onPress={() => router.push(`/restaurant/${item.id}`)}>
          <Image source={item.image} style={styles.restaurantImage} />
          <View style={styles.cardBody}>
            <View style={styles.nameRow}><Text style={styles.restaurantName}>{item.name}</Text><Text style={styles.rating}>⭐ {item.rating}</Text></View>
            <Text style={styles.location}>📍 {item.location}  ·  {item.category}</Text>
            <Text style={styles.menuHint}>{item.menu.length} menu items  ·  View menu & prices</Text>
          </View>
          <View style={styles.arrow}><Ionicons name="chevron-forward" size={20} color="#D52C59" /></View>
        </Pressable>
      ))}
      <Text style={styles.footer}>Made with ❤️ in Sri Lanka</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7F8', paddingHorizontal: 20, paddingTop: 55 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25 },
  eyebrow: { color: '#D52C59', fontSize: 10, fontWeight: '800', letterSpacing: 1.3, marginBottom: 7 },
  title: { color: '#29212A', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#888', fontSize: 13, marginTop: 6 },
  iconCircle: { width: 55, height: 55, borderRadius: 28, backgroundColor: '#FFE4EC', alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { color: '#29212A', fontSize: 17, fontWeight: 'bold', marginBottom: 11 },
  chips: { gap: 9, paddingBottom: 22 },
  chip: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F5DDE4', borderRadius: 22, paddingHorizontal: 14, paddingVertical: 10 },
  chipActive: { backgroundColor: '#D52C59', borderColor: '#D52C59' },
  chipText: { color: '#C52C58', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#FFF' },
  dropdown: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F2D5DE', borderRadius: 13, minHeight: 51, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25 },
  dropdownLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dropdownText: { color: '#29212A', fontSize: 14, fontWeight: '600' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 25 },
  dropdownMenu: { backgroundColor: '#FFF', borderRadius: 18, padding: 18 },
  modalTitle: { fontSize: 17, fontWeight: 'bold', color: '#29212A', marginBottom: 8 },
  option: { minHeight: 48, borderBottomWidth: 1, borderBottomColor: '#F7E7EC', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionText: { color: '#555', fontSize: 14 },
  optionSelected: { color: '#D52C59', fontWeight: 'bold' },
  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  resultCount: { color: '#999', fontSize: 12, marginTop: -5 },
  clear: { color: '#D52C59', fontWeight: '700', fontSize: 13 },
  card: { backgroundColor: '#FFF', borderRadius: 17, overflow: 'hidden', marginBottom: 17, elevation: 3, shadowColor: '#7D3047', shadowOpacity: 0.08, shadowRadius: 7, shadowOffset: { width: 0, height: 3 } },
  restaurantImage: { width: '100%', height: 165, backgroundColor: '#F4E7EA' },
  cardBody: { padding: 14, paddingRight: 48 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  restaurantName: { color: '#29212A', fontSize: 16, fontWeight: 'bold', flex: 1 },
  rating: { fontSize: 12, fontWeight: '700', color: '#555' },
  location: { color: '#888', fontSize: 12, marginTop: 7 },
  menuHint: { color: '#D52C59', fontSize: 12, fontWeight: '600', marginTop: 8 },
  arrow: { position: 'absolute', right: 13, bottom: 22 },
  empty: { backgroundColor: '#FFF', alignItems: 'center', padding: 30, borderRadius: 17 },
  emptyTitle: { color: '#29212A', fontSize: 17, fontWeight: 'bold', marginTop: 10 },
  emptyText: { color: '#888', fontSize: 13, marginTop: 6 },
  footer: { textAlign: 'center', color: '#D52C59', marginVertical: 25, fontSize: 12 },
});
