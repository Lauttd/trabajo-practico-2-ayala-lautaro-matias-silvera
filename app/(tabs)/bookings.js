// app/(tabs)/bookings.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookingContext } from '../../src/context/BookingContext';

export default function BookingsScreen() {
  const { misReservas, cancelarReserva, isLoading } = useContext(BookingContext);

  const confirmarCancelacion = (id) => {
    Alert.alert('Cancelar Reserva', '¿Estás seguro de que deseas cancelar este alquiler?', [
      { text: 'No, mantener', style: 'cancel' },
      { text: 'Sí, cancelar', style: 'destructive', onPress: () => cancelarReserva(id) }
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (misReservas.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="calendar-outline" size={60} color="#334155" />
        <Text style={styles.placeholderTitle}>No tienes alquileres</Text>
        <Text style={styles.placeholderText}>Tus reservas confirmadas aparecerán aquí.</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={misReservas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.cancha.imagen }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.canchaNombre}>{item.cancha.nombre}</Text>
              <View style={styles.row}>
                <Ionicons name="time-outline" size={16} color="#94A3B8" />
                <Text style={styles.detailText}>{item.fecha} - {item.horarioHora}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="cash-outline" size={16} color="#94A3B8" />
                <Text style={styles.detailText}>Pago: {item.metodoPago === 'efectivo' ? 'En el lugar' : 'Mercado Pago'}</Text>
              </View>

              <View style={styles.actionRow}>
                <View style={styles.badge}><Text style={styles.badgeText}>Confirmada</Text></View>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => confirmarCancelacion(item.id)}>
                  <Ionicons name="trash-outline" size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#0F172A' },
  centerContainer: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center', padding: 24 },
  placeholderTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginTop: 16 },
  placeholderText: { color: '#94A3B8', fontSize: 14, textAlign: 'center', marginTop: 8 },
  listContent: { padding: 16 },
  card: { backgroundColor: '#1E293B', borderRadius: 16, marginBottom: 16, overflow: 'hidden', flexDirection: 'row', borderWidth: 1, borderColor: '#334155' },
  cardImage: { width: 100, height: '100%', resizeMode: 'cover' },
  cardInfo: { flex: 1, padding: 16, gap: 6 },
  canchaNombre: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { color: '#94A3B8', fontSize: 14 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  badge: { backgroundColor: 'rgba(16, 185, 129, 0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#10B981' },
  badgeText: { color: '#10B981', fontSize: 12, fontWeight: 'bold' },
  cancelBtn: { padding: 6, backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 8, borderWidth: 1, borderColor: '#EF4444' },
});