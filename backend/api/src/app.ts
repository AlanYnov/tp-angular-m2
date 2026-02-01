import express from 'express';
import cors from 'cors';
import path from 'path';
import sneakerRoutes from './routes/sneaker.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Static files - serve images from assets/img
app.use('/images', express.static(path.join(__dirname, '../../assets/img')));

// Routes
app.use('/sneakers', sneakerRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
