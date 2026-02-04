import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params;
    const cid = new Date(date);

    // Validate the date
    if (isNaN(cid.getTime())) {
      return new Response("Invalid date", { status: 400 });
    }

    // Normalize to start of day (optional)
    cid.setHours(0, 0, 0, 0);

    const events = await prisma.event.findMany({
      where: {
        startDate: { gte: cid },
      },
      orderBy: {
        startDate: "asc",
      },
    });

    if (!events || events.length === 0) {
      return new Response("Events not found", { status: 404 });
    }

    return new Response(JSON.stringify(events), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
