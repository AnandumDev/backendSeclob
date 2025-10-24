// import express from 'express'
// import userRouter from './router/userRouter.js'
// import 'dotenv/config'
// import connectDB from './config/db.js'
// import cors from 'cors'

// const app = express()
// const PORT = process.env.PORT

// // app.use(cors({
// //     // origin: 'https://e-commerce-kagv.onrender.com',
// //     origin: 'http://localhost:5173',
// //     credentials: true
// // }))
// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use("/uploads", express.static("uploads"));

// app.use('/api/auth', userRouter)

// app.listen(PORT, () => {
//     console.log(`http://localhost:${PORT}`);
//     connectDB()
// })










import express from 'express';
import userRouter from './router/userRouter.js';
import 'dotenv/config';
import connectDB from './config/db.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174', // your dev frontend
  'https://e-commerce-kagv.onrender.com'
];

// Middleware must be applied **before routes**
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, mobile apps, etc.
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'] // important for preflight
}));

// Handle preflight requests explicitly
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use('/api/auth', userRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDB();
});
