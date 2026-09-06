import type { Metadata } from "next";

import { AdminSectionPlaceholder } from "@/components/admin/admin-section-placeholder";

export const metadata: Metadata = {
  title: "Messages",
};

export default function AdminMessagesPage() {
  return (
    <AdminSectionPlaceholder
      title="Messages"
      description="Inbox for customer enquiries sent from the contact page."
      plannedFeatures={[
        "Receive messages from the contact form",
        "Mark messages as read / replied",
        "Customer contact details at a glance",
      ]}
    />
  );
}