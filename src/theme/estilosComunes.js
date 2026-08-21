// src/theme/estilosComunes.js
// Estilos compartidos entre pantallas para evitar duplicación.

import { StyleSheet } from 'react-native';
import { colores } from './colores';

export const estilosComunes = StyleSheet.create({
  // Contenedor raíz de una pantalla con fondo
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  // Contenedor para estados de carga, error o vacío
  centrado: {
    flex: 1,
    backgroundColor: colores.fondo,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
