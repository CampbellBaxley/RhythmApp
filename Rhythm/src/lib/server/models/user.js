// Import the necessary function to connect to the MongoDB database
import { connectDB } from "../db.js"; // Function to connect to the database

/**
 * Creates a new user in the database.
 * 
 * @param {string} email - The email of the user.
 * @param {string} name - The name of the user.
 * @param {string} role - The role of the user (e.g., 'admin', 'user').
 * @param {string} password - The password of the user (note: this is stored directly, which is NOT recommended for production).
 * @returns {Object} The created user object with a default mood of 'neutral' and an empty task list.
 */
export async function createUser(email, name, role, password) {
    // Connect to the database
    const db = await connectDB();
    
    // Get the 'users' collection
    const users = db.collection("users");

    // Create the new user object with default values for mood and tasks
    const newUser = { 
        email, 
        name, 
        role, 
        mood: "neutral", // Default mood set to 'neutral'
        tasks: [], // Empty task list for the user initially
        password // Storing password directly (NOT RECOMMENDED for production)
    };

    // Insert the new user into the collection
    await users.insertOne(newUser);

    // Return the newly created user
    return newUser; 
}

/**
 * Retrieves a user by their email address.
 * 
 * @param {string} email - The email of the user to retrieve.
 * @returns {Object|null} The user object if found, or null if the user does not exist.
 */
export async function getUserByEmail(email) {
    // Connect to the database
    const db = await connectDB();

    // Search for a user with the given email in the 'users' collection
    return await db.collection("users").findOne({ email });
}