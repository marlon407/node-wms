import express from 'express';
import userRoutes from './user.route';
import slotRoutes from './slot.route';
import levelRoutes from './level.route';
import rowRoutes from './row.route';
import addressRoutes from './address.route';
import itemRoutes from './item.route';
import palletRoutes from './pallet.route';

import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>{
  res.send('OK')
});

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /slots
router.use('/slots', slotRoutes);

// mount user routes at /levels
router.use('/levels', levelRoutes);

// mount user routes at /rows
router.use('/rows', rowRoutes);

// mount user routes at /addresses
router.use('/addresses', addressRoutes);

// mount user routes at /items
router.use('/items', itemRoutes);

// mount user routes at /items
router.use('/pallets', palletRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
