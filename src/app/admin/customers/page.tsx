import type { Metadata } from "next";

import { AdminSectionPlaceholder } from "@/components/admin/admin-section-placeholder";

export const metadata: Metadata = {
  title: "Customers",
};

export default function AdminCustomersPage() {
  return (
    <AdminSectionPlaceholder
      title="Customers"
      description="Manage your customer accounts and their order history."
      plannedFeatures={[
        "View all registered customers",
        "Search customers by name, email or phone",
        "See each customer's order history and value",
        "Contact details and saved addresses",
      ]}
    />
  );
}