# Especificación: App de Alquiler de Canchas

## 1. Descripción General
Prototipo funcional de una aplicación móvil para la reserva y gestión de canchas de fútbol 5. Permite a los usuarios explorar complejos deportivos, seleccionar horarios y confirmar reservas simulando un pago por transferencia, además de publicar nuevas canchas.

## 2. Historias de Usuario
- Como usuario, quiero ver una lista de canchas disponibles con su ubicación y precio para poder elegir dónde jugar.
- Como usuario, quiero seleccionar un horario específico en una cancha para reservarla.
- Como usuario, quiero simular el pago de mi reserva copiando el alias del complejo y abriendo Mercado Pago.
- Como usuario, quiero ver un listado de mis reservas confirmadas y poder cancelarlas si es necesario.
- Como administrador, quiero poder agregar una nueva cancha al catálogo subiendo una foto desde mi galería.

## 3. Pantallas (Vistas)
1. **Inicio (Feed):** Lista de canchas (imagen, nombre, precio, ubicación).
2. **Detalle de Cancha (Alquilar):** Muestra la información de la cancha seleccionada y una grilla de horarios disponibles/no disponibles.
3. **Confirmación de Pago:** Resumen del alquiler y métodos de pago (Efectivo o Transferencia con redirección a Mercado Pago).
4. **Mis Reservas:** Historial de alquileres confirmados con opción a cancelar.
5. **Crear Cancha:** Formulario para dar de alta un nuevo complejo.

## 4. Criterios de Aceptación
- La navegación debe implementarse con `expo-router`.
- Los datos deben provenir de una capa de servicios (mocks) que simule latencia de red.
- Mientras los datos cargan, se debe mostrar un indicador de carga (`ActivityIndicator`).
- Los formularios deben validar que los campos no estén vacíos.
- El flujo de pago por transferencia debe copiar automáticamente el alias al portapapeles.

## 5. Fuera de Alcance
- Autenticación de usuarios (Login/Registro).
- Integración real con la API de Mercado Pago o pasarelas de pago.
- Backend real o base de datos (todo se maneja en memoria/estado global).