# Documento del Proceso - SDD

## 1. Investigación
*(Sección completada en instancia anterior).*

## 2. Especificación y Planificación
**Idea Original:** App para reservar canchas de fútbol 5.
**Prompts utilizados para la spec y tareas:** 
- *"Genera una especificación para una app de alquiler de canchas usando React Native y Expo."*
- *"Arma la estructura de carpetas y las tareas atómicas usando expo-router y sin backend real."*
**Correcciones a la propuesta de la IA:** La IA sugirió inicialmente usar React Navigation y Firebase. Corregimos la spec para forzar el uso de `expo-router` y datos mock locales para cumplir con las restricciones de la materia.

## 3. Setup
**Skills instaladas:** No utilizamos un agente CLI local, sino desarrollo guiado por prompts iterativos en LLM.
**Configuración:** Inicializamos el proyecto, modificamos el `app.json` para agregar el `scheme`, e instalamos `expo-router`, `expo-image-picker` y `expo-clipboard`.

## 4. Desarrollo
**T01 a T04 - Base, Mocks y Feed:** 
- *Prompt:* "Crea el Context API y la vista principal consumiendo las canchas. Agrega latencia simulada."
- *Corrección manual:* La IA no manejaba bien el tiempo de carga entre la navegación. Agregamos condicionales `if (isLoading)` para evitar errores de renderizado.

**T05 y T06 - Alquiler y Pagos:**
- *Prompt:* "Crea la vista para seleccionar el horario y la de pagos. Que el método de transferencia redirija a Mercado Pago."
- *Corrección manual:* Mercado Pago no permite pasar el alias por URL. Investigamos y le pedimos a la IA implementar un "truco": copiar el alias al portapapeles usando `expo-clipboard` antes de abrir la app. Tuvimos un conflicto de dependencias (`ERESOLVE`) que solucionamos usando `--legacy-peer-deps`.

**T07 y T08 - Reservas y Formulario:**
- *Prompt:* "Crea la vista de Mis Reservas con opción a cancelar y el formulario para crear canchas usando la cámara."
- *Corrección manual:* Ajustamos el código de la galería porque `ImagePicker.MediaTypeOptions` estaba deprecado, actualizándolo a `mediaTypes: ['images']`.

## 5. Conclusiones
Desarrollar con IA (Spec-Driven Development) demostró que el mayor desafío no es escribir código, sino orquestar la arquitectura. Cuando iniciamos sin definir bien el enrutador, la IA usó React Navigation. Al migrar a `expo-router`, tuvimos problemas de sincronización de datos que rompían la app ("Cancha no encontrada"). Aprendimos que si le damos a la IA tareas demasiado grandes o sin contexto claro (como nuestro `AGENTS.md`), inventa soluciones que se desvían de las reglas del proyecto. SDD nos obligó a pensar primero y programar después.