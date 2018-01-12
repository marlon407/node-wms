import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Item Schema
 */
const ItemSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true, index: true, default: mongoose.Types.ObjectId },
  description: {
    type: String,
    required: true
  },
  value: {
    type: String,
  }
});

/**
 * Methods
 */
ItemSchema.method({
});

/**
 * Statics
 */
ItemSchema.statics = {
  /**
   * Get item
   * @param {ObjectId} id - The objectId of item.
   * @returns {Promise<Item, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((item) => {
        if (item) {
          return item;
        }
        const err = new APIError('No such item exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List items in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of items to be skipped.
   * @param {number} limit - Limit number of items to be returned.
   * @returns {Promise<Item[]>}
   */
  list() {
    return this.find()
      .sort({ createdAt: -1 })
      .exec();
  }
};

/**
 * @typedef Item
 */
export default mongoose.model('Item', ItemSchema);
