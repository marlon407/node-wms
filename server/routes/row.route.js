import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import rowCtrl from '../controllers/row.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/rows - Get list of rows */
  .get(rowCtrl.list)

  /** POST /api/rows - Create new row */
  .post(validate(paramValidation.createRow), rowCtrl.create);

router.route('/:rowId')
  /** GET /api/rows/:rowId - Get row */
  .get(rowCtrl.get)

  /** PUT /api/rows/:rowId - Update row */
  .put(validate(paramValidation.updateRow), rowCtrl.update)

  /** DELETE /api/rows/:rowId - Delete row */
  .delete(rowCtrl.remove);

/** Load row when API with rowId route parameter is hit */
router.param('rowId', rowCtrl.load);

export default router;
