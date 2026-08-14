// src/context/BookingContext.js
import React, { createContext, useState, useEffect } from 'react';
import { apiGetCanchas, apiGetReservas, apiCrearReserva, apiCancelarReserva, apiCrearCancha } from '../services/mockApi';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [misReservas, setMisReservas] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulamos la carga inicial desde la red
  useEffect(() => {
    const cargarDatos = async () => {
      setIsLoading(true);
      const dataCanchas = await apiGetCanchas();
      const dataReservas = await apiGetReservas();
      setCanchas(dataCanchas);
      setMisReservas(dataReservas);
      setIsLoading(false);
    };
    cargarDatos();
  }, []);

  const agregarReserva = async (nuevaReserva) => {
    await apiCrearReserva(nuevaReserva);
    setMisReservas(await apiGetReservas()); // Recargamos para simular base de datos
  };

  const cancelarReserva = async (idReserva) => {
    await apiCancelarReserva(idReserva);
    setMisReservas(await apiGetReservas());
  };

  const agregarCancha = async (nuevaCancha) => {
    await apiCrearCancha(nuevaCancha);
    setCanchas(await apiGetCanchas());
  };

  return (
    <BookingContext.Provider value={{ misReservas, agregarReserva, cancelarReserva, canchas, agregarCancha, isLoading }}>
      {children}
    </BookingContext.Provider>
  );
};