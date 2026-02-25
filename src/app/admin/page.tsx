export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">Conditions</div>

        <div className="bg-white p-6 rounded shadow">News</div>

        <div className="bg-white p-6 rounded shadow">Research</div>
      </div>
    </div>
  );
}
