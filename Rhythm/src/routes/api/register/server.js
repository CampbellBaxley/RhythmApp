import { json } from "@sveltejs/kit"
import clientPromise from "$lib/db.js"
import bcrypt from "bcryptjs"

export async function POST({ request }) {
  const { username, email, password } = await request.json()

  try {
    const client = await clientPromise
    const db = client.db("rhythm")
    const users = db.collection("users")

    // Check if user already exists
    const existingUser = await users.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return json({ success: false, message: "Username or email already exists" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert the new user
    const result = await users.insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return json({ success: true, user: { name: username, email } })
  } catch (error) {
    console.error("Registration error:", error)
    return json({ success: false, message: "An error occurred during registration" }, { status: 500 })
  }
}

