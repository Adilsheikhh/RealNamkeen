import type { Metadata } from "next";

import { AdminSectionPlaceholder } from "@/components/admin/admin-section-placeholder";

export const metadata: Metadata = {
  title: "Inventory",
};

export default function AdminInventoryPage() {
  return (
    <AdminSectionPlaceholder
      title="Inventory"
      description="Track stock levels across products and variants."
      plannedFeatures={[
        "Live stock counts per product variant",
        "Low-stock alerts",
        "Restock notes and batch tracking",
        "Adjust stock from the dashboard",
      ]}
    />
  );
}