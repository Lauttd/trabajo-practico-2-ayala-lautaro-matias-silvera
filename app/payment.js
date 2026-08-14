import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Linking, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BookingContext } from '../src/context/BookingContext';

export default function PaymentScreen() {
  const { canchaId, horarioHora } = useLocalSearchParams();
  const router = useRouter();
  const { canchas, agregarReserva, isLoading } = useContext(BookingContext);
  
  const [metodoPago, setMetodoPago] = useState('transferencia');
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Prevenir renderizado si los datos globales cargan
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  // 2. Búsqueda segura convirtiendo a String
  const cancha = canchas.find(c => String(c.id) === String(canchaId));

  if (!cancha || !horarioHora) {
    return (
      <View style={styles.centerContainer}>
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
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Resumen</Text>
          <View style={styles.summaryRow}><Ionicons name="football-outline" size={20} color="#94A3B8" /><Text style={styles.summaryText}>{cancha.nombre}</Text></View>
          <View style={styles.summaryRow}><Ionicons name="time-outline" size={20} color="#94A3B8" /><Text style={styles.summaryText}>Hora: {horarioHora}</Text></View>
          <View style={[styles.summaryRow, styles.totalRow]}><Text style={styles.totalLabel}>Total a pagar:</Text><Text style={styles.totalValue}>${cancha.precioHora.toLocaleString('es-AR')}</Text></View>
        </View>

        <Text style={styles.sectionTitleOptions}>Elige tu método</Text>
        <TouchableOpacity style={[styles.paymentOption, metodoPago === 'transferencia' && styles.paymentOptionSelected]} onPress={() => setMetodoPago('transferencia')}>
          <View style={styles.paymentOptionLeft}><Ionicons name={metodoPago === 'transferencia' ? 'radio-button-on' : 'radio-button-off'} size={24} color={metodoPago === 'transferencia' ? '#10B981' : '#64748B'} /><View style={styles.paymentOptionTexts}><Text style={styles.paymentOptionTitle}>Mercado Pago</Text><Text style={styles.paymentOptionSubtitle}>Alias: lauty123090</Text></View></View><Ionicons name="card-outline" size={28} color="#3B82F6" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.paymentOption, metodoPago === 'efectivo' && styles.paymentOptionSelected]} onPress={() => setMetodoPago('efectivo')}>
          <View style={styles.paymentOptionLeft}><Ionicons name={metodoPago === 'efectivo' ? 'radio-button-on' : 'radio-button-off'} size={24} color={metodoPago === 'efectivo' ? '#10B981' : '#64748B'} /><View style={styles.paymentOptionTexts}><Text style={styles.paymentOptionTitle}>Efectivo</Text><Text style={styles.paymentOptionSubtitle}>Pagas al llegar</Text></View></View><Ionicons name="cash-outline" size={28} color="#10B981" />
        </TouchableOpacity>
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
  mainContainer: { flex: 1, backgroundColor: '#0F172A' },
  centerContainer: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#EF4444', fontSize: 16 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  summaryCard: { backgroundColor: '#1E293B', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: '#334155' },
  sectionTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  summaryText: { color: '#F8FAFC', fontSize: 16 },
  totalRow: { marginTop: 8, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#334155', justifyContent: 'space-between', marginBottom: 0 },
  totalLabel: { color: '#94A3B8', fontSize: 16 },
  totalValue: { color: '#10B981', fontSize: 22, fontWeight: 'bold' },
  sectionTitleOptions: { color: '#F8FAFC', fontSize: 18, fontWeight: '600', marginBottom: 16 },
  paymentOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1E293B', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 2, borderColor: 'transparent' },
  paymentOptionSelected: { borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.05)' },
  paymentOptionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  paymentOptionTexts: { gap: 4 },
  paymentOptionTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  paymentOptionSubtitle: { color: '#94A3B8', fontSize: 13 },
  footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#1E293B', padding: 20, borderTopWidth: 1, borderTopColor: '#334155' },
  payButton: { backgroundColor: '#10B981', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  payButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});