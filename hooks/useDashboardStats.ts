import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface DashboardStats {
  totalTowns: number;
  totalAnnouncements: number;
  totalObituaries: number;
  totalWeddings: number;
  pendingObituaries: number;
  pendingWeddings: number;
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async (): Promise<DashboardStats> => {
      const [towns, announcements, obituaries, weddings, pendingObit, pendingWed] =
        await Promise.all([
          supabase.from("towns").select("*", { count: "exact", head: true }),
          supabase.from("announcements").select("*", { count: "exact", head: true }),
          supabase.from("obituaries").select("*", { count: "exact", head: true }),
          supabase.from("weddings").select("*", { count: "exact", head: true }),
          supabase
            .from("obituaries")
            .select("*", { count: "exact", head: true })
            .eq("status", "pending"),
          supabase
            .from("weddings")
            .select("*", { count: "exact", head: true })
            .eq("status", "pending"),
        ]);

      if (towns.error) throw towns.error;
      if (announcements.error) throw announcements.error;
      if (obituaries.error) throw obituaries.error;
      if (weddings.error) throw weddings.error;
      if (pendingObit.error) throw pendingObit.error;
      if (pendingWed.error) throw pendingWed.error;

      return {
        totalTowns: towns.count ?? 0,
        totalAnnouncements: announcements.count ?? 0,
        totalObituaries: obituaries.count ?? 0,
        totalWeddings: weddings.count ?? 0,
        pendingObituaries: pendingObit.count ?? 0,
        pendingWeddings: pendingWed.count ?? 0,
      };
    },
  });
}
