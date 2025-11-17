// src/app/test-db/page.tsx
import { getPoliticiansFromDb } from "@/lib/db-data";

export default async function TestDbPage() {
  const politicians = await getPoliticiansFromDb();

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">DB Test – Politicians</h1>
      <p>Total politicians from RDS: {politicians.length}</p>

      <ul className="list-disc list-inside space-y-1">
        {politicians.slice(0, 10).map((p) => (
          <li key={p.id}>
            #{p.id} – {p.name} ({p.office})
          </li>
        ))}
      </ul>
    </main>
  );
}
