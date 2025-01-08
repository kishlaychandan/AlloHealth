export async function handler(req, res) {
    try {
      // Fetch the total number of doctors from your database
      const totalDoctors = await DoctorModel.countDocuments(); // Example using MongoDB
  
      res.status(200).json({ count: totalDoctors });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doctors count' });
    }
  }