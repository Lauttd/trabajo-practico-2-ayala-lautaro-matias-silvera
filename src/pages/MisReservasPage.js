// src/pages/MisReservasPage.js
// Historial de alquileres confirmados con opción a cancelar.

import React from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBooking } from '../hooks/useBooking';
import TarjetaReserva from '../components/TarjetaReserva';
import PantallaCarga from '../components/PantallaCarga';
import { colores } from '../theme/colores';
import { estilosComunes } from '../theme/estilosComunes';

export default function MisReservasPage() {
  const { misReservas, cancelarReserva, isLoading } = useBooking();

  const confirmarCancelacion = (id) => {
    Alert.alert('Cancelar Reserva', '¿Estás seguro de que deseas cancelar este alquiler?', [
      { text: 'No, mantener', style: 'cancel' },
      { text: 'Sí, cancelar', style: 'destructive', onPress: () => cancelarReserva(id) }
    ]);
  };

  if (isLoading) {
    return <PantallaCarga />;
  }

  if (misReservas.length === 0) {
    return (
      <View style={estilosComunes.centrado}>
        <Ionicons name="calendar-outline" size={60} color={colores.borde} />
        <Text style={styles.placeholderTitle}>No tienes alquileres</Text>
        <Text style={styles.placeholderText}>Tus reservas confirmadas aparecerán aquí.</Text>
      </View>
    );
  }

  return (
    <View style={estilosComunes.pantalla}>
      <FlatList
        data={misReservas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TarjetaReserva reserva={item} onCancelar={() => confirmarCancelacion(item.id)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderTitle: {
    color: colores.textoPrimario,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  placeholderText: {
    color: colores.textoSecundario,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  listContent: {
    padding: 16,
  },
});
