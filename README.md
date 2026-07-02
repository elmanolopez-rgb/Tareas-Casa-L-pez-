# 🏠 Casa López · Tareas

Tablero familiar de tareas del hogar. Aplicación web de una sola página (HTML/CSS/JS puro, sin frameworks ni backend), pensada para organizar quehaceres domésticos entre los miembros de una familia.

## Características

- **Autenticación simple**: login y registro de miembros de la familia.
- **Tareas con categorías**: patio, cocina, baño, comedor, sala, mascotas, lavandería, basura, compras y general.
- **Recurrencia**: tareas diarias, semanales o quincenales.
- **Rotación automática de turnos**: cada tarea rota entre los miembros asignados semana a semana, con opción de reasignar solo para la semana actual.
- **Solicitud de apoyo**: cualquier miembro puede pedir ayuda con una tarea, y otro puede "tomarla" esa semana.
- **Calendario semanal**: vista de qué tarea toca cada día.
- **Avisos familiares**: anuncios fijables (por el usuario maestro) para toda la familia.
- **Notificaciones**: actividad reciente (tareas completadas, avisos, nuevos miembros, etc.).
- **Marcador familiar**: conteo de tareas completadas por persona.

## Persistencia de datos y tiempo real

✅ Esta versión está conectada a **Firebase Firestore**. Todos los dispositivos que abran la misma URL comparten la misma información (tareas, turnos, avisos, notificaciones) y se actualizan **en tiempo real**, sin necesidad de recargar la página. Solo la sesión (quién está logueado) se guarda por dispositivo, en `localStorage`.

### ⚠️ Importante: reglas de seguridad de Firestore

El proyecto se creó con las reglas en **"modo de prueba"**, que permiten leer y escribir sin restricciones durante **30 días**. Pasado ese plazo, la app dejará de sincronizar hasta que actualices las reglas.

Antes de que expire, ve a **Firebase Console → Firestore Database → Reglas** y reemplázalas por algo como esto (permite acceso solo a la colección de este hogar, sin fecha de expiración):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /hogares/{hogarId} {
      allow read, write: if true;
    }
  }
}
```

> Nota: estas reglas siguen siendo abiertas (cualquiera con el enlace de la app podría leer/escribir los datos). Para un hogar es un riesgo bajo, pero si quieres más seguridad se puede agregar autenticación real de Firebase más adelante.

## Cómo usar

1. Abre `index.html` en cualquier navegador moderno (Chrome, Safari, Firefox, Edge).
2. Ingresa con la cuenta maestra (ver nota de seguridad abajo) o regístrate como nuevo miembro.
3. Empieza a gestionar las tareas del hogar.

## Despliegue en GitHub Pages

1. Sube este repositorio a GitHub.
2. Ve a **Settings → Pages**.
3. En "Source", selecciona la rama principal (`main`) y la carpeta raíz (`/`).
4. Guarda. GitHub te dará una URL pública (ej. `https://tu-usuario.github.io/casa-lopez-tareas/`).

## ⚠️ Nota de seguridad

El código incluye una cuenta "maestra" con correo y clave en texto plano dentro del JavaScript (visible para cualquiera que inspeccione el código fuente). Si vas a subir este repositorio como **público**, considera:

- Hacerlo **privado** en GitHub, o
- Cambiar la clave por una que no te importe exponer, o
- Migrar la autenticación a un sistema real (backend) antes de hacerlo público.

## Estructura del repositorio

```
casa-lopez-tareas/
├── index.html   # Aplicación completa (HTML + CSS + JS embebido)
├── README.md    # Este archivo
└── .gitignore
```

## Tecnologías

- HTML5 + CSS3 (sin frameworks)
- JavaScript vanilla (render manual, sin librerías)
- `localStorage` para persistencia local
