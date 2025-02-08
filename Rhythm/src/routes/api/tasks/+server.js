// Import the json helper from SvelteKit to return JSON responses from API routes
import { json } from "@sveltejs/kit";

// Import the functions for creating a task and retrieving tasks from the database
import { createTask, getTasksForUser } from "$lib/server/models/task.js";

/**
 * Handles the HTTP POST request for creating a new task.
 * 
 * This function expects a JSON body with task details such as title, description, 
 * status, due date, and the email of the user who the task belongs to.
 * Once the task is created, it returns the created task in the response body.
 * 
 * @param {Request} request - The request object containing the task data in the body.
 * @returns {Response} - A JSON response with the created task and a 201 status code.
 */
export async function POST({ request }) {
    // Extract task details from the incoming JSON request body
    const { title, description, status, dueDate, userEmail } = await request.json();

    // Call the function to create a new task in the database
    const task = await createTask(title, description, status, dueDate, userEmail);

    // Return the created task as a JSON response with a 201 (Created) status code
    return json(task, { status: 201 });
}

/**
 * Handles the HTTP GET request to retrieve tasks for a specific user.
 * 
 * This function expects the email of the user in the query parameters. 
 * It returns the list of tasks associated with that user.
 * If the email is not provided, it returns a 400 error.
 * 
 * @param {URL} url - The URL object which contains the query parameters.
 * @returns {Response} - A JSON response with the tasks list or an error message.
 */
export async function GET({ url }) {
    // Get the 'email' query parameter from the URL
    const email = url.searchParams.get("email");

    // If no email is provided, return an error response with a 400 status code
    if (!email) return json({ error: "Email is required" }, { status: 400 });

    // Fetch the tasks associated with the provided email (user)
    const tasks = await getTasksForUser(email);

    // Return the list of tasks as a JSON response
    return json(tasks);
}