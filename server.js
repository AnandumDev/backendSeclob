import express from 'express'
import userRouter from './router/userRouter.js'
import 'dotenv/config'
import connectDB from './config/db.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT

// app.use(cors({
//     // origin: 'https://e-commerce-kagv.onrender.com',
//     origin: 'http://localhost:5173',
//     credentials: true
// }))


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Default allowed origins for development and common deployment platforms
    const defaultAllowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177',
      'http://localhost:3001',
      'https://localhost:3000',
      'https://localhost:5173',
      'https://localhost:5175',
      'https://localhost:5176',
      'https://localhost:5177',
     
    ];
    
    // Get allowed origins from environment or use defaults
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? 
      process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) : 
      defaultAllowedOrigins;
    
    // Allow all origins in development or if wildcard is specified
    if (process.env.NODE_ENV === 'development' || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    console.log('CORS: Origin not allowed:', origin);
    console.log('CORS: Allowed origins:', allowedOrigins);
    return callback(null, true); // Allow for now during deployment debugging
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cache-Control']
}));




app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/uploads", express.static("uploads"));

app.use('/api/auth', userRouter)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    connectDB()
})










// import express from 'express';
// import userRouter from './router/userRouter.js';
// import 'dotenv/config';
// import connectDB from './config/db.js';
// import cors from 'cors';

// const app = express();
// const PORT = process.env.PORT;

// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://localhost:5174', // your dev frontend
//   'https://e-commerce-kagv.onrender.com'
// ];

// // Middleware must be applied **before routes**
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // allow Postman, mobile apps, etc.
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'] // important for preflight
// }));

// // Handle preflight requests explicitly
// app.options('*', cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));
// app.use('/api/auth', userRouter);

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
//   connectDB();
// });
