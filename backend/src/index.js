require('dotenv').config();
const createApp = require('./app');

const PORT = process.env.PORT || 3001;
const app = createApp();

app.listen(PORT, () => {
  console.log(`TaskFlow API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
