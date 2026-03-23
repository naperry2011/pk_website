import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { TownPhoto } from "@/lib/database.types";

const MAX_PHOTOS_PER_TOWN = 6;

// Fetch all photos for a town, ordered by display_order
export function useTownPhotos(townId: string | undefined) {
  return useQuery({
    queryKey: ["town-photos", townId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("town_photos")
        .select("*")
        .eq("town_id", townId!)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as TownPhoto[];
    },
    enabled: !!townId,
  });
}

// Add a photo to a town's gallery
export function useAddTownPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      photo: Omit<TownPhoto, "id" | "created_at" | "updated_at">
    ) => {
      // Check count first
      const { count } = await supabase
        .from("town_photos")
        .select("*", { count: "exact", head: true })
        .eq("town_id", photo.town_id);
      if ((count ?? 0) >= MAX_PHOTOS_PER_TOWN) {
        throw new Error(`Maximum of ${MAX_PHOTOS_PER_TOWN} photos per town`);
      }
      const { data, error } = await supabase
        .from("town_photos")
        .insert(photo)
        .select()
        .single();
      if (error) throw error;
      return data as TownPhoto;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["town-photos", data.town_id],
      });
    },
  });
}

// Update a photo (caption, display_order)
export function useUpdateTownPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...values
    }: Partial<TownPhoto> & { id: string }) => {
      const { data, error } = await supabase
        .from("town_photos")
        .update(values)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["town-photos"] });
    },
  });
}

// Delete a photo
export function useDeleteTownPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("town_photos")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["town-photos"] });
    },
  });
}
