"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Condition {
  _id: string;
  title: {
    mn: string;
    en: string;
  };
  slug: string;
}

export default function EditCondition({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [condition, setCondition] = useState<Condition | null>(null);
  const [titleMn, setTitleMn] = useState("");
  const [titleEn, setTitleEn] = useState("");

  useEffect(() => {
    async function fetchCondition() {
      const res = await axios.get(`/api/conditions/${params.id}`);
      setCondition(res.data);
      setTitleMn(res.data.title.mn);
      setTitleEn(res.data.title.en);
    }
    fetchCondition();
  }, [params.id]);

  const handleUpdate = async () => {
    await axios.put(`/api/conditions/${params.id}`, {
      title: { mn: titleMn, en: titleEn },
      slug: titleEn.toLowerCase().replaceAll(" ", "-"),
    });

    alert("Updated");
    router.push("/admin/conditions");
  };

  if (!condition) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Edit Condition</h1>

      <input
        value={titleMn}
        placeholder="Title MN"
        className="border p-2 w-full"
        onChange={(e) => setTitleMn(e.target.value)}
      />

      <input
        value={titleEn}
        placeholder="Title EN"
        className="border p-2 w-full"
        onChange={(e) => setTitleEn(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}
