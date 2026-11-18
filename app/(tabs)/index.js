import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { restaurants, categories } from '../../data/restaurants';
import { useFavorites } from '../../context/FavoritesContext';
import { useProfile } from '../../context/ProfileContext';
import { showLocalMessage } from '../../utils/showLocalMessage';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const welcomeShown = useRef(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { profile, isLoaded: profileLoaded } = useProfile();

  useEffect(() => {
    if (profileLoaded && !welcomeShown.current) {
      welcomeShown.current = true;
      const firstName = (profile.name || 'Foodie').trim().split(' ')[0];
      showLocalMessage(`Welcome back, ${firstName}! Enjoy discovering delicious food with CeylonEats. 👋`);
    }
  }, [profileLoaded, profile.name]);

  const filteredRestaurants = useMemo(() => {
    const query = search.trim().toLowerCase();
    return restaurants.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = !query || item.name.toLowerCase().includes(query) || item.location.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const handleFavorite = (item) => {
    const wasFavorite = isFavorite(item.id);
    toggleFavorite(item.id);
    showLocalMessage(wasFavorite ? `${item.name} removed from Favorites.` : `${item.name} added to Favorites! ❤️`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>WELCOME TO CEYLONEATS</Text>
          <Text style={styles.welcome}>Hello, {profile.name || 'Foodie'}! 👋</Text>
          <Text style={styles.subtitle}>Find delicious food near you</Text>
        </View>
        <View style={styles.logoCircle}><Text style={styles.logo}>🍽️</Text></View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput style={styles.search} placeholder="Search restaurants or food..." placeholderTextColor="#999" value={search} onChangeText={setSearch} returnKeyType="search" />
        {search.length > 0 && <Pressable onPress={() => setSearch('')}><Ionicons name="close-circle" size={20} color="#999" /></Pressable>}
      </View>

      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Food Categories</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChips}>
        {categories.map((item) => (
          <Pressable key={item} onPress={() => setSelectedCategory(item)} style={[styles.filterChip, selectedCategory === item && styles.filterChipActive]}>
            <Text style={[styles.filterChipText, selectedCategory === item && styles.filterChipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <View><Text style={styles.sectionTitle}>Popular Restaurants</Text><Text style={styles.resultText}>{filteredRestaurants.length} places found</Text></View>
        <Pressable onPress={() => router.push('/(tabs)/explore')}><Text style={styles.exploreLink}>Explore all</Text></Pressable>
      </View>

      {filteredRestaurants.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyIcon}>🔎</Text><Text style={styles.emptyTitle}>No results found</Text><Text style={styles.emptyText}>Try changing your search or category.</Text></View>
      ) : filteredRestaurants.map((item) => (
        <View key={item.id} style={styles.card}>
          <Pressable onPress={() => router.push(`/restaurant/${item.id}`)}>
            <Image source={item.image} style={styles.foodImage} />
            <View style={styles.ratingBadge}><Text style={styles.ratingText}>⭐ {item.rating}</Text></View>
          </Pressable>
          <View style={styles.cardInfo}>
            <Pressable style={styles.details} onPress={() => router.push(`/restaurant/${item.id}`)}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.location}>📍 {item.location}  ·  {item.category}</Text>
              <Text style={styles.menuText}>{item.menu.length} menu items · View menu</Text>
            </Pressable>
            <Pressable style={styles.heartButton} onPress={() => handleFavorite(item)} hitSlop={8}>
              <Ionicons name={isFavorite(item.id) ? 'heart' : 'heart-outline'} size={25} color="#D52C59" />
            </Pressable>
          </View>
        </View>
      ))}
      <Text style={styles.footer}>Made with ❤️ in Sri Lanka</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7F8', paddingHorizontal: 20, paddingTop: 55 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  eyebrow: { fontSize: 10, letterSpacing: 1.5, color: '#D52C59', fontWeight: '800', marginBottom: 7 },
  welcome: { fontSize: 25, fontWeight: 'bold', color: '#29212A', maxWidth: 270 },
  subtitle: { fontSize: 14, color: '#888', marginTop: 5 },
  logoCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#FFE4EC', alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 29 },
  searchBox: { backgroundColor: '#FFF', borderRadius: 15, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#F5DDE4', marginBottom: 26 },
  search: { flex: 1, padding: 15, fontSize: 14, color: '#29212A' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#29212A' },
  filterChips: { gap: 9, paddingBottom: 19 },
  filterChip: { backgroundColor: '#FFF', borderColor: '#F5DDE4', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 22 },
  filterChipActive: { backgroundColor: '#D52C59', borderColor: '#D52C59' },
  filterChipText: { color: '#C52C58', fontSize: 12, fontWeight: '600' },
  filterChipTextActive: { color: '#FFF' },
  exploreLink: { color: '#D52C59', fontSize: 13, fontWeight: '700' },
  resultText: { color: '#999', fontSize: 12, marginTop: 4 },
  card: { backgroundColor: '#FFF', borderRadius: 18, overflow: 'hidden', marginBottom: 18, elevation: 3, shadowColor: '#7D3047', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
  foodImage: { width: '100%', height: 175, backgroundColor: '#F4E7EA' },
  ratingBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 },
  ratingText: { color: '#29212A', fontWeight: '700', fontSize: 12 },
  cardInfo: { padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  details: { flex: 1 },
  restaurantName: { fontSize: 16, fontWeight: 'bold', color: '#29212A' },
  location: { fontSize: 12, color: '#888', marginTop: 6 },
  menuText: { fontSize: 12, color: '#D52C59', fontWeight: '600', marginTop: 7 },
  heartButton: { padding: 9, backgroundColor: '#FFF1F4', borderRadius: 22, marginLeft: 8 },
  empty: { alignItems: 'center', paddingVertical: 45, paddingHorizontal: 20, backgroundColor: '#FFF', borderRadius: 18 },
  emptyIcon: { fontSize: 42, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#29212A' },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 8, lineHeight: 21 },
  footer: { textAlign: 'center', color: '#D52C59', marginVertical: 25, fontSize: 12 },
});
