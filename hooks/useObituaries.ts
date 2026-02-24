import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Obituary, ApprovalStatus } from "@/lib/database.types";

export function useObituaries(options?: {
  townId?: string;
  status?: ApprovalStatus;
}) {
  return useQuery({
    queryKey: ["obituaries", options],
    queryFn: async () => {
      let query = supabase
        .from("obituaries")
        .select("*")
        .order("created_at", { ascending: false });
      if (options?.townId) query = query.eq("town_id", options.townId);
      if (options?.status) query = query.eq("status", options.status);
      const { data, error } = await query;
      if (error) throw error;
      return data as Obituary[];
    },
  });
}

export function useObituary(id: string) {
  return useQuery({
    queryKey: ["obituaries", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("obituaries")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Obituary;
    },
    enabled: !!id,
  });
}

export function useCreateObituary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      values: Omit<Obituary, "id" | "created_at" | "updated_at">
    ) => {
      const { data, error } = await supabase
        .from("obituaries")
        .insert(values)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["obituaries"] });
    },
  });
}

export function useUpdateObituary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...values
    }: Partial<Obituary> & { id: string }) => {
      const { data, error } = await supabase
        .from("obituaries")
        .update(values)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["obituaries"] });
    },
  });
}

export function useDeleteObituary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("obituaries")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["obituaries"] });
    },
  });
}

export function useApproveObituary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("obituaries")
        .update({ status: "approved", reviewed_by: user?.id ?? null })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["obituaries"] });
    },
  });
}

export function useRejectObituary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      review_notes,
    }: {
      id: string;
      review_notes: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("obituaries")
        .update({
          status: "rejected",
          reviewed_by: user?.id ?? null,
          review_notes,
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["obituaries"] });
    },
  });
}
