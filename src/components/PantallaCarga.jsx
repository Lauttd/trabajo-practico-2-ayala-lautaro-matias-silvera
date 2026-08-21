// src/components/PantallaCarga.js
// Indicador de carga centrado. Reemplaza el patrón ActivityIndicator repetido en las pantallas.

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colores } from '../theme/colores';
import { estilosComunes } from '../theme/estilosComunes';

export default function PantallaCarga({ mensaje }) {
  return (
    <View style={estilosComunes.centrado}>
      <ActivityIndicator size="large" color={colores.acento} />
      {mensaje ? <Text style={styles.texto}>{mensaje}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    color: colores.textoSecundario,
    marginTop: 10,
  },
});
