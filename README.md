# bags_checks_

Este repositorio contiene el proyecto de seguimiento de maletas en aviones, compuesto por dos aplicaciones:
- **Frontend:** Aplicación web desarrollada en Next.js con TypeScript.
- **Backend:** API REST y servidor WebSocket desarrollados en Node.js con Express y TypeScript.

## Estructura inicial de carpetas del Proyecto
```
bags_checks/
frontend/
│── src/
│   ├── app/ (Si activaste el App Router)
│   ├── pages/ (Si usaste Pages Router)
│   ├── components/
│   ├── styles/
│   ├── utils/
│── public/
│── .gitignore
│── package.json
│── tsconfig.json
│── tailwind.config.ts
│── next.config.js

```

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

