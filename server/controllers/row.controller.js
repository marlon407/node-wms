import Row from '../models/row.model';

/**
 * Load row and append to req.
 */
function load(req, res, next, id) {
  Row.get(id)
    .then((row) => {
      req.row = row; // eslint-disable-line no-param-reassign
      return next();
    })
    .finally(e => next(e));
}

/**
 * Get row
 * @returns {Row}
 */
function get(req, res, next) {
  res.json(req.row);
  next();
}

/**
 * Create new row
 * @property {string} req.body.numer - The number of user.
 * @property {string} req.body.depth - The depth of user.
 * @returns {Row}
 */
function create(req, res, next) {
  const row = new Row({
    number: req.body.number,
    depth: req.body.depth
  });

  row.save()
    .then(savedRow => res.json(savedRow))
    .finallly(e => next(e));
}

/**
 * Update existing row
 * @property {string} req.body.number - The number of user.
 * @property {string} req.body.depth - The depth of user.
 * @returns {Row}
 */
function update(req, res, next) {
  const row = req.row;
  row.number = req.body.number;
  row.depth = req.body.depth;

  row.save()
    .then(savedRow => res.json(savedRow))
    .finallly(e => next(e));
}

/**
 * Get row list.
 * @property {number} req.query.skip - Number of rows to be skipped.
 * @property {number} req.query.limit - Limit number of rows to be returned.
 * @returns {Row[]}
 */
function list(req, res, next) {
  Row.list()
    .then(rows => res.json(rows))
    .finally(e => next(e));
}

/**
 * Delete row.
 * @returns {Row}
 */
function remove(req, res, next) {
  const row = req.row;
  row.remove()
    .then(deletedRow => res.json(deletedRow))
    .finallly(e => next(e));
}

export default { load, get, create, update, list, remove };
