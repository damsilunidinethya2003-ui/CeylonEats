import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { restaurants } from '../../data/restaurants';
import { showLocalMessage } from '../../utils/showLocalMessage';

const formatPrice = (price) => `Rs. ${Number(price).toLocaleString('en-LK')}`;

export default function RestaurantDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  const restaurant = restaurants.find((item) => item.id === String(id));

  if (!restaurant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFound}>Restaurant not found!</Text>
        <Pressable onPress={() => router.back()}><Text style={styles.backText}>← Go Back</Text></Pressable>
      </View>
    );
  }

  const handleFavorite = () => {
    const wasFavorite = isFavorite(restaurant.id);
    toggleFavorite(restaurant.id);
    showLocalMessage(wasFavorite ? `${restaurant.name} removed from Favorites.` : `${restaurant.name} added to Favorites! ❤️`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageWrap}>
        <Image source={restaurant.image} style={styles.image} />
        <Pressable style={styles.backCircle} onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color="#29212A" /></Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.location}>📍 {restaurant.location}, Sri Lanka</Text>
            <Text style={styles.category}>{restaurant.category}</Text>
          </View>
          <View style={styles.ratingBadge}><Text style={styles.rating}>⭐ {restaurant.rating}</Text></View>
        </View>

        <Pressable style={styles.favoriteButton} onPress={handleFavorite}>
          <Ionicons name={isFavorite(restaurant.id) ? 'heart' : 'heart-outline'} size={20} color="#D52C59" />
          <Text style={styles.favoriteButtonText}>{isFavorite(restaurant.id) ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
        </Pressable>

        <Text style={styles.heading}>About this Restaurant</Text>
        <Text style={styles.description}>{restaurant.description}</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}><Ionicons name="time-outline" size={20} color="#D52C59" /><View><Text style={styles.infoLabel}>Opening Hours</Text><Text style={styles.infoValue}>{restaurant.openingHours}</Text></View></View>
          <View style={styles.infoRow}><Ionicons name="location-outline" size={20} color="#D52C59" /><View><Text style={styles.infoLabel}>Location</Text><Text style={styles.infoValue}>{restaurant.address}</Text></View></View>
        </View>

        <View style={styles.menuHeadingRow}>
          <View><Text style={styles.heading}>Food Menu</Text><Text style={styles.menuSubheading}>Choose from our delicious dishes</Text></View>
          <View style={styles.menuIcon}><Ionicons name="restaurant-outline" size={21} color="#D52C59" /></View>
        </View>

        {restaurant.menu.map((food) => (
          <View key={food.id} style={styles.menuCard}>
            <Image source={food.image} style={styles.menuImage} />
            <View style={styles.menuInfo}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.foodDescription}>{food.description}</Text>
              <Text style={styles.foodPrice}>{formatPrice(food.price)}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.note}>* Menu items and prices are sample details for this app demonstration.</Text>
        <Pressable style={styles.button} onPress={() => router.back()}><Text style={styles.buttonText}>Back to Restaurants</Text></Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7F8' },
  imageWrap: { position: 'relative' },
  image: { width: '100%', height: 285, backgroundColor: '#F4E7EA' },
  backCircle: { position: 'absolute', top: 54, left: 18, width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
  content: { padding: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titleBlock: { flex: 1, paddingRight: 10 },
  name: { fontSize: 23, fontWeight: 'bold', color: '#29212A' },
  location: { fontSize: 14, color: '#888', marginTop: 9 },
  category: { color: '#D52C59', fontSize: 12, fontWeight: '700', marginTop: 7 },
  ratingBadge: { backgroundColor: '#FFF', padding: 9, borderRadius: 12 },
  rating: { fontSize: 14, fontWeight: 'bold' },
  favoriteButton: { flexDirection: 'row', gap: 9, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFE4EC', padding: 15, borderRadius: 13, marginTop: 20 },
  favoriteButtonText: { color: '#D52C59', fontWeight: 'bold', fontSize: 14 },
  heading: { fontSize: 19, fontWeight: 'bold', color: '#29212A', marginTop: 25, marginBottom: 8 },
  description: { fontSize: 14, color: '#777', lineHeight: 23 },
  infoCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 17, marginTop: 20, gap: 17 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  infoLabel: { fontSize: 12, color: '#999', marginBottom: 3 },
  infoValue: { color: '#29212A', fontWeight: '600', fontSize: 14 },
  menuHeadingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  menuSubheading: { color: '#999', fontSize: 12, marginTop: 1 },
  menuIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFE4EC', alignItems: 'center', justifyContent: 'center' },
  menuCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 15, overflow: 'hidden', marginBottom: 12, minHeight: 92, elevation: 2, shadowColor: '#7D3047', shadowOpacity: 0.06, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  menuImage: { width: 92, height: 92, backgroundColor: '#F4E7EA' },
  menuInfo: { flex: 1, padding: 10, justifyContent: 'center' },
  foodName: { color: '#29212A', fontSize: 13, fontWeight: 'bold' },
  foodDescription: { color: '#888', fontSize: 10, lineHeight: 14, marginTop: 4 },
  foodPrice: { color: '#D52C59', fontSize: 14, fontWeight: 'bold', marginTop: 7 },
  note: { color: '#999', fontSize: 11, lineHeight: 16, marginTop: 5 },
  button: { backgroundColor: '#D52C59', padding: 16, borderRadius: 14, marginTop: 22, marginBottom: 15, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  notFoundContainer: { flex: 1, backgroundColor: '#FFF7F8', justifyContent: 'center', alignItems: 'center' },
  notFound: { fontSize: 20, fontWeight: 'bold', color: '#29212A', marginBottom: 20 },
  backText: { fontSize: 17, fontWeight: 'bold', color: '#D52C59' },
});
