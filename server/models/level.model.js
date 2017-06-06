import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Level Schema
 */
const LevelSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  heigth: {
    type: Number,
    required: true,
  }
});

/**
 * Methods
 */
LevelSchema.method({
});

/**
 * Statics
 */
LevelSchema.statics = {
  /**
   * Get level
   * @param {ObjectId} id - The objectId of level.
   * @returns {Promise<Level, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((level) => {
        if (level) {
          return level;
        }
        const err = new APIError('No such level exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List levels in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of levels to be skipped.
   * @param {number} limit - Limit number of levels to be returned.
   * @returns {Promise<Level[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Level
 */
export default mongoose.model('Level', LevelSchema);
