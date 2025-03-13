 import { Request, Response, NextFunction } from 'express';

const {  body, param, validationResult } = require('express-validator');
// Middleware para validar los resultados de las validaciones
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Retornar los errores de validación con código 400
    res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validaciones para registrar una maleta
export const validateRegisterMaleta = [
  body('codigo_tag')
    .notEmpty()
    .withMessage('El código de etiqueta es obligatorio'),
  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto'),
  body('peso')
    .notEmpty()
    .withMessage('El peso es obligatorio')
    .isFloat({ gt: 0 })
    .withMessage('El peso debe ser un número positivo'),
  body('estado_actual')
    .notEmpty()
    .withMessage('El estado actual es obligatorio'),
  body('vuelo_id')
    .notEmpty()
    .withMessage('El ID del vuelo es obligatorio')
    .isInt()
    .withMessage('El ID del vuelo debe ser un entero'),
  body('pasajero_id')
    .optional()
    .isInt()
    .withMessage('El ID del pasajero debe ser un entero'),
  validate,
];

// Validaciones para actualizar el estado y la ubicación de una maleta
export const validateUpdateMaleta = [
  param('id')
    .isInt()
    .withMessage('El ID de la maleta debe ser un entero'),
  body('estado_actual')
    .notEmpty()
    .withMessage('El nuevo estado es obligatorio'),
  body('current_location')
    .notEmpty()
    .withMessage('La ubicación actual es obligatoria'),
  validate,
];

// Validaciones para obtener el estado de una maleta
export const validateGetMaleta = [
  param('id')
    .isInt()
    .withMessage('El ID de la maleta debe ser un entero'),
  validate,
];

// Validaciones para listar maletas por vuelo
export const validateListMaletasByVuelo = [
  param('vueloId')
    .isInt()
    .withMessage('El ID del vuelo debe ser un entero'),
  validate,
];
