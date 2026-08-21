// src/components/BloqueHorario.js
// Celda de la grilla de horarios con sus tres estados visuales.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colores } from '../theme/colores';

export default function BloqueHorario({ horario, seleccionado, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={!horario.disponible}
      onPress={onPress}
      style={[
        styles.timeBlock,
        horario.disponible ? styles.blockAvailable : styles.blockUnavailable,
        seleccionado && styles.blockSelected,
      ]}
    >
      <Text style={[styles.timeText, horario.disponible ? styles.textAvailable : styles.textUnavailable]}>
        {horario.hora}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  timeBlock: {
    width: '30%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  blockAvailable: {
    backgroundColor: colores.acentoTransparente,
    borderColor: colores.acento,
  },
  blockUnavailable: {
    backgroundColor: colores.dangerTransparente,
    borderColor: colores.dangerOscuro,
  },
  blockSelected: {
    backgroundColor: colores.acento,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textAvailable: {
    color: colores.acento,
  },
  textUnavailable: {
    color: colores.dangerOscuro,
  },
});
