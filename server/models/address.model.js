import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Address Schema
 */
const AddressSchema = new mongoose.Schema({
  _row: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Row'
  },
  _slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot'
  },
  _level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level'
  }
});

/**
 * Methods
 */
AddressSchema.method({
});

/**
 * Statics
 */
AddressSchema.statics = {
  /**
   * Get address
   * @param {ObjectId} id - The objectId of address.
   * @returns {Promise<Address, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('_row _slot _level')
      .exec()
      .then((address) => {
        if (address) {
          return address;
        }
        const err = new APIError('No such address exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List addresss in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of addresss to be skipped.
   * @param {number} limit - Limit number of addresss to be returned.
   * @returns {Promise<Address[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .populate('_row _slot _level')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Address
 */
export default mongoose.model('Address', AddressSchema);
