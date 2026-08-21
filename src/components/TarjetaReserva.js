// src/components/TarjetaReserva.js
// Tarjeta de una reserva confirmada en Mis Reservas.

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores } from '../theme/colores';

export default function TarjetaReserva({ reserva, onCancelar }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: reserva.cancha.imagen }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.canchaNombre}>{reserva.cancha.nombre}</Text>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={16} color={colores.textoSecundario} />
          <Text style={styles.detailText}>{reserva.fecha} - {reserva.horarioHora}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="cash-outline" size={16} color={colores.textoSecundario} />
          <Text style={styles.detailText}>Pago: {reserva.metodoPago === 'efectivo' ? 'En el lugar' : 'Mercado Pago'}</Text>
        </View>

        <View style={styles.actionRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>Confirmada</Text></View>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancelar}>
            <Ionicons name="trash-outline" size={18} color={colores.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colores.tarjeta,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colores.borde,
  },
  cardImage: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
  },
  cardInfo: {
    flex: 1,
    padding: 16,
    gap: 6,
  },
  canchaNombre: {
    color: colores.textoPrimario,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    color: colores.textoSecundario,
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  badge: {
    backgroundColor: colores.acentoFondo,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colores.acento,
  },
  badgeText: {
    color: colores.acento,
    fontSize: 12,
    fontWeight: 'bold',
  },
  cancelBtn: {
    padding: 6,
    backgroundColor: colores.dangerTransparente,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colores.danger,
  },
});
