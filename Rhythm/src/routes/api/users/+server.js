// Import the json helper from SvelteKit to return JSON responses from API routes
import { json } from "@sveltejs/kit";

// Import the functions for creating a user and retrieving users from the database
import { createUser, getUserByEmail, getUsers } from "$lib/server/models/user.js";

/**
 * Handles the HTTP POST request for registering a new user.
 * 
 * This function expects a JSON body with user details such as email, name, 
 * role, and password. It first checks if a user with the same email already 
 * exists in the database. If a user exists, it returns an error response with 
 * a 400 status code. Otherwise, it creates a new user and returns the created 
 * user in the response body with a 201 (Created) status code.
 * 
 * @param {Request} request - The request object containing the user data in the body.
 * @returns {Response} - A JSON response with the created user or an error message.
 */
export async function POST({ request }) {
    // Extract user details from the incoming JSON request body
    const { email, name, role, password } = await request.json();

    // Check if a user with the provided email already exists in the database
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        // If a user exists, return a 400 error response with a message
        return json({ error: "User already exists" }, { status: 400 });
    }

    // Call the function to create a new user in the database
    const user = await createUser(email, name, role, password);

    // Return the newly created user as a JSON response with a 201 (Created) status code
    return json(user, { status: 201 });
}

/**
 * Handles the HTTP GET request to retrieve all users.
 * 
 * This function fetches all users from the database and returns them in the response body.
 * If there is an error while fetching the users, it returns an error message with a 
 * 500 status code.
 * 
 * @returns {Response} - A JSON response with the list of all users or an error message.
 */
export async function GET() {
    try {
        // Fetch all users from the database
        const users = await getUsers();

        // Return the list of users as a JSON response
        return json(users);
    } catch (error) {
        // If there's an error, return a 500 error with an appropriate message
        return json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
