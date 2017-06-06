import Slot from '../models/slot.model';

/**
 * Load slot and append to req.
 */
function load(req, res, next, id) {
  Slot.get(id)
    .then((slot) => {
      req.slot = slot; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get slot
 * @returns {Slot}
 */
function get(req, res) {
  return res.json(req.slot);
}

/**
 * Create new slot
 * @property {string} req.body.numer - The number of user.
 * @property {string} req.body.width - The width of user.
 * @returns {Slot}
 */
function create(req, res, next) {
  const slot = new Slot({
    number: req.body.number,
    width: req.body.width
  });

  slot.save()
    .then(savedSlot => res.json(savedSlot))
    .catch(e => next(e));
}

/**
 * Update existing slot
 * @property {string} req.body.number - The number of user.
 * @property {string} req.body.width - The width of user.
 * @returns {Slot}
 */
function update(req, res, next) {
  const slot = req.slot;
  slot.number = req.body.number;
  slot.width = req.body.width;

  slot.save()
    .then(savedSlot => res.json(savedSlot))
    .catch(e => next(e));
}

/**
 * Get slot list.
 * @property {number} req.query.skip - Number of slots to be skipped.
 * @property {number} req.query.limit - Limit number of slots to be returned.
 * @returns {Slot[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Slot.list({ limit, skip })
    .then(slots => res.json(slots))
    .catch(e => next(e));
}

/**
 * Delete slot.
 * @returns {Slot}
 */
function remove(req, res, next) {
  const slot = req.slot;
  slot.remove()
    .then(deletedSlot => res.json(deletedSlot))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
