import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import slotCtrl from '../controllers/slot.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/slots - Get list of slots */
  .get(slotCtrl.list)

  /** POST /api/slots - Create new slot */
  .post(validate(paramValidation.createSlot), slotCtrl.create);

router.route('/:slotId')
  /** GET /api/slots/:slotId - Get slot */
  .get(slotCtrl.get)

  /** PUT /api/slots/:slotId - Update slot */
  .put(validate(paramValidation.updateSlot), slotCtrl.update)

  /** DELETE /api/slots/:slotId - Delete slot */
  .delete(slotCtrl.remove);

/** Load slot when API with slotId route parameter is hit */
router.param('slotId', slotCtrl.load);

export default router;
