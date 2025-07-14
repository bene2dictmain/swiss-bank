const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
connectDB();

app.use(cors({
  origin: 'http://127.0.0.1:5500', // or wherever your frontend is served from
  allowedHeaders: ['Authorization', 'Content-Type'],
}));
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));


const PORT = 5000;

// Export for Vercel if in production
if (process.env.NODE_ENV === 'production') {
  module.exports.handler = serverless(app);
} else {
  // Local development mode
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT}`);
  });
}
