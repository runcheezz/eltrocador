# Guía de configuración — Reservas con Netlify Database + EmailJS

## PARTE 1: Base de datos de reservas (Netlify Database)

Las reservas se guardan en una base de datos Postgres gestionada por Netlify. No hay que configurar nada: se crea automáticamente al desplegar.

- La tabla `reservations` guarda fecha, hora, nombre, correo, teléfono y número de personas.
- Existe una restricción única sobre **fecha + hora**: si una hora ya está reservada, la base de datos rechaza cualquier otra reserva para ese mismo horario (aunque dos personas reserven a la vez).
- La API está en `/api/reservations` (función `netlify/functions/reservations.ts`).
- Las reservas pueden consultarse desde el panel de Netlify, en la sección Database del proyecto.

---

## PARTE 2: EmailJS (correos de notificación)

### Paso 1 — Crear cuenta
1. Ve a https://emailjs.com y regístrate gratis.
2. En **Email Services**, añade tu servicio de correo (Gmail, Outlook, etc.).
   - Usa la cuenta desde la que quieres recibir las notificaciones del negocio.
   - Anota el **Service ID**.

### Paso 2 — Crear plantilla para el negocio
1. En **Email Templates**, crea una plantilla nueva.
2. En "To Email", pon el correo del negocio (el que me indicaste).
3. En el asunto y el cuerpo, usa estas variables:
   - `{{guest_name}}` — nombre del cliente
   - `{{guest_email}}` — correo del cliente
   - `{{guest_phone}}` — teléfono
   - `{{party_size}}` — número de personas
   - `{{reservation_date}}` — fecha de la reserva
   - `{{reservation_time}}` — hora de la reserva
4. Anota el **Template ID**.

### Paso 3 — Crear plantilla para el cliente
1. Crea otra plantilla.
2. En "To Email", pon `{{to_email}}` (así se enviará al correo del cliente).
3. Usa las mismas variables en el cuerpo del mensaje.
4. Anota el **Template ID**.

### Paso 4 — Obtener la Public Key
1. En **Account → API Keys**, copia tu **Public Key**.

### Paso 5 — Conectar al proyecto
Rellena estos valores en el archivo `.env`:

```
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_BUSINESS=tu_template_id_negocio
VITE_EMAILJS_TEMPLATE_CUSTOMER=tu_template_id_cliente
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

---

## Resumen de variables del .env

| Variable | Para qué sirve |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | ID del servicio de correo en EmailJS |
| `VITE_EMAILJS_TEMPLATE_BUSINESS` | ID de la plantilla que llega al negocio |
| `VITE_EMAILJS_TEMPLATE_CUSTOMER` | ID de la plantilla que llega al cliente |
| `VITE_EMAILJS_PUBLIC_KEY` | Clave pública de EmailJS |

Una vez rellenados todos los valores, el sistema funcionará automáticamente:
- Cuando alguien reserve, esa hora se marcará como no disponible.
- Llegará un correo al negocio con los datos de la reserva.
- Llegará un correo de confirmación al cliente.
