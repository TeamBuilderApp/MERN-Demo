import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log('MongoDB Connected: ${conn.connection.host}');
	} catch (error) {
		console.error(`Error: ${error.message}`);
		
		// Return codes: 
		// 1 code means there was an error, so exit.
		// 0 means success.
		process.exit(1); 
	}
};
