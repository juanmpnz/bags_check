import { Router } from 'express';
import {
  registerMaleta,
  updateMaletaState,
  getMaletaState,
  listMaletasByVuelo,
} from '../controllers/maletasController';
import { authenticateToken } from '../middlewares/authMiddleware';
import {
  validateRegisterMaleta,
  validateUpdateMaleta,
  validateGetMaleta,
  validateListMaletasByVuelo,
} from '../validations/validations';

const router = Router();

router.post('/maletas', authenticateToken, validateRegisterMaleta, registerMaleta);
router.put('/maletas/:id', authenticateToken, validateUpdateMaleta, updateMaletaState);
router.get('/maletas/:id', authenticateToken, validateGetMaleta, getMaletaState);
router.get('/vuelos/:vueloId/maletas', authenticateToken, validateListMaletasByVuelo, listMaletasByVuelo);

export default router;
