import { NextResponse } from "next/server"

// This is a placeholder for your database interaction.
// In a real application, you would connect to your database here (e.g., Supabase, Neon).

export async function GET(request: Request) {
  // Simulate fetching skills from a database
  const skills = [
    { id: "s1", name: "React", category: "Frontend" },
    { id: "s2", name: "Node.js", category: "Backend" },
    { id: "s3", name: "Python", category: "Programming" },
  ]
  return NextResponse.json(skills)
}

export async function POST(request: Request) {
  const { name, category } = await request.json()

  if (!name || !category) {
    return NextResponse.json({ error: "Name and category are required" }, { status: 400 })
  }

  // Simulate adding a new skill to a database
  const newSkill = { id: `s${Date.now()}`, name, category }
  console.log("New skill added (simulated):", newSkill)

  return NextResponse.json(newSkill, { status: 201 })
}
