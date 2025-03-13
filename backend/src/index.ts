import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mysql from 'mysql2/promise';
import maletasRoutes from '../src/rotues/maletas';
import authRoutes from '../src/rotues/auth';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de autenticación y maletas
app.use('/api/auth', authRoutes);
app.use('/api', maletasRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 5000;

// Crear un pool de conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('Backend Express server running');
});

// Ejemplo de endpoint para consultar la hora actual desde la base de datos
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() as currentTime');
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Crear un servidor HTTP y adjuntar Socket.io para comunicación en tiempo real
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*', // Ajusta el origen en producción
  },
});

// Manejar conexiones con Socket.io
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Emitir un mensaje de bienvenida al conectarse
  socket.emit('welcome', { message: 'Bienvenido al servidor WebSocket' });

  // Ejemplo: escuchar un evento "updateMaleta" y emitir un evento "maletaUpdate" a todos
  socket.on('updateMaleta', (data) => {
    console.log('updateMaleta event received:', data);
    // Procesar los datos o actualizarlos en la base de datos si es necesario
    io.emit('maletaUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Función auxiliar para emitir actualizaciones a todos los clientes
export const emitMaletaUpdate = (data: any): void => {
  io.emit('maletaUpdate', data);
};

// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
