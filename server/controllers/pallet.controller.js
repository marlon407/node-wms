import Pallet from '../models/pallet.model';

/**
 * Load pallet and append to req.
 */
function load(req, res, next, id) {
  Pallet.get(id)
    .then((pallet) => {
      req.pallet = pallet; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get pallet
 * @returns {Pallet}
 */
function get(req, res) {
  return res.json(req.pallet);
}

/**
 * Create new pallet
 * @property {number} req.body.heigth
 * @property {string} req.body.width
 * @property {string} req.body.type
 * @property {string} req.body.item
 * @returns {Pallet}
 */
function create(req, res, next) {
  const pallet = new Pallet({
    heigth: req.body.heigth,
    width: req.body.width,
    type: req.body.type,
    _item: req.body.item,
  });

  pallet.save()
    .then(savedPallet => res.json(savedPallet))
    .catch(e => next(e));
}

/**
 * Update existing pallet
 * @property {number} req.body.heigth
 * @property {string} req.body.width
 * @property {string} req.body.type
 * @property {string} req.body.item
 * @returns {Pallet}
 */
function update(req, res, next) {
  const pallet = req.pallet;
  pallet.heigth = req.body.heigth;
  pallet.width = req.body.width;
  pallet.type = req.body.type;
  pallet._item = req.body.item;

  pallet.save()
    .then(savedPallet => res.json(savedPallet))
    .catch(e => next(e));
}

/**
 * Get pallet list.
 * @property {number} req.query.skip - Number of pallets to be skipped.
 * @property {number} req.query.limit - Limit number of pallets to be returned.
 * @returns {Pallet[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Pallet.list({ limit, skip })
    .then(pallets => res.json(pallets))
    .catch(e => next(e));
}

/**
 * Delete pallet.
 * @returns {Pallet}
 */
function remove(req, res, next) {
  const pallet = req.pallet;
  pallet.remove()
    .then(deletedPallet => res.json(deletedPallet))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
