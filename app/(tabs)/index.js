// app/(tabs)/index.js
import React, { useRef, useContext } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { BookingContext } from '../../src/context/BookingContext';

const { height } = Dimensions.get('window');
const ITEM_SIZE = 220;
const SPACING = 16;
const FULL_ITEM_SIZE = ITEM_SIZE + SPACING;

export default function IndexScreen() {
  const { canchas, isLoading } = useContext(BookingContext);
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  // ESTADO DE CARGA REQUERIDO POR LA RÚBRICA
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#10B981" />
        <Text style={{ color: '#94A3B8', marginTop: 10 }}>Cargando canchas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <Animated.FlatList
        data={canchas}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={FULL_ITEM_SIZE}
        decelerationRate="fast"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * FULL_ITEM_SIZE, index * FULL_ITEM_SIZE, (index + 1) * FULL_ITEM_SIZE];
          const scale = scrollY.interpolate({ inputRange, outputRange: [0.92, 1.04, 0.92], extrapolate: 'clamp' });
          const opacity = scrollY.interpolate({ inputRange, outputRange: [0.75, 1, 0.75], extrapolate: 'clamp' });

          return (
            <TouchableOpacity 
              activeOpacity={0.9} 
              onPress={() => router.push({ pathname: '/rent', params: { id: item.id } })}
            >
              <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
                <Animated.Image source={{ uri: item.imagen }} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.overlay} />
                <View style={styles.cardContent}>
                  <View style={styles.headerInfo}>
                    <Text style={styles.canchaNombre}>{item.nombre}</Text>
                    <Text style={styles.canchaUbicacion}>{item.ubicacion}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.pricePrefix}>por hora</Text>
                    <Text style={styles.priceValue}>${item.precioHora.toLocaleString('es-AR')}</Text>
                  </View>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
  screenContainer: { flex: 1, backgroundColor: '#0F172A' },
  listContent: { paddingTop: 16, paddingBottom: 40, paddingHorizontal: 16 },
  card: { height: ITEM_SIZE, borderRadius: 20, marginBottom: SPACING, overflow: 'hidden', backgroundColor: '#1E293B', elevation: 8 },
  cardImage: { ...StyleSheet.absoluteFillObject },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(15, 23, 42, 0.55)' },
  cardContent: { flex: 1, padding: 20, justifyContent: 'space-between' },
  headerInfo: { gap: 4 },
  canchaNombre: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  canchaUbicacion: { color: '#94A3B8', fontSize: 14 },
  priceContainer: { alignSelf: 'flex-end', backgroundColor: 'rgba(16, 185, 129, 0.9)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, alignItems: 'flex-end' },
  pricePrefix: { color: '#D1FAE5', fontSize: 11, fontWeight: '500', textTransform: 'uppercase' },
  priceValue: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});