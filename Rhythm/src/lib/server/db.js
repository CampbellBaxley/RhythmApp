// Import MongoClient from the mongodb library to interact with the database
import { MongoClient } from "mongodb";

// Import the MongoDB URI from the environment variables to keep sensitive information secure
import { MONGO_URI } from "$env/static/private"; // Store your connection string in .env for security

// Create a new instance of MongoClient with the connection URI
const client = new MongoClient(MONGO_URI);

// Declare a variable for the database connection
let db;

/**
 * Connects to the MongoDB database and returns the database instance.
 * 
 * This function checks if the database has already been connected to (`db` is not null). 
 * If not, it establishes a new connection to the database using the provided URI and 
 * stores the database instance for future use. This ensures that only one connection 
 * is made during the application's lifecycle.
 * 
 * @returns {Object} The MongoDB database instance.
 */
export async function connectDB() {
    // If the database connection is not yet established, connect to the database
    if (!db) {
        // Connect to MongoDB using the client
        await client.connect();

        // Select the specific database
        db = client.db("Project0"); 
    }

    // Return the connected database instance
    return db;
}
