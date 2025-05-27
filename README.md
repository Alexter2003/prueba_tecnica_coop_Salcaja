# Gestión de Usuarios - Aplicación Next.js

Esta aplicación es un sistema de gestión de usuarios construido con Next.js, que incluye un backend API y una interfaz de usuario moderna.

## Estructura del Proyecto

El proyecto está organizado en dos partes principales:

### Backend (API)
- Ubicación: `/src/app/api/usuarios`
- Endpoints disponibles:
  - `GET /api/usuarios` - Obtener todos los usuarios
  - `POST /api/usuarios` - Crear nuevo usuario
  - `PUT /api/usuarios` - Actualizar usuario existente
  - `DELETE /api/usuarios` - Eliminar usuario

### Frontend
- Ubicación: `/src/app/users`
- Componentes:
  - `page.jsx` - Vista principal de usuarios
  - `components/` - Componentes reutilizables
    - `CreateEditModal.jsx` - Modal para crear/editar usuarios
    - `DeleteConfirmModal.jsx` - Modal de confirmación para eliminar
    - `Alert.jsx` - Componente de notificaciones

## Características

- ✨ Interfaz moderna con tema oscuro
- 📱 Diseño responsive
- ✅ Validación de formularios
- 🔄 Operaciones CRUD completas
- 🚨 Sistema de notificaciones para mensajes de exito/error

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm 

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

## Ejecución del Proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Tecnologías Utilizadas

- Next.js 14
- Tailwind CSS
- API Routes de Next.js
- React Hooks
