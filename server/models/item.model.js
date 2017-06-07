import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Item Schema
 */
const ItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true,
  },
  _address:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
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
      .populate('_address')
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
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .populate('_address')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Item
 */
export default mongoose.model('Item', ItemSchema);
