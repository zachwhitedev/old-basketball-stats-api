const rateLimit = require('express-rate-limit');

module.exports = {
  api: rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    max: 500, // max requests allowed per windowMS
    message: {
      status: 429,
      error:
        'You are making too many requests. Please wait 30 minutes and try again.'
    }
  }),
  login: rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    message: {
      status: 429,
      error:
        'You are making too many login attempts. Please try again in 10 minutes.'
    }
  }),
  register: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
      status: 429,
      error:
        'You are making too many register requests. Please try again in 20 minutes.'
    }
  }),
  test: rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: {
      status: 429,
      error: 'You are making too many requests. The rate limit is working!'
    }
  })
};
