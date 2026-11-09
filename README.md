# Shortia Frontend

Frontend de prueba para el backend **Shortia-end-points**. Conecta con los endpoints de autenticación:

- `POST /api/auth/register` — Registro de usuario
- `POST /api/auth/login` — Inicio de sesión
- `GET /api/auth/me` — Perfil del usuario autenticado (requiere token)

## Requisitos

- Node.js v18+
- npm

## Instalación

Desde la carpeta `frontend/`:

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz de `frontend/` (ya está incluido):

```env
VITE_API_URL=http://localhost:3000/api
```

Asegúrate de que el backend de Shortia esté corriendo en el puerto `3000`.

## Ejecutar en desarrollo

```bash
npm run dev
```

La app se abrirá en `http://localhost:5173` (puerto por defecto de Vite).

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Linter de ESLint |

## Estructura

```
frontend/
├── src/
│   ├── api/axios.js        # Instancia de axios con interceptores de auth
│   ├── context/AuthContext.jsx  # Contexto de autenticación (token, login, logout)
│   ├── services/auth.js    # Servicios: registrar, iniciarSesion, obtenerPerfil
│   ├── pages/Login.jsx     # Página de login
│   ├── pages/Register.jsx  # Página de registro
│   ├── pages/Perfil.jsx    # Perfil protegido del usuario
│   ├── App.jsx             # Enrutado con React Router
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos base
├── index.html
├── vite.config.js
├── .env
└── package.json
```

## Notas sobre el backend

El backend expone los campos con mayúscula inicial:

- Login: `{ Email, Password }`
- Register: `{ Username, Email, Password, Nombre?, Edad?, Genero?, Pais? }`

El frontend los mapea correctamente en `src/services/auth.js`.
