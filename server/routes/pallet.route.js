import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import palletCtrl from '../controllers/pallet.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/pallets - Get list of pallets */
  .get(palletCtrl.list)

  /** POST /api/pallets - Create new pallet */
  .post(validate(paramValidation.createPallet), palletCtrl.create);

router.route('/:palletId')
  /** GET /api/pallets/:palletId - Get pallet */
  .get(palletCtrl.get)

  /** PUT /api/pallets/:palletId - Update pallet */
  .put(validate(paramValidation.updatePallet), palletCtrl.update)

  /** DELETE /api/pallets/:palletId - Delete pallet */
  .delete(palletCtrl.remove);

/** Load pallet when API with palletId route parameter is hit */
router.param('palletId', palletCtrl.load);

export default router;
