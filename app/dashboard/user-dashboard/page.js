import ProtectedRoute from "../../components/ProtectedRoute";

const UserDashboard = () => {
  return (
    <ProtectedRoute role="User">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to User Dashboard</h1>
        <p className="mt-4">Here you can manage your appointments, view doctors, and more.</p>
        {/* Add more components or features for user-specific functionality */}
      </div>
    </ProtectedRoute>
  );
};

export default UserDashboard;
