import type { Metadata } from "next";

import { AdminSectionPlaceholder } from "@/components/admin/admin-section-placeholder";

export const metadata: Metadata = {
  title: "Settings",
};

export default function AdminSettingsPage() {
  return (
    <AdminSectionPlaceholder
      title="Settings"
      description="Configure store content, contact details and business information."
      plannedFeatures={[
        "Store name, logo and contact details",
        "Delivery charges and free-delivery threshold",
        "Business address and hours",
        "Website content editing",
      ]}
    />
  );
}