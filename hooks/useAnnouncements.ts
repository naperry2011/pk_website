import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Announcement } from "@/lib/database.types";

export function useAnnouncements(townId?: string) {
  return useQuery({
    queryKey: ["announcements", { townId }],
    queryFn: async () => {
      let query = supabase
        .from("announcements")
        .select("*")
        .order("date", { ascending: false });
      if (townId) query = query.eq("town_id", townId);
      const { data, error } = await query;
      if (error) throw error;
      return data as Announcement[];
    },
  });
}

export function useAnnouncement(id: string) {
  return useQuery({
    queryKey: ["announcements", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Announcement;
    },
    enabled: !!id,
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      values: Omit<Announcement, "id" | "created_at" | "updated_at">
    ) => {
      const { data, error } = await supabase
        .from("announcements")
        .insert(values)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...values
    }: Partial<Announcement> & { id: string }) => {
      const { data, error } = await supabase
        .from("announcements")
        .update(values)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}
