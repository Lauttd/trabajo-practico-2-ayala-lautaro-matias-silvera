// src/pages/DetalleCanchaPage.js
// Detalle de la cancha con grilla de horarios y selección.

import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useBooking } from '../hooks/useBooking';
import { useHorarios } from '../hooks/useHorarios';
import BloqueHorario from '../components/BloqueHorario';
import PantallaCarga from '../components/PantallaCarga';
import { colores } from '../theme/colores';
import { estilosComunes } from '../theme/estilosComunes';

export default function DetalleCanchaPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { canchas, isLoading } = useBooking();
  const { horarios, isLoading: isLoadingHorarios } = useHorarios(id);

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  // 1. Prevenir la búsqueda si los datos todavía están cargando
  if (isLoading) {
    return <PantallaCarga />;
  }

  // 2. Comparación segura convirtiendo ambos valores a String
  const cancha = canchas.find(c => String(c.id) === String(id));

  if (!cancha) {
    return (
      <View style={estilosComunes.centrado}>
        <Text style={styles.errorText}>Cancha no encontrada.</Text>
      </View>
    );
  }

  // 3. Esperar la grilla de horarios de la capa de mocks
  if (isLoadingHorarios) {
    return <PantallaCarga />;
  }

  const handleAlquilar = () => {
    if (!horarioSeleccionado) {
      Alert.alert('Atención', 'Selecciona un horario disponible.');
      return;
    }
    router.push({ pathname: '/payment', params: { canchaId: cancha.id, horarioHora: horarioSeleccionado.hora } });
  };

  return (
    <View style={estilosComunes.pantalla}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: cancha.imagen }} style={styles.coverImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{cancha.nombre}</Text>
          <Text style={styles.subtitle}>{cancha.ubicacion}</Text>
        </View>

        <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
        <View style={styles.gridContainer}>
          {horarios.map((item) => (
            <BloqueHorario
              key={item.id}
              horario={item}
              seleccionado={horarioSeleccionado?.id === item.id}
              onPress={() => setHorarioSeleccionado(item)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.rentButton} onPress={handleAlquilar}>
          <Text style={styles.rentButtonText}>Alquilar por ${cancha.precioHora.toLocaleString('es-AR')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: colores.danger,
    fontSize: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  coverImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: colores.tarjeta,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: colores.textoPrimario,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: colores.textoSecundario,
    fontSize: 15,
  },
  sectionTitle: {
    color: colores.textoTitulo,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colores.tarjeta,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
  },
  rentButton: {
    backgroundColor: colores.acento,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  rentButtonText: {
    color: colores.textoPrimario,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
