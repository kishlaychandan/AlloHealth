import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany();
    return new Response(JSON.stringify(doctors), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch doctors' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, specialization, gender, location, availability } = body;

    const newDoctor = await prisma.doctor.create({
      data: {
        name,
        specialization,
        gender,
        location,
        availability: availability ?? true,
      },
    });

    return new Response(JSON.stringify(newDoctor), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add doctor' }), { status: 500 });
  }
}
