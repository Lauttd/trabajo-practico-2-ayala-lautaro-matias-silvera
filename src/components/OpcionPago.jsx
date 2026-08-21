// src/components/OpcionPago.js
// Fila de método de pago con radio button y detalle.

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores } from '../theme/colores';

export default function OpcionPago({
  seleccionada,
  onPress,
  titulo,
  subtitulo,
  iconoDer,
  colorIconoDer,
}) {
  return (
    <TouchableOpacity
      style={[styles.paymentOption, seleccionada && styles.paymentOptionSelected]}
      onPress={onPress}
    >
      <View style={styles.paymentOptionLeft}>
        <Ionicons
          name={seleccionada ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={seleccionada ? colores.acento : colores.textoInactivo}
        />
        <View style={styles.paymentOptionTexts}>
          <Text style={styles.paymentOptionTitle}>{titulo}</Text>
          <Text style={styles.paymentOptionSubtitle}>{subtitulo}</Text>
        </View>
      </View>
      <Ionicons name={iconoDer} size={28} color={colorIconoDer} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colores.tarjeta,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentOptionSelected: {
    borderColor: colores.acento,
    backgroundColor: colores.acentoFondoClaro,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentOptionTexts: {
    gap: 4,
  },
  paymentOptionTitle: {
    color: colores.textoPrimario,
    fontSize: 16,
    fontWeight: '600',
  },
  paymentOptionSubtitle: {
    color: colores.textoSecundario,
    fontSize: 13,
  },
});
