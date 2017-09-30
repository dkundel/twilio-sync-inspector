const server = require('../server');

server({
  dev: true,
  apiKey: process.env.TWILIO_API_KEY,
  apiSecret: process.env.TWILIO_API_SECRET,
  accountSid: process.env.TWILIO_ACCOUNT_SID
});
