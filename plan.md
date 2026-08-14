# Plan Técnico

## 1. Stack Tecnológico
- **Framework:** React Native + Expo
- **Navegación:** `expo-router` (File-based routing)
- **Estado Global:** Context API nativo de React
- **Datos:** Mocks asíncronos simulados (Promises + setTimeout)
- **Librerías Extra:** `expo-image-picker` (galería), `expo-clipboard` (portapapeles)

## 2. Estructura de Carpetas
/app
  /(tabs)
    _layout.js      # Menú inferior
    index.js        # Inicio (Feed)
    bookings.js     # Mis Reservas
    create.js       # Crear Cancha
  _layout.js        # Layout raíz (Stack)
  rent.js           # Detalle y horarios
  payment.js        # Flujo de pago
/src
  /context
    BookingContext.js # Estado global y lógica de negocio
  /services
    mockApi.js      # Funciones async que simulan el backend