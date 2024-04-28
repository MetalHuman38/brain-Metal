import express from 'express';
import 'dotenv/config';
import router from './routes/router';
import http from 'http';
import cookieParser from 'cookie-parser';
import path from 'path';
import { logEvent } from './middleware/logEventMiddleware';
import authenticateRoutes from './routes/authenticateRoutes';
import cors from 'cors';



const app = express();

app.use(cors());

const port = process.env.PORT || 8080;  // Default port to listen

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173/');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
})

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/dist')));
app.use(cookieParser());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);



// Use the router for all routes
app.use(router);


// Log all requests
app.use((req, res, next) => {
  logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  next();
});

app.use('/hello', (req, res) => {
  res.status(201).send({ message: 'Hello World' });
})


app.use(authenticateRoutes);


