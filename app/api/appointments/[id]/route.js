import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// PATCH function to update appointment status or reschedule the appointment
export async function PATCH(req, { params }) {
    try {
      const { id } = params; // Appointment ID
      const { status, newDate } = await req.json();
  
      const updatedAppointment = await prisma.appointment.update({
        where: { id: Number(id) },
        data: {
          status: status || undefined,
          date: newDate ? new Date(newDate) : undefined,
        },
      });
  
      return new Response(JSON.stringify(updatedAppointment), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}