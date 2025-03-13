# bags_checks_

Este repositorio contiene el proyecto de seguimiento de maletas en aviones, compuesto por dos aplicaciones:
- **Frontend:** Aplicación web desarrollada en Next.js con TypeScript.
- **Backend:** API REST y servidor WebSocket desarrollados en Node.js con Express y TypeScript.

## Estructura inicial de carpetas del Proyecto
```
bags_checks/
├── frontend/                     # Proyecto Next.js en TypeScript
│   ├── public/                   # Assets estáticos
│   ├── src/                      # Código fuente
│   │   ├── components/           # Componentes React reutilizables
│   │   ├── pages/                # Páginas de Next.js (con rutas automáticas)
│   │   ├── styles/               # Archivos CSS o configuración de Tailwind, etc.
│   │   └── utils/                # Funciones de ayuda, hooks, etc.
│   ├── .env                      # Variables de entorno para el frontend
|   |── .gitignore                # Archivos ignorados por GitHub
│   ├── package.json              # Dependencias y scripts
│   ├── tsconfig.json             # Configuración de TypeScript
│   └── README.md                 # Documentación específica del frontend (opcional)
├── backend/                      # Proyecto Node.js con Express (usando TypeScript)
│   ├── src/                      # Código fuente
│   │   ├── controllers/          # Lógica de manejo de endpoints
│   │   ├── routes/               # Definición de rutas (API REST)
│   │   ├── models/               # Modelos de datos y consultas (opcional, si se usa ORM)
│   │   ├── middlewares/          # Middlewares de Express
│   │   ├── utils/                # Funciones de ayuda y configuración
│   │   └── index.ts              # Punto de entrada del servidor
│   ├── .env                      # Variables de entorno para el backend
|   |── .gitignore                # Archivos ignorados por GitHub
│   ├── package.json              # Dependencias y scripts
│   ├── tsconfig.json             # Configuración de TypeScript
│   └── README.md                 # Documentación específica del backend (opcional)
├── .gitignore                    # Excluir archivos no deseados (node_modules, .env, etc.)
└── README.md                     # Documentación principal del proyecto
└── LICENCE                       # Licencia del proyecto
└── prettier.config.json          # Formateo de codigo
```
## Inicializar proyecto en /backend /frontend:
- npm run dev

## Requisitos y Dependencias

### Frontend
- Next.js (última versión)
- TypeScript
- Axios, Socket.io-client
- [Windmill Dashboard]

### Backend
- Node.js con Express (última versión)
- TypeScript
- CORS, dotenv, mysql2, socket.io
- Nodemon (para desarrollo)

```
backend/
├── src/
│   ├── controllers/         # Lógica de manejo de endpoints
│   ├── middlewares/         # Middlewares de Express
│   ├── models/              # Modelos de datos y consultas (si usas un ORM o conexiones directas)
│   ├── routes/              # Definición de rutas de la API REST
│   ├── utils/               # Funciones de ayuda y configuraciones
│   └── index.ts             # Punto de entrada del servidor
├── .env                     # Variables de entorno para el backend
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración de TypeScript
└── README.md                # Documentación específica del backend (opcional)
```


