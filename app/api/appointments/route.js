// File: /app/api/appointments/route.js
// import prisma from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(req) {
    try {
      const { doctorId, patientId, date, issue } = await req.json();
      const appointment = await prisma.appointment.create({
        data: {
          doctorId,
          patientId,
          date: new Date(date),
          issue: issue || '', // Save the issue or empty string if not provided
        },
      });
      return new Response(JSON.stringify(appointment), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }


export async function GET() {
    try {
      const appointments = await prisma.appointment.findMany({
        include: {
          doctor: true,
          patient: true,
        },
      });
      return new Response(JSON.stringify(appointments), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }