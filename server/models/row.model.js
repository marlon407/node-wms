import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Row Schema
 */
const RowSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  depth: {
    type: Number,
    required: true,
  }
});

/**
 * Methods
 */
RowSchema.method({
});

/**
 * Statics
 */
RowSchema.statics = {
  /**
   * Get row
   * @param {ObjectId} id - The objectId of row.
   * @returns {Promise<Row, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((row) => {
        if (row) {
          return row;
        }
        const err = new APIError('No such row exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List rows in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of rows to be skipped.
   * @param {number} limit - Limit number of rows to be returned.
   * @returns {Promise<Row[]>}
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
 * @typedef Row
 */
export default mongoose.model('Row', RowSchema);
