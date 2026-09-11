import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { listCustomers } from "@/lib/db/orders";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Customers",
  description: "Manage Real Foods customer accounts.",
};

export default async function AdminCustomersPage() {
  const customers = await listCustomers();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-stone-900">Customers</h2>
      <p className="mt-1 text-sm text-stone-500">
        Registered accounts and their order value.
      </p>

      {customers.length === 0 && (
        <div className="mt-5 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-sm text-stone-500">
          <p className="font-medium text-stone-700">No customers yet</p>
          <p className="mt-1">Customer sign-ups will appear here.</p>
        </div>
      )}

      {customers.length > 0 && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="bg-stone-50 text-stone-500">
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 text-center font-medium">Orders</th>
                  <th className="px-5 py-3 text-right font-medium">Total spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="transition-colors hover:bg-stone-50">
                    <td className="px-5 py-4">
                      <p className="font-medium text-stone-900">{customer.name}</p>
                      <p className="text-xs text-stone-400">
                        Joined{" "}
                        {new Date(customer.joinedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-stone-600">{customer.email}</td>
                    <td className="px-5 py-4 text-stone-600">
                      {customer.phone ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Badge tone="amber">{customer.orderCount}</Badge>
                    </td>
                    <td className="px-5 py-4 text-right font-medium text-stone-900">
                      {formatPrice(customer.totalSpent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}