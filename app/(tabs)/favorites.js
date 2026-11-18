import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { restaurants } from '../../data/restaurants';
import { showLocalMessage } from '../../utils/showLocalMessage';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const favoriteRestaurants = restaurants.filter((item) => favorites.includes(item.id));

  const removeFavorite = (item) => {
    toggleFavorite(item.id);
    showLocalMessage(`${item.name} removed from Favorites.`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>My Favorites ❤️</Text>
      <Text style={styles.subtitle}>Your saved restaurants in one place.</Text>

      {favoriteRestaurants.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyCircle}><Ionicons name="heart-outline" size={42} color="#D52C59" /></View>
          <Text style={styles.emptyTitle}>No Favorites Yet!</Text>
          <Text style={styles.emptyText}>Tap the heart on a restaurant to save it here.</Text>
          <Pressable style={styles.button} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.buttonText}>Explore Restaurants</Text>
          </Pressable>
        </View>
      ) : favoriteRestaurants.map((item) => (
        <View key={item.id} style={styles.card}>
          <Pressable onPress={() => router.push(`/restaurant/${item.id}`)}>
            <Image source={item.image} style={styles.foodImage} />
          </Pressable>
          <View style={styles.cardInfo}>
            <Pressable style={styles.details} onPress={() => router.push(`/restaurant/${item.id}`)}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.location}>📍 {item.location}</Text>
              <Text style={styles.rating}>⭐ {item.rating}  ·  {item.category}</Text>
            </Pressable>
            <Pressable onPress={() => removeFavorite(item)} style={styles.heartButton}>
              <Ionicons name="heart" size={25} color="#D52C59" />
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7F8', paddingHorizontal: 20, paddingTop: 55 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#D52C59' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 8, marginBottom: 25 },
  emptyContainer: { alignItems: 'center', marginTop: 85, padding: 22, backgroundColor: '#FFF', borderRadius: 20 },
  emptyCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF1F4', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  emptyTitle: { fontSize: 21, fontWeight: 'bold', color: '#29212A' },
  emptyText: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 10, lineHeight: 22 },
  button: { backgroundColor: '#D52C59', paddingHorizontal: 22, paddingVertical: 14, borderRadius: 13, marginTop: 24 },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  card: { backgroundColor: '#FFF', borderRadius: 17, overflow: 'hidden', marginBottom: 18, elevation: 3 },
  foodImage: { width: '100%', height: 165, backgroundColor: '#F4E7EA' },
  cardInfo: { padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  details: { flex: 1 },
  restaurantName: { fontSize: 16, fontWeight: 'bold', color: '#29212A' },
  location: { fontSize: 13, color: '#888', marginTop: 6 },
  rating: { fontSize: 13, color: '#777', marginTop: 7 },
  heartButton: { padding: 9, backgroundColor: '#FFF1F4', borderRadius: 22, marginLeft: 8 },
});
