import { analyzeResume } from "../../../lib/analyzer";

export async function POST(req) {
  const { text, role } = await req.json();

  if (!text || !text.trim() || !role) {
    return Response.json(
      { error: "Resume content and role are required." },
      { status: 400 }
    );
  }

  const result = analyzeResume(text, role);

  return Response.json(result);
}