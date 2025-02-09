import { json } from "@sveltejs/kit"
import clientPromise from "$lib/db.js"
import bcrypt from "bcryptjs"

export async function POST({ request }) {
  const { username, password } = await request.json()

  console.log("Login attempt for username:", username)

  try {
    const client = await clientPromise
    const db = client.db("rhythm")
    const users = db.collection("users")

    // Find the user
    const user = await users.findOne({ username })
    if (!user) {
      console.log("User not found:", username)
      return json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      console.log("Invalid password for user:", username)
      return json({ success: false, message: "Invalid password" }, { status: 401 })
    }

    console.log("Successful login for user:", username)
    return json({ success: true, user: { name: user.username, email: user.email } })
  } catch (error) {
    console.error("Login error:", error)
    return json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}

