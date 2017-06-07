import Address from '../models/address.model';

/**
 * Load address and append to req.
 */
function load(req, res, next, id) {
  Address.get(id)
    .then((address) => {
      req.address = address; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get address
 * @returns {Address}
 */
function get(req, res) {
  return res.json(req.address);
}

/**
 * Create new address
 * @property {string} req.body.numer - The number of user.
 * @property {string} req.body.depth - The depth of user.
 * @returns {Address}
 */
function create(req, res, next) {
  const address = new Address({
    _level: req.body.level,
    _slot: req.body.slot,
    _row: req.body.row,
  });

  address.save()
    .then(savedAddress => res.json(savedAddress))
    .catch(e => next(e));
}

/**
 * Update existing address
 * @property {string} req.body.number - The number of user.
 * @property {string} req.body.depth - The depth of user.
 * @returns {Address}
 */
function update(req, res, next) {
  const address = req.address;
  address._slot = req.body.slot;
  address._row = req.body.depth;
  address._level = req.body.level;
  

  address.save()
    .then(savedAddress => res.json(savedAddress))
    .catch(e => next(e));
}

/**
 * Get address list.
 * @property {number} req.query.skip - Number of addresss to be skipped.
 * @property {number} req.query.limit - Limit number of addresss to be returned.
 * @returns {Address[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Address.list({ limit, skip })
    .then(addresss => res.json(addresss))
    .catch(e => next(e));
}

/**
 * Delete address.
 * @returns {Address}
 */
function remove(req, res, next) {
  const address = req.address;
  address.remove()
    .then(deletedAddress => res.json(deletedAddress))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
