// src/pages/PagoPage.js
// Confirmación del alquiler y selección del método de pago.

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Linking, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useBooking } from '../hooks/useBooking';
import OpcionPago from '../components/OpcionPago';
import PantallaCarga from '../components/PantallaCarga';
import { colores } from '../theme/colores';
import { estilosComunes } from '../theme/estilosComunes';

export default function PagoPage() {
  const { canchaId, horarioHora } = useLocalSearchParams();
  const router = useRouter();
  const { canchas, agregarReserva, isLoading } = useBooking();

  const [metodoPago, setMetodoPago] = useState('transferencia');
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Prevenir renderizado si los datos globales cargan
  if (isLoading) {
    return <PantallaCarga />;
  }

  // 2. Búsqueda segura convirtiendo a String
  const cancha = canchas.find(c => String(c.id) === String(canchaId));

  if (!cancha || !horarioHora) {
    return (
      <View style={estilosComunes.centrado}>
        <Text style={styles.errorText}>Faltan datos de la reserva.</Text>
      </View>
    );
  }

  const procesarReserva = async () => {
    setIsProcessing(true);
    const nuevaReserva = {
      id: Date.now().toString(),
      cancha,
      horarioHora,
      metodoPago,
      fecha: new Date().toLocaleDateString(),
    };

    await agregarReserva(nuevaReserva);
    setIsProcessing(false);

    router.replace('/bookings');
  };

  const handlePagar = () => {
    if (metodoPago === 'efectivo') {
      Alert.alert('¡Confirmada!', `Abonas en efectivo en el lugar.`, [{ text: 'Ver mis reservas', onPress: procesarReserva }]);
    } else {
      Alert.alert(
        'Mercado Pago',
        `Transfiere $${cancha.precioHora.toLocaleString('es-AR')} a:\n\nlauty123090\n\nCopiaremos el alias y abriremos la app.`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Copiar e ir a pagar',
            onPress: async () => {
              await Clipboard.setStringAsync('lauty123090');
              const appUrl = 'mercadopago://';
              const webUrl = 'https://www.mercadopago.com.ar/';

              try {
                const puede = await Linking.canOpenURL(appUrl);
                await Linking.openURL(puede ? appUrl : webUrl);
                setTimeout(() => {
                  Alert.alert('¿Completaste el pago?', 'Confirmaremos tu reserva.', [
                    { text: 'Aún no', style: 'cancel' },
                    { text: 'Sí, ya pagué', onPress: procesarReserva }
                  ]);
                }, 1500);
              } catch (error) { Alert.alert('Error', 'No se pudo abrir Mercado Pago.'); }
            }
          }
        ]
      );
    }
  };

  return (
    <View style={estilosComunes.pantalla}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Resumen</Text>
          <View style={styles.summaryRow}><Ionicons name="football-outline" size={20} color={colores.textoSecundario} /><Text style={styles.summaryText}>{cancha.nombre}</Text></View>
          <View style={styles.summaryRow}><Ionicons name="time-outline" size={20} color={colores.textoSecundario} /><Text style={styles.summaryText}>Hora: {horarioHora}</Text></View>
          <View style={[styles.summaryRow, styles.totalRow]}><Text style={styles.totalLabel}>Total a pagar:</Text><Text style={styles.totalValue}>${cancha.precioHora.toLocaleString('es-AR')}</Text></View>
        </View>

        <Text style={styles.sectionTitleOptions}>Elige tu método</Text>
        <OpcionPago
          seleccionada={metodoPago === 'transferencia'}
          onPress={() => setMetodoPago('transferencia')}
          titulo="Mercado Pago"
          subtitulo="Alias: lauty123090"
          iconoDer="card-outline"
          colorIconoDer={colores.azul}
        />
        <OpcionPago
          seleccionada={metodoPago === 'efectivo'}
          onPress={() => setMetodoPago('efectivo')}
          titulo="Efectivo"
          subtitulo="Pagas al llegar"
          iconoDer="cash-outline"
          colorIconoDer={colores.acento}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePagar} disabled={isProcessing}>
          {isProcessing ? <ActivityIndicator color="#fff" /> : <Text style={styles.payButtonText}>{metodoPago === 'transferencia' ? 'Copiar Alias y Pagar' : 'Confirmar Reserva'}</Text>}
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
    padding: 20,
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: colores.tarjeta,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  sectionTitle: {
    color: colores.textoPrimario,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  summaryText: {
    color: colores.textoTitulo,
    fontSize: 16,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  totalLabel: {
    color: colores.textoSecundario,
    fontSize: 16,
  },
  totalValue: {
    color: colores.acento,
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionTitleOptions: {
    color: colores.textoTitulo,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
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
  payButton: {
    backgroundColor: colores.acento,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: colores.textoPrimario,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
