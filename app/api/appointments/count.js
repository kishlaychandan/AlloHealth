import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function handler(req, res) {
  // Check for GET request
  if (req.method === 'GET') {
    try {
      console.log("Fetching appointments count...");
      
      const totalAppointments = await prisma.appointment.count();
      console.log("Total Appointments:", totalAppointments);  // Log the result
      
      // Return the total count
      res.status(200).json({ count: totalAppointments });
    } catch (error) {
      console.error("Error fetching appointments count:", error);
      res.status(500).json({ error: 'Failed to fetch appointments count' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
