import { View, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  useWedding,
  useUpdateWedding,
  useApproveWedding,
  useRejectWedding,
  useDeleteWedding,
} from "@/hooks/useWeddings";

export default function EditWedding() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: wedding, isLoading } = useWedding(id!);
  const updateWedding = useUpdateWedding();
  const approveWedding = useApproveWedding();
  const rejectWedding = useRejectWedding();
  const deleteWedding = useDeleteWedding();

  const [bride, setBride] = useState("");
  const [groom, setGroom] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [message, setMessage] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showReject, setShowReject] = useState(false);

  useEffect(() => {
    if (wedding) {
      setBride(wedding.bride);
      setGroom(wedding.groom);
      setDate(wedding.date);
      setVenue(wedding.venue);
      setMessage(wedding.message ?? "");
      setContactEmail(wedding.contact_email ?? "");
      setReviewNotes(wedding.review_notes ?? "");
    }
  }, [wedding]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-warm">
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  const handleSave = async () => {
    await updateWedding.mutateAsync({
      id: id!,
      data: {
        bride,
        groom,
        date,
        venue,
        message: message || null,
        contact_email: contactEmail || null,
      },
    });
    router.back();
  };

  const handleApprove = async () => {
    await approveWedding.mutateAsync(id!);
    router.back();
  };

  const handleReject = async () => {
    await rejectWedding.mutateAsync({ id: id!, notes: reviewNotes });
    setShowReject(false);
    router.back();
  };

  const handleDelete = async () => {
    await deleteWedding.mutateAsync(id!);
    setShowDelete(false);
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-4 max-w-2xl">
        <View className="flex-row items-center gap-3 mb-6">
          <H2>Edit Wedding</H2>
          {wedding && <StatusBadge status={wedding.status} />}
        </View>

        <Input
          label="Bride"
          value={bride}
          onChangeText={setBride}
          placeholder="Bride's name"
        />

        <Input
          label="Groom"
          value={groom}
          onChangeText={setGroom}
          placeholder="Groom's name"
        />

        <Input
          label="Date"
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />

        <Input
          label="Venue"
          value={venue}
          onChangeText={setVenue}
          placeholder="Wedding venue"
        />

        <TextArea
          label="Message"
          value={message}
          onChangeText={setMessage}
          placeholder="Wedding announcement message..."
        />

        <Input
          label="Contact Email"
          value={contactEmail}
          onChangeText={setContactEmail}
          placeholder="contact@example.com"
          keyboardType="email-address"
        />

        {/* Approval Actions */}
        {wedding?.status === "pending" && (
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
                loading={approveWedding.isPending}
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
            loading={updateWedding.isPending}
            disabled={!bride || !groom || !date || !venue}
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
        title="Delete Wedding"
        message="Are you sure you want to delete this wedding? This cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />

      <ConfirmDialog
        visible={showReject}
        title="Reject Wedding"
        message={`Reject this wedding${reviewNotes ? ` with notes: "${reviewNotes}"` : ""}?`}
        confirmLabel="Reject"
        variant="danger"
        onConfirm={handleReject}
        onCancel={() => setShowReject(false)}
      />
    </ScrollView>
  );
}
