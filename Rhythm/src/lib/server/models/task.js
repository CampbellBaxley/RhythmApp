// Import the necessary functions for database connection and ObjectId manipulation from MongoDB
import { connectDB } from "../db.js"; // Function to connect to the database
import { ObjectId } from "mongodb"; // ObjectId used for MongoDB document references

/**
 * Creates a new task in the database.
 * 
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} status - The current status of the task (e.g., 'pending', 'completed').
 * @param {string} dueDate - The due date of the task.
 * @param {string} userEmail - The email of the user to whom the task is assigned.
 * @returns {Object} The created task with the inserted MongoDB _id.
 */
export async function createTask(title, description, status, dueDate, userEmail) {
    // Connect to the database
    const db = await connectDB();
    
    // Get the 'tasks' collection
    const tasks = db.collection("tasks");

    // Create the new task object
    const newTask = { title, description, status, dueDate, userEmail };
    
    // Insert the new task into the collection and store the result
    const result = await tasks.insertOne(newTask);
    
    // Return the new task object with the MongoDB inserted _id
    return { ...newTask, _id: result.insertedId };
}

/**
 * Retrieves all tasks for a specific user by their email.
 * 
 * @param {string} email - The email of the user whose tasks need to be retrieved.
 * @returns {Array} An array of task objects associated with the provided email.
 */
export async function getTasksForUser(email) {
    // Connect to the database
    const db = await connectDB();
    
    // Fetch and return all tasks that match the user's email
    return await db.collection("tasks").find({ userEmail: email }).toArray();
}
