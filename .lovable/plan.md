# Restablecer contraseña de admin (carloslosamac@gmail.com)

Las contraseñas se almacenan cifradas (hash) y no se pueden leer. La única vía es fijar una nueva.

## Qué haré

1. Comprobar que existe la cuenta `carloslosamac@gmail.com` y que tiene rol admin asignado.
2. Establecer la contraseña a `Calma.1234` (misma que el otro usuario admin, fácil de recordar y cambiable después).
3. Confirmar el email de la cuenta si no lo estuviera, para que pueda entrar sin bloqueo.
4. Si falta el rol admin, añadirlo en la tabla de roles.
5. Verificar el inicio de sesión en `/admin/auth`.

## Detalles técnicos

- Migración sobre `auth.users` usando `crypt()` para el hash y `email_confirmed_at`.
- Alta de rol en `user_roles` con el rol `admin` si no existe.

Recomendación: cambia la contraseña desde la app tras el primer acceso.
