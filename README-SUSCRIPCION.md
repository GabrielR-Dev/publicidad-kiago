# Cómo activar la suscripción con Google Sheets

Seguí estos pasos una sola vez (~5 minutos). Después cada suscripción de la
landing aparece como una fila nueva en tu planilla.

## 1. Crear la planilla

1. Entrá a [sheets.new](https://sheets.new) (con tu cuenta de Google).
2. Nombrala, por ejemplo: `Kiago · Lista de espera`.
3. Opcional: renombrá la primera hoja (pestaña) como `Suscripciones`.
   Si no lo hacés, el script la crea solo con los encabezados.

## 2. Pegar el código

1. En la planilla: menú **Extensiones → Apps Script**.
2. Borrá el contenido del editor y pegá todo el código de
   `apps-script-codigo.js`.
3. Guardá (ícono de disquete o `Ctrl+S`).

## 3. Publicar como app web

1. Botón **Implementar → Nueva implementación** (arriba a la derecha).
2. Tocá el engranaje ⚙ y elegí **Aplicación web**.
3. Configurá así:
   - **Descripción:** Kiago waitlist
   - **Ejecutar como:** Yo (tu mail)
   - **Quién tiene acceso:** **Cualquier persona**
4. **Implementar** → te pide autorizar permisos → **Permitir**
   (si aparece la advertencia "Google no verificó esta app",
   entrá a Opciones avanzadas → Ir a "nombre del proyecto" (no seguro)).
5. Copiá la **URL de la aplicación web**: termina en `/exec`.
   (Ignorá la que termina en `/dev`.)

## 4. Conectar la landing

1. Abrí `index.html` y buscá `WAITLIST_ENDPOINT` (está al principio del
   `<script>` del final, marcado con `👉`).
2. Pegá la URL entre las comillas:

   ```js
   var WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec';
   ```

3. Guardá y probá el formulario en el navegador.

## 5. Probar

- Enviá una suscripción de prueba con tu propio mail.
- Volvé a la planilla: debería aparecer una fila nueva
  (Fecha · Email · Perfil).
- Ojo: si estabas en la lista simulada, el navegador te recuerda la
  última suscripción enviada desde ese formulario; probá con otro mail
  o desde una ventana de incógnito.

## Notas

- Cada cambio de código en Apps Script exige **implementar una versión
  nueva** (Implementar → Administrar implementaciones → ✏️ → Nueva versión)
  para que se aplique. La URL no cambia.
- Si más adelante querés también que te llegue un mail por cada
  suscripción, se le agrega `MailApp.sendEmail(...)` al script — avisame.
