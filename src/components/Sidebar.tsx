export default function Sidebar() {
  return (
    <div className="space-y-6">
      <div className="border rounded shadow">
        <div className="bg-[#1f5f7a] text-white p-3 font-semibold">
          SOCIETY INFORMATION
        </div>

        <div className="p-4 text-sm space-y-2">
          <p className="text-green-600">POSNA Bylaws</p>
          <p className="text-green-600">Code of Ethics</p>
          <p className="text-green-600">Strategic Plan</p>
        </div>
      </div>

      <div className="border rounded shadow p-4">
        <h3 className="font-semibold mb-2">A History of POSNA</h3>
        <div className="h-35 bg-gray-200 rounded"></div>
        <button className="mt-3 bg-pink-600 text-white px-3 py-2 text-sm rounded">
          DOWNLOAD
        </button>
      </div>
    </div>
  );
}
