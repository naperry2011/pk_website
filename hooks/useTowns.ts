import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Town } from "@/lib/database.types";

export function useTowns() {
  return useQuery({
    queryKey: ["towns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("towns")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return data as Town[];
    },
  });
}

export function useTown(id: string) {
  return useQuery({
    queryKey: ["towns", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("towns")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Town;
    },
    enabled: !!id,
  });
}

export function useCreateTown() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      values: Omit<Town, "created_at" | "updated_at">
    ) => {
      const { data, error } = await supabase
        .from("towns")
        .insert(values)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["towns"] });
    },
  });
}

export function useUpdateTown() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...values
    }: Partial<Town> & { id: string }) => {
      const { data, error } = await supabase
        .from("towns")
        .update(values)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["towns"] });
    },
  });
}

export function useDeleteTown() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("towns").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["towns"] });
    },
  });
}
