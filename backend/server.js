import express from 'express';
import cors from 'cors';
import profileRoutes from './routes/profile.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware allows frontend deployed anywhere or Localhost to connect
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Farmer Platform Backend is running successfully!' });
});

// Start express server
app.listen(PORT, () => {
  console.log(`Backend server successfully running on http://localhost:${PORT}`);
});
