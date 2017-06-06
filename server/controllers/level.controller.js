import Level from '../models/level.model';

/**
 * Load level and append to req.
 */
function load(req, res, next, id) {
  Level.get(id)
    .then((level) => {
      req.level = level; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get level
 * @returns {Level}
 */
function get(req, res) {
  return res.json(req.level);
}

/**
 * Create new level
 * @property {string} req.body.numer - The number of user.
 * @property {string} req.body.heigth - The heigth of user.
 * @returns {Level}
 */
function create(req, res, next) {
  const level = new Level({
    number: req.body.number,
    heigth: req.body.heigth
  });

  level.save()
    .then(savedLevel => res.json(savedLevel))
    .catch(e => next(e));
}

/**
 * Update existing level
 * @property {string} req.body.number - The number of user.
 * @property {string} req.body.heigth - The heigth of user.
 * @returns {Level}
 */
function update(req, res, next) {
  const level = req.level;
  level.number = req.body.number;
  level.heigth = req.body.heigth;

  level.save()
    .then(savedLevel => res.json(savedLevel))
    .catch(e => next(e));
}

/**
 * Get level list.
 * @property {number} req.query.skip - Number of levels to be skipped.
 * @property {number} req.query.limit - Limit number of levels to be returned.
 * @returns {Level[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Level.list({ limit, skip })
    .then(levels => res.json(levels))
    .catch(e => next(e));
}

/**
 * Delete level.
 * @returns {Level}
 */
function remove(req, res, next) {
  const level = req.level;
  level.remove()
    .then(deletedLevel => res.json(deletedLevel))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
