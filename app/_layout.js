import React from 'react';
import { Stack } from 'expo-router';
import { BookingProvider } from '../src/context/BookingContext';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <BookingProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Las pestañas principales */}
        <Stack.Screen name="(tabs)" />
        {/* Pantallas secundarias ocultas del menú inferior */}
        <Stack.Screen 
          name="rent" 
          options={{ 
            headerShown: true, 
            title: 'Detalle de Cancha',
            headerStyle: { backgroundColor: '#1E293B' },
            headerTintColor: '#fff'
          }} 
        />
        <Stack.Screen 
          name="payment" 
          options={{ 
            headerShown: true, 
            title: 'Confirmar Pago',
            headerStyle: { backgroundColor: '#1E293B' },
            headerTintColor: '#fff'
          }} 
        />
      </Stack>
    </BookingProvider>
  );
}