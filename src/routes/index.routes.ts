import { Router } from 'express';

const router = Router();

router.get('/api', (_req, res) => {
  res.json({ message: 'ruta api' });
});

router.get('/api/test', (_req, res) => {
  res.json({ message: 'pancho con papitas' });
});

export default router;
