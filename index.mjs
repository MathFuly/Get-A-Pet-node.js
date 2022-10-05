import express from "express";
import cors from "cors";

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Public folder for images
app.use(express.static('public'))

// Routes
import userRoutes from "./routes/userRoutes.mjs"

app.use('/users', userRoutes)

app.listen (5000)
