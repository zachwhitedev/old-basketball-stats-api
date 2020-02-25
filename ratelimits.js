const rateLimit = require('express-rate-limit');

module.exports = {
  api: rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    max: 500, // max requests allowed per windowMS
    statusCode: 200, // statusCode must be set to 200 for error string to reach frontend. A true 429 statusCode will shut down the response body altogether.
    message: {
      status: 429,
      error:
        'You are making too many requests. Please wait 30 minutes and try again.'
    }
  }),
  login: rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 20,
    statusCode: 200,
    message: {
      status: 429,
      error: 'You are doing that too much. Please try again in 10 minutes.'
    }
  }),
  register: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    statusCode: 200,
    message: {
      status: 429,
      error: 'You are doing that too much. Please try again in 20 minutes.'
    }
  }),
  test: rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    statusCode: 200,
    message: {
      status: 429,
      error: 'You are making too many requests, Peter. Wait 3 minutes before trying again, y\'peesa sheh!'
    }
  })
};
