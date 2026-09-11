import type { Metadata } from "next";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { listProducts } from "@/lib/db/products";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage Real Foods products.",
};

export default async function AdminProductsPage() {
  const products = await listProducts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-stone-900">
            Products
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Live catalogue from the database.
          </p>
        </div>
        <Badge tone="amber">{products.length} products</Badge>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="bg-stone-50 text-stone-500">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Sizes</th>
                <th className="px-5 py-3 text-right font-medium">From</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((product) => {
                const from = Math.min(
                  ...product.variants.map((v) => v.price),
                );
                const inStock = product.variants.some((v) => v.inStock);
                return (
                  <tr key={product.id} className="transition-colors hover:bg-stone-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                          {product.images[0] && (
                            <Image
                              src={product.images[0].url}
                              alt={product.images[0].alt}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          )}
                        </span>
                        <div>
                          <p className="font-medium text-stone-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-stone-400">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 capitalize text-stone-600">
                      {product.categorySlug}
                    </td>
                    <td className="px-5 py-4 text-stone-600">
                      {product.variants.map((v) => v.size).join(", ")}
                    </td>
                    <td className="px-5 py-4 text-right font-medium text-stone-900">
                      {formatPrice(from)}
                    </td>
                    <td className="px-5 py-4">
                      <Badge tone={inStock ? "green" : "red"}>
                        {inStock ? "Active" : "Out of stock"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}