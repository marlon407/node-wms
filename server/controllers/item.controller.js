import Item from '../models/item.model';

/**
 * Load item and append to req.
 */
function load(req, res, next, id) {
  Item.get(id)
    .then((item) => {
      req.item = item; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get item
 * @returns {Item}
 */
function get(req, res) {
  return res.json(req.item);
}

/**
 * Create new item
 * @property {number} req.body.value - The value of item.
 * @property {string} req.body.description - The description of item.
 * @property {string} req.body.address - The address of item.
 * @returns {Item}
 */
function create(req, res, next) {
  const item = new Item({
    value: req.body.value,
    description: req.body.description,
    _address: req.body.address,
  });

  item.save()
    .then(savedItem => res.json(savedItem))
    .catch(e => next(e));
}

/**
 * Update existing item
 * @property {number} req.body.value - The value of item.
 * @property {string} req.body.description - The description of item.
 * @property {string} req.body.address - The address of item.
 * @returns {Item}
 */
function update(req, res, next) {
  const item = req.item;
  item.description = req.body.description;
  item.value = req.body.heigth;
  item._address = req.body.address;

  item.save()
    .then(savedItem => res.json(savedItem))
    .catch(e => next(e));
}

/**
 * Get item list.
 * @property {number} req.query.skip - Number of items to be skipped.
 * @property {number} req.query.limit - Limit number of items to be returned.
 * @returns {Item[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Item.list({ limit, skip })
    .then(items => res.json(items))
    .catch(e => next(e));
}

/**
 * Delete item.
 * @returns {Item}
 */
function remove(req, res, next) {
  const item = req.item;
  item.remove()
    .then(deletedItem => res.json(deletedItem))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
