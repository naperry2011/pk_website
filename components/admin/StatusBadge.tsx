import { View, Text } from "react-native";
import type { ApprovalStatus } from "@/lib/database.types";

const statusStyles: Record<ApprovalStatus, string> = {
  pending: "bg-gold",
  approved: "bg-green-deep",
  rejected: "bg-red-kente",
};

const statusLabels: Record<ApprovalStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

interface StatusBadgeProps {
  status: ApprovalStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <View
      className={`px-3 py-1 rounded-full self-start ${statusStyles[status]}`}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${statusLabels[status]}`}
    >
      <Text className="font-body-medium text-xs text-white">
        {statusLabels[status]}
      </Text>
    </View>
  );
}
