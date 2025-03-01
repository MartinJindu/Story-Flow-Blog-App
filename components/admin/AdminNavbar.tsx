import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminNavbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/">Home</Link>
      {session?.user?.role === "ADMIN" && (
        <Link href="/admin" className="bg-red-500 px-3 py-1 rounded">
          Admin Dashboard
        </Link>
      )}
    </nav>
  );
}
