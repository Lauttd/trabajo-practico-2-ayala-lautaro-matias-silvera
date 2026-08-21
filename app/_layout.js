import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { BookingProvider } from '../src/context/BookingContext';
import { colores } from '../src/theme/colores';

export default function RootLayout() {
  return (
    <BookingProvider>
      <StatusBar barStyle="light-content" backgroundColor={colores.fondo} />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Las pestañas principales */}
        <Stack.Screen name="(tabs)" />
        {/* Pantallas secundarias ocultas del menú inferior */}
        <Stack.Screen
          name="rent"
          options={{
            headerShown: true,
            title: 'Detalle de Cancha',
            headerStyle: { backgroundColor: colores.tarjeta },
            headerTintColor: colores.textoPrimario,
          }}
        />
        <Stack.Screen
          name="payment"
          options={{
            headerShown: true,
            title: 'Confirmar Pago',
            headerStyle: { backgroundColor: colores.tarjeta },
            headerTintColor: colores.textoPrimario,
          }}
        />
      </Stack>
    </BookingProvider>
  );
}
