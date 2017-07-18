import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Slot Schema
 */
const SlotSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true, default: mongoose.Types.ObjectId },
  number: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true,
  }
});

/**
 * Methods
 */
SlotSchema.method({
});

/**
 * Statics
 */
SlotSchema.statics = {
  /**
   * Get slot
   * @param {ObjectId} id - The objectId of slot.
   * @returns {Promise<Slot, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((slot) => {
        if (slot) {
          return slot;
        }
        const err = new APIError('No such slot exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List slots in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of slots to be skipped.
   * @param {number} limit - Limit number of slots to be returned.
   * @returns {Promise<Slot[]>}
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
 * @typedef Slot
 */
export default mongoose.model('Slot', SlotSchema);
