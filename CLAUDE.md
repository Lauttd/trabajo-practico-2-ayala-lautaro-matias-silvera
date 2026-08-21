# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Comandos

- Instalar dependencias: `npm install`
- Levantar el dev server de Expo: `npm run start`.

No hay tests ni linter configurados.

## Arquitectura

App de Expo (React Native) para reservar canchas de fútbol 5. **No hay backend**: todo se maneja en memoria a través de mocks asíncronos.

### Flujo de datos
1. `src/services/mockApi.js` — funciones async (`apiGetCanchas`, `apiGetReservas`, `apiCrearReserva`, `apiCancelarReserva`, `apiCrearCancha`) que simulan latencia con `setTimeout` y mutan arrays en memoria (`CANCHAS_INICIALES`, `misReservasMock`). Por eso **los datos se reinician al recargar la app**.
2. `src/context/BookingContext.js` — `BookingProvider` montado en el layout raíz. Consume los mocks y expone `canchas`, `misReservas`, `isLoading` y las acciones `agregarReserva`, `cancelarReserva`, `agregarCancha`. Tras cada mutación recarga desde los mocks (reemplaza el estado) para simular una base real.
3. Las pantallas leen el contexto con `useContext(BookingContext)` — no hay props drilling.

### Navegación (expo-router, file-based)
- `app/_layout.js` — envuelve todo en `BookingProvider` y define el `Stack`. `rent` y `payment` se registran como pantallas secundarias con header (quedan fuera del tab bar).
- `app/(tabs)/_layout.js` — `Tabs` con 3 pestañas: `index` (Canchas), `create` (Crear), `bookings` (Mis Reservas).
- **Flujo de reserva:** `index` → `router.push('/rent', { id })` → `rent` → `router.push('/payment', { canchaId, horarioHora })` → `payment` confirma con `router.replace('/bookings')` para evitar volver atrás al formulario de pago.
- Los params se leen con `useLocalSearchParams` y los ids se comparan con `String(c.id) === String(id)` — la app funciona igual si llegan como string o número.

### Convenciones y gotchas
- Cada pantalla chequea `if (isLoading)` del contexto y muestra `ActivityIndicator` antes de usar los datos. Sin este guard, `canchas.find(...)` devuelve `undefined` durante la carga y rompe la pantalla ("Cancha no encontrada"). No eliminarlo.
- La grilla de horarios de `rent.js` es un `HORARIOS_MOCK` local hardcodeado, no sale del contexto.
- Precios formateados con `toLocaleString('es-AR')`.
- El pago por transferencia copia el alias al portapapeles con `expo-clipboard` y abre Mercado Pago con `Linking` (no se pasa el alias por URL porque MP no lo permite).
- `expo-image-picker` usa la API nueva: `mediaTypes: ['images']` (la versión deprecada `MediaTypeOptions` no compila).
- Tema oscuro fijo: fondo `#0F172A`, tarjetas `#1E293B`, acento `#10B981`.
- `.claude/settings.json` habilita el plugin `expo@claude-plugins-official`.
