export async function PUT(req, { params }) {
    try {
      const { id } = params;
      const body = await req.json();
      const { name, specialization, gender, location, availability } = body;
  
      const updatedDoctor = await prisma.doctor.update({
        where: { id: parseInt(id) },
        data: {
          name,
          specialization,
          gender,
          location,
          availability,
        },
      });
  
      return new Response(JSON.stringify(updatedDoctor), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to update doctor' }), { status: 500 });
    }
  }
  
  export async function DELETE(req, { params }) {
    try {        
        const { id } = params;
        console.log("testing 1");
        
        await prisma.doctor.delete({
            where: { id: parseInt(id) },
        });
        console.log("just testing");
  
      return new Response(JSON.stringify({ message: 'Doctor deleted successfully' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to delete doctor' }), { status: 500 });
    }
  }
  