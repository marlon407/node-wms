import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Pallet Schema
 */
const PalletSchema = new mongoose.Schema({
  heigth: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  _item:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }
});

/**
 * Methods
 */
PalletSchema.method({
});

/**
 * Statics
 */
PalletSchema.statics = {
  /**
   * Get pallet
   * @param {ObjectId} id - The objectId of pallet.
   * @returns {Promise<Pallet, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('_item')
      .exec()
      .then((pallet) => {
        if (pallet) {
          return pallet;
        }
        const err = new APIError('No such pallet exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List pallets in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of pallets to be skipped.
   * @param {number} limit - Limit number of pallets to be returned.
   * @returns {Promise<Pallet[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .populate('_item')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Pallet
 */
export default mongoose.model('Pallet', PalletSchema);
