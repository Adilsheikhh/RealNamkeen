import type { Metadata } from "next";

import { AdminSectionPlaceholder } from "@/components/admin/admin-section-placeholder";

export const metadata: Metadata = {
  title: "Offers",
};

export default function AdminOffersPage() {
  return (
    <AdminSectionPlaceholder
      title="Offers"
      description="Create and manage discounts and promotional offers."
      plannedFeatures={[
        "Percentage and fixed-amount discounts",
        "Offer availability windows",
        "Show offers in the storefront",
        "Bundle and free-delivery offers",
      ]}
    />
  );
}