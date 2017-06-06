import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import levelCtrl from '../controllers/level.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/levels - Get list of levels */
  .get(levelCtrl.list)

  /** POST /api/levels - Create new level */
  .post(validate(paramValidation.createLevel), levelCtrl.create);

router.route('/:levelId')
  /** GET /api/levels/:levelId - Get level */
  .get(levelCtrl.get)

  /** PUT /api/levels/:levelId - Update level */
  .put(validate(paramValidation.updateLevel), levelCtrl.update)

  /** DELETE /api/levels/:levelId - Delete level */
  .delete(levelCtrl.remove);

/** Load level when API with levelId route parameter is hit */
router.param('levelId', levelCtrl.load);

export default router;
