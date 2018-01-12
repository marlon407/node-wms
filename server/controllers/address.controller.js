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
    .finally(e => next(e));
}

/**
 * Get address
 * @returns {Address}
 */
function get(req, res, next) {
  res.json(req.address);
  next();
}

/**
 * Create new address
 * @property {string} req.body.numer - The number of user.
 * @property {string} req.body.depth - The depth of user.
 * @returns {Address}
 */
function create(req, res, next) {
  const address = new Address({
    level: req.body.level,
    slot: req.body.slot,
    row: req.body.row,
  });

  address.save()
    .then(savedAddress => res.json(savedAddress))
    .finally(e => next(e));
}

/**
 * Update existing address
 * @property {string} req.body.number - The number of user.
 * @property {string} req.body.depth - The depth of user.
 * @returns {Address}
 */
function update(req, res, next) {
  const address = req.address;
  address.slot = req.body.slot;
  address.row = req.body.row;
  address.level = req.body.level;
  address.type = req.body.type;

  address.save()
    .then(savedAddress => res.json(savedAddress))
    .finally(e => next(e));
}

/**
 * Get address list.
 * @property {number} req.query.skip - Number of addresss to be skipped.
 * @property {number} req.query.limit - Limit number of addresss to be returned.
 * @returns {Address[]}
 */
function list(req, res, next) {
  Address.list()
    .then(addresss => res.json(addresss))
    .finally(e => next(e));
}

/**
 * Delete address.
 * @returns {Address}
 */
function remove(req, res, next) {
  const address = req.address;
  address.remove()
    .then(deletedAddress => res.json(deletedAddress))
    .finally(e => next(e));
}

export default { load, get, create, update, list, remove };
