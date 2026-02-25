import Link from "next/link";

async function getConditions() {
  const res = await fetch("http://localhost:3000/api/conditions", {
    cache: "no-store",
  });

  return res.json();
}

export default async function ConditionsPage() {
  const conditions = await getConditions();

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Conditions</h1>

        <Link
          href="/admin/conditions/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Condition
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="border-b">
          <tr className="text-left">
            <th className="p-3">Title (EN)</th>
            <th className="p-3">Slug</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {conditions.map((item: any) => (
            <tr key={item._id} className="border-b">
              <td className="p-3">{item.title?.en}</td>

              <td className="p-3">{item.slug}</td>

              <td className="p-3 space-x-3">
                <Link
                  href={`/admin/conditions/${item._id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>

                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
