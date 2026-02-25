import { connectDB } from "@/lib/mongodb";
import Condition from "@/models/Condition";

export async function GET() {
  await connectDB();

  const conditions = await Condition.find().sort({
    createdAt: -1,
  });

  return Response.json(conditions);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const condition = await Condition.create(body);

  return Response.json(condition);
}
