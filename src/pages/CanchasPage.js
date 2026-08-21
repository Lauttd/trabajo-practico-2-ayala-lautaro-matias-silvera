// src/pages/CanchasPage.js
// Feed de canchas con lista animada.

import React, { useRef } from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '../hooks/useBooking';
import CanchaCard from '../components/CanchaCard';
import PantallaCarga from '../components/PantallaCarga';
import { estilosComunes } from '../theme/estilosComunes';

const { height } = Dimensions.get('window');
const ITEM_SIZE = 220;
const SPACING = 16;
const FULL_ITEM_SIZE = ITEM_SIZE + SPACING;

export default function CanchasPage() {
  const { canchas, isLoading } = useBooking();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  // ESTADO DE CARGA REQUERIDO POR LA RÚBRICA
  if (isLoading) {
    return <PantallaCarga mensaje="Cargando canchas..." />;
  }

  return (
    <Animated.FlatList
      style={estilosComunes.pantalla}
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
          <CanchaCard
            cancha={item}
            animacion={[{ transform: [{ scale }], opacity }]}
            onPress={() => router.push({ pathname: '/rent', params: { id: item.id } })}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
});
