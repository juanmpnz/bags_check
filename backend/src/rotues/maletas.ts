import { Router } from 'express';
import {
  registerMaleta,
  updateMaletaState,
  getMaletaState,
  listMaletasByVuelo,
} from '../controllers/maletasController';

const router = Router();

// Registrar una nueva maleta
router.post('/maletas', registerMaleta);

// Actualizar el estado de una maleta
router.put('/maletas/:id', updateMaletaState);

// Obtener el estado actual de una maleta
router.get('/maletas/:id', getMaletaState);

// Listar maletas por vuelo
router.get('/vuelos/:vueloId/maletas', listMaletasByVuelo);

export default router;
