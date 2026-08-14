# Lista de Tareas (Tasks)

- [x] **T01 - Setup y Navegación:** Inicializar proyecto, instalar `expo-router` y configurar los layouts raíz y de pestañas (Tabs).
- [x] **T02 - Capa de Mocks:** Crear `services/mockApi.js` con las funciones asíncronas para simular la base de datos con latencia.
- [x] **T03 - Estado Global:** Implementar `BookingContext.js` para consumir los mocks y proveer los datos y estados de carga (`isLoading`) a toda la app.
- [x] **T04 - Pantalla de Inicio:** Maquetar `app/(tabs)/index.js` para listar las canchas usando FlatList animado y manejar el estado de carga.
- [x] **T05 - Pantalla de Detalle (Rent):** Crear `app/rent.js` para recibir el ID por parámetro, mostrar la grilla de horarios y validar selección.
- [x] **T06 - Pantalla de Pago:** Crear `app/payment.js`, implementar `expo-clipboard` para el alias y la redirección a Mercado Pago vía `Linking`.
- [x] **T07 - Mis Reservas:** Maquetar `app/(tabs)/bookings.js` para listar los alquileres confirmados y agregar la función de cancelación.
- [x] **T08 - Formulario de Creación:** Implementar `app/(tabs)/create.js` con `expo-image-picker`, validación de campos y loader de guardado.