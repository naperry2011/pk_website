import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useUpload() {
  return useMutation({
    mutationFn: async (file: {
      uri: string;
      type: string;
      name: string;
    }) => {
      const fileName = `${Date.now()}-${file.name}`;
      const response = await fetch(file.uri);
      const blob = await response.blob();
      const { error } = await supabase.storage
        .from("media")
        .upload(fileName, blob, { contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(fileName);
      return data.publicUrl;
    },
  });
}
