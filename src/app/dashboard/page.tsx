"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = (session as any)?.user;

  useEffect(() => {
    if (!isPending) {
      if (!user) {
        router.push("/login");
      } else if (user.role === "ADMIN" || user.role === "MODERATOR") {
        router.push("/admin");
      } else if (user.role === "EMPLOYER") {
        router.push("/dashboard/employer");
      } else {
        router.push("/dashboard/candidate");
      }
    }
  }, [user, isPending, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={24} className="animate-spin text-zinc-500" />
        <p className="text-xs font-medium text-zinc-500">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
