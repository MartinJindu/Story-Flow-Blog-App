import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/option";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return redirect("/");
  }

  return <>{children}</>;
}
