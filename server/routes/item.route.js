import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import itemCtrl from '../controllers/item.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/items - Get list of items */
  .get(itemCtrl.list)

  /** POST /api/items - Create new item */
  .post(validate(paramValidation.createItem), itemCtrl.create);

router.route('/:itemId')
  /** GET /api/items/:itemId - Get item */
  .get(itemCtrl.get)

  /** PUT /api/items/:itemId - Update item */
  .put(validate(paramValidation.updateItem), itemCtrl.update)

  /** DELETE /api/items/:itemId - Delete item */
  .delete(itemCtrl.remove);

/** Load item when API with itemId route parameter is hit */
router.param('itemId', itemCtrl.load);

export default router;
