import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows the req.body to accept JSON data.

app.use("/api/products", productRoutes);

//console.log(process.env.MONGO_URI);

if (process.env.NODE_ENV === "production") {
	//Static dist deploy assets.
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// Set up rate limiter: maximum of 100 requests per 15 minutes
	const RateLimit = require("express-rate-limit");
	const limiter = RateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // max 100 requests per windowMs
	});

	// Apply rate limiter to the route handler
	app.get("*", limiter, (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});