import { Request, Response } from 'express';
import { pool } from '../utils/db'; // Asegúrate de tener un archivo que exporte el pool de conexiones a MySQL
import { RowDataPacket } from 'mysql2';

// Registrar una nueva maleta
export const registerMaleta = async (req: Request, res: Response) => {
  try {
    const { codigo_tag, descripcion, peso, estado_actual, vuelo_id } = req.body;
    const [result] = await pool.query(
      'INSERT INTO maletas (codigo_tag, descripcion, peso, estado_actual, vuelo_id) VALUES (?, ?, ?, ?, ?)',
      [codigo_tag, descripcion, peso, estado_actual, vuelo_id]
    );
    res.status(201).json({ message: 'Maleta registrada', maletaId: (result as any).insertId });
  } catch (error) {
    console.error('Error registrando maleta:', error);
    res.status(500).json({ error: 'Error al registrar la maleta' });
  }
};

// Actualizar el estado de una maleta
export const updateMaletaState = async (req: Request, res: Response) => {
  try {
    const maletaId = req.params.id;
    const { estado_actual } = req.body;
    await pool.query(
      'UPDATE maletas SET estado_actual = ?, ultima_actualizacion = NOW() WHERE id = ?',
      [estado_actual, maletaId]
    );
    res.json({ message: 'Estado de la maleta actualizado' });
  } catch (error) {
    console.error('Error actualizando maleta:', error);
    res.status(500).json({ error: 'Error al actualizar la maleta' });
  }
};

export const getMaletaState = async (req: Request, res: Response): Promise<void> => {
    try {
      const maletaId = req.params.id;
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM maletas WHERE id = ?', [maletaId]);
      if ((rows as any).length === 0) {
        res.status(404).json({ message: 'Maleta no encontrada' });
        return;
      }
      res.json(rows[0]);
    } catch (error) {
      console.error('Error obteniendo el estado de la maleta:', error);
      res.status(500).json({ error: 'Error al obtener el estado de la maleta' });
    }
  };

// Listar maletas por vuelo
export const listMaletasByVuelo = async (req: Request, res: Response) => {
  try {
    const vueloId = req.params.vueloId;
    const [rows] = await pool.query('SELECT * FROM maletas WHERE vuelo_id = ?', [vueloId]);
    res.json(rows);
  } catch (error) {
    console.error('Error listando maletas para el vuelo:', error);
    res.status(500).json({ error: 'Error al listar las maletas del vuelo' });
  }
};
