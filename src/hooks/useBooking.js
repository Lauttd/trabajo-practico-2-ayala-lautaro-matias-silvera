// src/hooks/useBooking.js
// Hook de acceso al estado global de reservas.

import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBooking debe usarse dentro de <BookingProvider>.');
  }

  return context;
}
