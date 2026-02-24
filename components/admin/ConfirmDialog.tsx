import { View, Text, Pressable, Modal } from "react-native";
import { Button } from "@/components/ui/Button";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  variant?: "danger" | "default";
}

export function ConfirmDialog({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  variant = "default",
}: ConfirmDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        onPress={onCancel}
        className="flex-1 bg-black/50 items-center justify-center p-4"
        accessibilityRole="button"
        accessibilityLabel="Close dialog"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-white rounded-xl p-6 w-full max-w-[400px] shadow-lg"
          accessibilityRole="alert"
        >
          <Text className="font-heading-bold text-lg text-gray-charcoal mb-2">
            {title}
          </Text>
          <Text className="font-body text-base text-gray-charcoal/70 mb-6">
            {message}
          </Text>
          <View className="flex-row gap-3 justify-end">
            <Button title="Cancel" onPress={onCancel} variant="outline" />
            <Button
              title={confirmLabel}
              onPress={onConfirm}
              variant={variant === "danger" ? "danger" : "primary"}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
