# Reglas y Convenciones del Proyecto

- **Navegación:** Utilizar siempre `expo-router`. Nada de `@react-navigation/native`. Usar `useRouter` y `useLocalSearchParams` para moverse y pasar datos.
- **Manejo de Estado:** Utilizar Context API. El estado debe ser provisto en el layout principal para que todas las rutas tengan acceso.
- **Mocks:** Todo pedido de datos debe pasar por funciones asíncronas que simulen demoras en la red.
- **UI/UX:** Proveer feedback visual. Usar `ActivityIndicator` cuando un proceso asíncrono esté corriendo.
- **Idioma:** Variables, comentarios y UI en Español.