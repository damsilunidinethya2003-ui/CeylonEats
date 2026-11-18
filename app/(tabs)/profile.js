import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../../context/ProfileContext';
import { useFavorites } from '../../context/FavoritesContext';

export default function ProfileScreen() {
  const { profile, updateProfile } = useProfile();
  const { favorites } = useFavorites();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  useEffect(() => {
    setName(profile.name || '');
    setEmail(profile.email || '');
  }, [profile.name, profile.email]);

  const saveProfile = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing information', 'Please enter your name and email.');
      return;
    }
    await updateProfile({ name: name.trim(), email: email.trim() });
    Alert.alert('Profile updated', 'Your profile details have been saved.');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.top}>
        <Text style={styles.pageTitle}>My Profile</Text>
        <Text style={styles.pageSubtitle}>Manage your CeylonEats profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{(profile.name || 'F').charAt(0).toUpperCase()}</Text></View>
        <Text style={styles.displayName}>{profile.name}</Text>
        <Text style={styles.displayEmail}>{profile.email}</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.0.0</Text>
            <Text style={styles.statLabel}>App Version</Text>
          </View>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="person-outline" size={18} color="#A0A0A0" />
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />
        </View>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="mail-outline" size={18} color="#A0A0A0" />
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" />
        </View>
        <Pressable style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>Made with ❤️ in Sri Lanka</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7F8', paddingHorizontal: 20, paddingTop: 55 },
  top: { marginBottom: 20 },
  pageTitle: { fontSize: 26, fontWeight: 'bold', color: '#D52C59' },
  pageSubtitle: { color: '#888', marginTop: 6 },
  profileCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 22, alignItems: 'center', elevation: 3 },
  avatar: { width: 82, height: 82, borderRadius: 41, backgroundColor: '#FFE4EC', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 34, fontWeight: 'bold', color: '#D52C59' },
  displayName: { fontSize: 20, fontWeight: 'bold', color: '#29212A' },
  displayEmail: { fontSize: 13, color: '#888', marginTop: 5 },
  stats: { flexDirection: 'row', marginTop: 22, paddingTop: 17, borderTopWidth: 1, borderTopColor: '#F5DDE4', width: '100%', justifyContent: 'space-evenly' },
  statItem: { alignItems: 'center' },
  statNumber: { color: '#D52C59', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 12, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: '#F5DDE4' },
  formCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginTop: 18 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#29212A', marginBottom: 15 },
  label: { fontSize: 13, color: '#777', marginBottom: 7, marginTop: 8, fontWeight: '600' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#F1DCE2', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#FFFCFD' },
  input: { flex: 1, padding: 12, color: '#29212A' },
  saveButton: { backgroundColor: '#D52C59', borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 18 },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  footer: { textAlign: 'center', color: '#D52C59', marginVertical: 20, fontSize: 12 },
});
