import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import addressCtrl from '../controllers/address.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/addresss - Get list of addresss */
  .get(addressCtrl.list)

  /** POST /api/addresss - Create new address */
  .post(validate(paramValidation.createAddress), addressCtrl.create);

router.route('/:addressId')
  /** GET /api/addresss/:addressId - Get address */
  .get(addressCtrl.get)

  /** PUT /api/addresss/:addressId - Update address */
  .put(validate(paramValidation.updateAddress), addressCtrl.update)

  /** DELETE /api/addresss/:addressId - Delete address */
  .delete(addressCtrl.remove);

/** Load address when API with addressId route parameter is hit */
router.param('addressId', addressCtrl.load);

export default router;
