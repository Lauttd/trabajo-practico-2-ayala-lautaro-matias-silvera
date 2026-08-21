// src/components/CanchaCard.js
// Tarjeta del feed de canchas. Recibe los estilos animados calculados por la página.

import React from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import { colores } from '../theme/colores';

const ITEM_SIZE = 220;
const SPACING = 16;

export default function CanchaCard({ cancha, animacion, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Animated.View style={[styles.card, animacion]}>
        <Animated.Image source={{ uri: cancha.imagen }} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.overlay} />
        <View style={styles.cardContent}>
          <View style={styles.headerInfo}>
            <Text style={styles.canchaNombre}>{cancha.nombre}</Text>
            <Text style={styles.canchaUbicacion}>{cancha.ubicacion}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.pricePrefix}>por hora</Text>
            <Text style={styles.priceValue}>${cancha.precioHora.toLocaleString('es-AR')}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: ITEM_SIZE,
    borderRadius: 20,
    marginBottom: SPACING,
    overflow: 'hidden',
    backgroundColor: colores.tarjeta,
    elevation: 8,
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colores.overlay,
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  headerInfo: {
    gap: 4,
  },
  canchaNombre: {
    color: colores.textoPrimario,
    fontSize: 22,
    fontWeight: 'bold',
  },
  canchaUbicacion: {
    color: colores.textoSecundario,
    fontSize: 14,
  },
  priceContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colores.acentoFuerte,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'flex-end',
  },
  pricePrefix: {
    color: colores.textoVerde,
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  priceValue: {
    color: colores.textoPrimario,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
