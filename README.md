# bags_checks_

Este repositorio contiene el proyecto de seguimiento de maletas en aviones, compuesto por dos aplicaciones:
- **Frontend:** Aplicación web desarrollada en Next.js con TypeScript.
- **Backend:** API REST y servidor WebSocket desarrollados en Node.js con Express y TypeScript.

## Estructura inicial de carpetas del Proyecto
bags_checks_/
├── frontend/                    # Proyecto Next.js en TypeScript
│   ├── public/                  # Assets estáticos
│   ├── src/                     # Código fuente
│   │   ├── components/          # Componentes React reutilizables
│   │   ├── pages/               # Páginas de Next.js (con rutas automáticas)
│   │   ├── styles/              # Archivos CSS o Tailwind config, etc.
│   │   └── utils/               # Funciones de ayuda, hooks, etc.
│   ├── .env.local               # Variables de entorno para frontend
│   ├── package.json             # Dependencias y scripts
│   ├── tsconfig.json            # Configuración de TypeScript
│   └── README.md                # Documentación específica del frontend (opcional)
├── backend/                     # Proyecto Node.js con Express (puede usar TypeScript o JavaScript)
│   ├── src/                     # Código fuente
│   │   ├── controllers/         # Lógica de manejo de endpoints
│   │   ├── routes/              # Definición de rutas (API REST)
│   │   ├── models/              # Modelos de datos y consultas (opcional, si usas ORM)
│   │   ├── middlewares/         # Middleware de Express
│   │   ├── utils/               # Funciones de ayuda, configuración, etc.
│   │   └── index.ts             # Punto de entrada del servidor (si usas TypeScript)
│   ├── .env                     # Variables de entorno para backend
│   ├── package.json             # Dependencias y scripts
│   ├── tsconfig.json            # Configuración de TypeScript (si usas TypeScript)
│   └── README.md                # Documentación específica del backend (opcional)
├── .gitignore                   # Excluir archivos no deseados en Git (ej.: node_modules, .env)
└── README.md                    # Documentación principal del proyecto


## Requisitos y Dependencias

### Frontend
- Next.js (última versión)
- TypeScript
- Axios, Socket.io-client
- [Windmill Dashboard](https://github.com/estevanmaito/windmill-dashboard) (opcional, para UI basada en Tailwind CSS)

### Backend
- Node.js con Express (última versión)
- TypeScript
- CORS, dotenv, mysql2, socket.io
- Nodemon (para desarrollo)

## Configuración de Variables de Entorno

### Frontend
Crear un archivo `frontend/.env.local` con el siguiente contenido:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:5000

