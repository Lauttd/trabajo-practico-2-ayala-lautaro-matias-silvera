import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BookingContext } from '../src/context/BookingContext';

const HORARIOS_MOCK = [
  { id: '1', hora: '16:00', disponible: false },
  { id: '2', hora: '17:00', disponible: true },
  { id: '3', hora: '18:00', disponible: true },
  { id: '4', hora: '19:00', disponible: false },
  { id: '5', hora: '20:00', disponible: false },
  { id: '6', hora: '21:00', disponible: true },
  { id: '7', hora: '22:00', disponible: true },
  { id: '8', hora: '23:00', disponible: true },
];

export default function RentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { canchas, isLoading } = useContext(BookingContext);
  
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  // 1. Prevenir la búsqueda si los datos todavía están cargando
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  // 2. Comparación segura convirtiendo ambos valores a String
  const cancha = canchas.find(c => String(c.id) === String(id));

  const handleAlquilar = () => {
    if (!horarioSeleccionado) {
      Alert.alert('Atención', 'Selecciona un horario disponible.');
      return;
    }
    router.push({ pathname: '/payment', params: { canchaId: cancha.id, horarioHora: horarioSeleccionado.hora } });
  };

  if (!cancha) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Cancha no encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: cancha.imagen }} style={styles.coverImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{cancha.nombre}</Text>
          <Text style={styles.subtitle}>{cancha.ubicacion}</Text>
        </View>

        <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
        <View style={styles.gridContainer}>
          {HORARIOS_MOCK.map((item) => (
            <TouchableOpacity
              key={item.id} activeOpacity={0.7} disabled={!item.disponible}
              onPress={() => setHorarioSeleccionado(item)}
              style={[
                styles.timeBlock, item.disponible ? styles.blockAvailable : styles.blockUnavailable,
                horarioSeleccionado?.id === item.id && styles.blockSelected,
              ]}
            >
              <Text style={[styles.timeText, item.disponible ? styles.textAvailable : styles.textUnavailable]}>{item.hora}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.rentButton} onPress={handleAlquilar}>
          <Text style={styles.rentButtonText}>Alquilar por ${cancha.precioHora.toLocaleString('es-AR')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#0F172A' },
  centerContainer: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#EF4444', fontSize: 16 },
  scrollContent: { paddingBottom: 100 },
  coverImage: { width: '100%', height: 220, resizeMode: 'cover' },
  infoContainer: { padding: 20, backgroundColor: '#1E293B', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { color: '#94A3B8', fontSize: 15 },
  sectionTitle: { color: '#F8FAFC', fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 16, paddingHorizontal: 20 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12, justifyContent: 'center' },
  timeBlock: { width: '30%', paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'transparent' },
  blockAvailable: { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: '#10B981' },
  blockUnavailable: { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#7F1D1D' },
  blockSelected: { backgroundColor: '#10B981' },
  timeText: { fontSize: 16, fontWeight: 'bold' },
  textAvailable: { color: '#10B981' },
  textUnavailable: { color: '#7F1D1D' },
  footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#1E293B', padding: 20, borderTopWidth: 1, borderTopColor: '#334155' },
  rentButton: { backgroundColor: '#10B981', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  rentButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});