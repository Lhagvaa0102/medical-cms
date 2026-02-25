import { conditions } from "@/data";

export default async function ConditionsPage({
  searchParams,
}: {
  searchParams?: URLSearchParams | Promise<URLSearchParams>;
}) {
  // await хийж unwrap хийх
  const params = await searchParams;
  const lang = (params?.get("lang") || "mn") as "mn" | "en";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {lang === "mn" ? "Өвчнүүд" : "Conditions"}
      </h1>

      <ul className="space-y-4">
        {conditions.map((c) => (
          <li key={c.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{c.title[lang]}</h2>
            <p className="text-gray-500">Slug: {c.slug}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
