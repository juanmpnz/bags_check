import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../utils/db';
import { RowDataPacket, OkPacket } from 'mysql2';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';
const SALT_ROUNDS = 10;

// Endpoint para registrar un usuario
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, password, role_id } = req.body;
    // Verificar si el usuario ya existe
    const [existingUsers] = await pool.query<RowDataPacket[]>('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      res.status(400).json({ error: 'El usuario ya existe' });
      return;
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insertar el nuevo usuario
    const [result] = await pool.query<OkPacket>(
      'INSERT INTO usuarios (nombre, email, password, role_id) VALUES (?, ?, ?, ?)',
      [nombre, email, hashedPassword, role_id || null]
    );

    res.status(201).json({ message: 'Usuario registrado', userId: result.insertId });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Endpoint para login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // Buscar el usuario por email
    const [users] = await pool.query<RowDataPacket[]>('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (users.length === 0) {
      res.status(401).json({ error: 'Credenciales incorrectas' });
      return;
    }
    const user = users[0];
    // Comparar la contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ error: 'Credenciales incorrectas' });
      return;
    }
    // Generar un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
