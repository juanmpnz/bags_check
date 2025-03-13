import { Request, Response } from 'express';
import { pool } from '../utils/db';
import { RowDataPacket, OkPacket } from 'mysql2';

// Registrar una nueva maleta
export const registerMaleta = async (req: Request, res: Response): Promise<void> => {
  try {
     const { codigo_tag, descripcion, peso, estado_actual, vuelo_id, pasajero_id } = req.body;
    const [result] = await pool.query<OkPacket>('INSERT INTO maletas (codigo_tag, descripcion, peso, estado_actual, vuelo_id, pasajero_id) VALUES (?, ?, ?, ?, ?, ?)', [
      codigo_tag,
      descripcion,
      peso,
      estado_actual,
      vuelo_id,
      pasajero_id,
    ]);
    res.status(201).json({ message: 'Maleta registrada', maletaId: result.insertId });
  } catch (error) {
    console.error('Error registrando maleta:', error);
    res.status(500).json({ error: 'Error al registrar la maleta' });
  }
};

// Actualizar el estado y la ubicación de una maleta
export const updateMaletaState = async (req: Request, res: Response): Promise<void> => {
  try {
    const maletaId = req.params.id;
    // Se espera recibir estado_actual y current_location en el body
    const { estado_actual, current_location } = req.body;
    await pool.query('UPDATE maletas SET estado_actual = ?, current_location = ?, ultima_actualizacion = NOW() WHERE id = ?', [estado_actual, current_location, maletaId]);
    res.json({ message: 'Estado y ubicación de la maleta actualizados' });
  } catch (error) {
    console.error('Error actualizando maleta:', error);
    res.status(500).json({ error: 'Error al actualizar la maleta' });
  }
};

// Obtener el estado actual y datos de una maleta
export const getMaletaState = async (req: Request, res: Response): Promise<void> => {
  try {
    const maletaId = req.params.id;
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM maletas WHERE id = ?', [maletaId]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Maleta no encontrada' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error obteniendo el estado de la maleta:', error);
    res.status(500).json({ error: 'Error al obtener el estado de la maleta' });
  }
};

// Listar todas las maletas asociadas a un vuelo específico
export const listMaletasByVuelo = async (req: Request, res: Response): Promise<void> => {
  try {
    const vueloId = req.params.vueloId;
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM maletas WHERE vuelo_id = ?', [vueloId]);
    res.json(rows);
  } catch (error) {
    console.error('Error listando maletas para el vuelo:', error);
    res.status(500).json({ error: 'Error al listar las maletas del vuelo' });
  }
};

// (Opcional) Registrar un evento en la tabla de eventos_seguimiento
export const registerEvento = async (req: Request, res: Response): Promise<void> => {
  try {
    // Se espera recibir maleta_id, ubicacion_id, tipo_evento, metodo_captura, vuelo_id (opcional) y metadata (opcional)
    const { maleta_id, ubicacion_id, tipo_evento, metodo_captura, vuelo_id, metadata } = req.body;
    const [result] = await pool.query<OkPacket>('INSERT INTO eventos_seguimiento (maleta_id, ubicacion_id, tipo_evento, metodo_captura, vuelo_id, metadata) VALUES (?, ?, ?, ?, ?, ?)', [
      maleta_id,
      ubicacion_id,
      tipo_evento,
      metodo_captura,
      vuelo_id,
      JSON.stringify(metadata),
    ]);
    res.status(201).json({ message: 'Evento registrado', eventoId: result.insertId });
  } catch (error) {
    console.error('Error registrando evento:', error);
    res.status(500).json({ error: 'Error al registrar el evento' });
  }
};
