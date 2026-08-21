// src/hooks/useHorarios.js
// Carga la grilla de horarios de una cancha desde la capa de mocks.

import { useState, useEffect } from 'react';
import { apiGetHorarios } from '../services/mockApi';

export function useHorarios(idCancha) {
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let activo = true;

    const cargarHorarios = async () => {
      setIsLoading(true);
      const data = await apiGetHorarios(idCancha);
      if (activo) {
        setHorarios(data);
        setIsLoading(false);
      }
    };

    cargarHorarios();

    return () => {
      activo = false;
    };
  }, [idCancha]);

  return { horarios, isLoading };
}
