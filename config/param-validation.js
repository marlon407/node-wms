import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/slots
  createSlot: {
    body: {
      number: Joi.number().required(),
      width: Joi.number().required()
    }
  },

  // UPDATE /api/slots/:slotId
  updateSlot: {
    body: {
      numer: Joi.number().required(),
      width: Joi.number().required()
    },
    params: {
      slotId: Joi.string().hex().required()
    }
  },

  // POST /api/levels
  createLevel: {
    body: {
      number: Joi.number().required(),
      heigth: Joi.number().required()
    }
  },

  // UPDATE /api/levels/:levelId
  updateLevel: {
    body: {
      numer: Joi.number().required(),
      heigth: Joi.number().required()
    },
    params: {
      levelId: Joi.string().hex().required()
    }
  },

  // POST /api/rows
  createRow: {
    body: {
      number: Joi.number().required(),
      depth: Joi.number().required()
    }
  },

  // UPDATE /api/rows/:rowId
  updateRow: {
    body: {
      numer: Joi.number().required(),
      depth: Joi.number().required()
    },
    params: {
      rowId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
