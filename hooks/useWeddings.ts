import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Wedding, ApprovalStatus } from "@/lib/database.types";

export function useWeddings(options?: {
  townId?: string;
  status?: ApprovalStatus;
}) {
  return useQuery({
    queryKey: ["weddings", options],
    queryFn: async () => {
      let query = supabase
        .from("weddings")
        .select("*")
        .order("date", { ascending: false });
      if (options?.townId) query = query.eq("town_id", options.townId);
      if (options?.status) query = query.eq("status", options.status);
      const { data, error } = await query;
      if (error) throw error;
      return data as Wedding[];
    },
  });
}

export function useWedding(id: string) {
  return useQuery({
    queryKey: ["weddings", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("weddings")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Wedding;
    },
    enabled: !!id,
  });
}

export function useCreateWedding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      values: Omit<Wedding, "id" | "created_at" | "updated_at">
    ) => {
      const { data, error } = await supabase
        .from("weddings")
        .insert(values)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weddings"] });
    },
  });
}

export function useUpdateWedding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...values
    }: Partial<Wedding> & { id: string }) => {
      const { data, error } = await supabase
        .from("weddings")
        .update(values)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weddings"] });
    },
  });
}

export function useDeleteWedding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("weddings")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weddings"] });
    },
  });
}

export function useApproveWedding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("weddings")
        .update({ status: "approved", reviewed_by: user?.id ?? null })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weddings"] });
    },
  });
}

export function useRejectWedding() {
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
        .from("weddings")
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
      queryClient.invalidateQueries({ queryKey: ["weddings"] });
    },
  });
}
