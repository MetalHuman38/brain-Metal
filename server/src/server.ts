import express from 'express';
import 'dotenv/config';
import router from './routes/router';
import http from 'http';
import cookieParser from 'cookie-parser';

const app = express();

// Cors middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Use the router for all routes
app.use(router);

// Error handler middleware
app.use(async (req, res, next) => {
  try {
      const error = CreateError(404, 'API route not found');
      throw error;
  } catch (err) {
      next(err);
  }
});

app.use(async (err: any, req: any, res: any, next: any) => {
  try {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  } catch (err) {
    next(err);
  }
});


// Start the server
async function startServer() {
    try {
      await new Promise<void>((resolve, reject) => {
        server.on('request', app);
        server.listen(process.env.PORT || 3000, () => {
          resolve();
        });
      });
    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1); // Exit process with error code
    }
  }
  const server = http.createServer();

  server.on('clientError', (err: any, socket: { destroy: () => void; }) => {
    socket.destroy(); // Destroy the socket to prevent further events
  });

startServer();



function CreateError(arg0: number, arg1: string) {
  throw new Error('Function not implemented.');
}

