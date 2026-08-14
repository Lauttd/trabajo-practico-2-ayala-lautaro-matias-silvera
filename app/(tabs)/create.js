// app/(tabs)/create.js
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { BookingContext } from '../../src/context/BookingContext';

export default function CreateCourtScreen() {
  const router = useRouter();
  const { agregarCancha } = useContext(BookingContext);
  
  const [imageUri, setImageUri] = useState(null);
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [horaApertura, setHoraApertura] = useState('');
  const [horaCierre, setHoraCierre] = useState('');
  const [precioHora, setPrecioHora] = useState('');
  const [redesSociales, setRedesSociales] = useState('');
  
  // Estado de carga para el botón de guardado (Requisito de rúbrica)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos permisos para acceder a tus fotos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [16, 9], quality: 0.8 });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const handleGuardar = async () => {
    if (!nombre.trim() || !ubicacion.trim() || !precioHora.trim()) {
      Alert.alert('Campos incompletos', 'Completa al menos nombre, ubicación y precio.');
      return;
    }

    setIsSubmitting(true);

    const nuevaCancha = {
      id: Date.now().toString(),
      nombre,
      ubicacion,
      horario: `${horaApertura || '08:00'} a ${horaCierre || '23:00'}`,
      precioHora: Number(precioHora),
      redesSociales,
      imagen: imageUri || 'https://images.unsplash.com/photo-1529900241445-56b9c9f7435f?w=600',
    };

    await agregarCancha(nuevaCancha);
    
    setIsSubmitting(false);

    Alert.alert('¡Éxito!', 'La cancha ha sido registrada.', [
      {
        text: 'Ir al inicio',
        onPress: () => {
          setImageUri(null); setNombre(''); setUbicacion(''); setHoraApertura(''); setHoraCierre(''); setPrecioHora(''); setRedesSociales('');
          router.push('/');
        }
      }
    ]);
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imagePickerBox} activeOpacity={0.8} onPress={pickImage}>
          {imageUri ? <Image source={{ uri: imageUri }} style={styles.previewImage} /> : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera-outline" size={42} color="#10B981" />
              <Text style={styles.imagePlaceholderText}>Añadir foto de la galería</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.formSection}>
          <Text style={styles.label}>Nombre del complejo</Text>
          <TextInput style={styles.input} placeholder="Ej. Predio San Francisco" placeholderTextColor="#64748B" value={nombre} onChangeText={setNombre} />
          
          <Text style={styles.label}>Ubicación / Dirección</Text>
          <TextInput style={styles.input} placeholder="Ej. Av. Gutnisky 1200" placeholderTextColor="#64748B" value={ubicacion} onChangeText={setUbicacion} />

          <View style={styles.row}>
            <View style={styles.halfColumn}>
              <Text style={styles.label}>Apertura</Text>
              <TextInput style={styles.input} placeholder="Ej. 14:00" placeholderTextColor="#64748B" value={horaApertura} onChangeText={setHoraApertura} />
            </View>
            <View style={styles.halfColumn}>
              <Text style={styles.label}>Cierre</Text>
              <TextInput style={styles.input} placeholder="Ej. 23:00" placeholderTextColor="#64748B" value={horaCierre} onChangeText={setHoraCierre} />
            </View>
          </View>

          <Text style={styles.label}>Precio por hora ($)</Text>
          <TextInput style={styles.input} placeholder="Ej. 12000" placeholderTextColor="#64748B" keyboardType="numeric" value={precioHora} onChangeText={setPrecioHora} />

          <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8} onPress={handleGuardar} disabled={isSubmitting}>
            {isSubmitting ? <ActivityIndicator color="#fff" /> : <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" />}
            <Text style={styles.submitBtnText}>{isSubmitting ? 'Publicando...' : 'Publicar Cancha'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  imagePickerBox: { height: 190, backgroundColor: '#1E293B', borderRadius: 16, borderWidth: 2, borderColor: '#334155', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: 20 },
  previewImage: { width: '100%', height: '100%' },
  imagePlaceholder: { alignItems: 'center', gap: 6 },
  imagePlaceholderText: { color: '#F8FAFC', fontSize: 15, fontWeight: '600' },
  formSection: { gap: 12 },
  label: { color: '#94A3B8', fontSize: 13, fontWeight: '600', marginBottom: -4 },
  input: { backgroundColor: '#1E293B', borderWidth: 1, borderColor: '#334155', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: '#FFFFFF', fontSize: 15 },
  row: { flexDirection: 'row', gap: 12 },
  halfColumn: { flex: 1, gap: 12 },
  submitBtn: { marginTop: 14, backgroundColor: '#10B981', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 15, borderRadius: 12, elevation: 4 },
  submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});