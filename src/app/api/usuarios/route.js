import { NextResponse } from "next/server";

// Mock data
const users = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", edad: 28 },
  { id: 2, name: "María García", email: "maria@example.com", edad: 32 },
  { id: 3, name: "Carlos López", email: "carlos@example.com", edad: 25 },
  { id: 4, name: "Ana Martínez", email: "ana@example.com", edad: 30 },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request) {
  const data = await request.json();
  const newUser = {
    id: users.length + 1,
    ...data,
  };
  users.push(newUser);
  return NextResponse.json(newUser);
}

export async function PUT(request) {
  const data = await request.json();
  const index = users.findIndex((user) => user.id === data.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...data };
    return NextResponse.json(users[index]);
  }
  return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id"));
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    return NextResponse.json(deletedUser);
  }
  return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
}
