import prisma from "@/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get("specialization");
  const location = searchParams.get("location");
  const availability = searchParams.get("availability") === "true";

  const doctors = await prisma.doctor.findMany({
    where: {
      specialization: specialization || undefined,
      location: location || undefined,
      availability: availability || undefined,
    },
  });

  return new Response(JSON.stringify(doctors), { status: 200 });
}
