import { View, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  useObituary,
  useUpdateObituary,
  useApproveObituary,
  useRejectObituary,
  useDeleteObituary,
} from "@/hooks/useObituaries";

export default function EditObituary() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: obituary, isLoading } = useObituary(id!);
  const updateObituary = useUpdateObituary();
  const approveObituary = useApproveObituary();
  const rejectObituary = useRejectObituary();
  const deleteObituary = useDeleteObituary();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [passedDate, setPassedDate] = useState("");
  const [funeralDate, setFuneralDate] = useState("");
  const [biography, setBiography] = useState("");
  const [familyContact, setFamilyContact] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showReject, setShowReject] = useState(false);

  useEffect(() => {
    if (obituary) {
      setName(obituary.name);
      setBirthDate(obituary.birth_date ?? "");
      setPassedDate(obituary.passed_date);
      setFuneralDate(obituary.funeral_date);
      setBiography(obituary.biography ?? "");
      setFamilyContact(obituary.family_contact ?? "");
      setPhotoUrl(obituary.photo_url ?? "");
      setReviewNotes(obituary.review_notes ?? "");
    }
  }, [obituary]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-warm">
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  const handleSave = async () => {
    await updateObituary.mutateAsync({
      id: id!,
      data: {
        name,
        birth_date: birthDate || null,
        passed_date: passedDate,
        funeral_date: funeralDate,
        biography: biography || null,
        family_contact: familyContact || null,
        photo_url: photoUrl || null,
      },
    });
    router.back();
  };

  const handleApprove = async () => {
    await approveObituary.mutateAsync(id!);
    router.back();
  };

  const handleReject = async () => {
    await rejectObituary.mutateAsync({ id: id!, notes: reviewNotes });
    setShowReject(false);
    router.back();
  };

  const handleDelete = async () => {
    await deleteObituary.mutateAsync(id!);
    setShowDelete(false);
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-4 max-w-2xl">
        <View className="flex-row items-center gap-3 mb-6">
          <H2>Edit Obituary</H2>
          {obituary && <StatusBadge status={obituary.status} />}
        </View>

        <ImageUpload
          value={photoUrl || undefined}
          onUpload={setPhotoUrl}
          label="Photo"
        />

        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Full name"
        />

        <Input
          label="Birth Date"
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="YYYY-MM-DD"
        />

        <Input
          label="Passed Date"
          value={passedDate}
          onChangeText={setPassedDate}
          placeholder="YYYY-MM-DD"
        />

        <Input
          label="Funeral Date"
          value={funeralDate}
          onChangeText={setFuneralDate}
          placeholder="YYYY-MM-DD"
        />

        <TextArea
          label="Biography"
          value={biography}
          onChangeText={setBiography}
          placeholder="Life story..."
          numberOfLines={6}
        />

        <Input
          label="Family Contact"
          value={familyContact}
          onChangeText={setFamilyContact}
          placeholder="Contact information"
        />

        {/* Approval Actions */}
        {obituary?.status === "pending" && (
          <View className="bg-white rounded-xl p-4 border border-gray-warm mb-4">
            <TextArea
              label="Review Notes"
              value={reviewNotes}
              onChangeText={setReviewNotes}
              placeholder="Notes for rejection (optional for approval)..."
            />
            <View className="flex-row gap-3">
              <Button
                title="Approve"
                onPress={handleApprove}
                variant="secondary"
                loading={approveObituary.isPending}
              />
              <Button
                title="Reject"
                onPress={() => setShowReject(true)}
                variant="danger"
              />
            </View>
          </View>
        )}

        <View className="flex-row gap-3 mt-4">
          <Button
            title="Cancel"
            onPress={() => router.back()}
            variant="outline"
          />
          <Button
            title="Save Changes"
            onPress={handleSave}
            loading={updateObituary.isPending}
            disabled={!name || !passedDate || !funeralDate}
          />
          <Button
            title="Delete"
            onPress={() => setShowDelete(true)}
            variant="danger"
          />
        </View>
      </View>

      <ConfirmDialog
        visible={showDelete}
        title="Delete Obituary"
        message="Are you sure you want to delete this obituary? This cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />

      <ConfirmDialog
        visible={showReject}
        title="Reject Obituary"
        message={`Reject this obituary${reviewNotes ? ` with notes: "${reviewNotes}"` : ""}?`}
        confirmLabel="Reject"
        variant="danger"
        onConfirm={handleReject}
        onCancel={() => setShowReject(false)}
      />
    </ScrollView>
  );
}
