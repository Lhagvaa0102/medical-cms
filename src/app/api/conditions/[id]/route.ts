import { connectDB } from "@/lib/mongodb";
import Condition from "@/models/Condition";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await connectDB();
  const condition = await Condition.findById(id);
  return new Response(JSON.stringify(condition), { status: 200 });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await connectDB();
  const body = await req.json();
  const updated = await Condition.findByIdAndUpdate(id, body, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await connectDB();
  await Condition.findByIdAndDelete(id);
  return new Response("Deleted", { status: 200 });
}
