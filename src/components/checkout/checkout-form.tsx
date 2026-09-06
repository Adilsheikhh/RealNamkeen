"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  line1: z.string().min(1, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Enter a valid pincode"),
  note: z.string().optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const { lines, subtotal, deliveryCharge, total } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      line2: "",
      note: "",
    },
  });

  async function onSubmit() {
    // Placeholder — order persistence and payment added in a later stage.
    await new Promise((r) => setTimeout(r, 700));
    router.push("/order-confirmation/rf-mock-order-1");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
        noValidate
      >
        <h2 className="font-display text-xl font-semibold text-stone-900">
          Delivery details
        </h2>

        <div className="mt-6 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" error={errors.firstName?.message}>
              <Input {...register("firstName")} autoComplete="given-name" />
            </Field>
            <Field label="Last name" error={errors.lastName?.message}>
              <Input {...register("lastName")} autoComplete="family-name" />
            </Field>
          </div>

          <Field label="Phone" error={errors.phone?.message}>
            <Input {...register("phone")} type="tel" autoComplete="tel" inputMode="numeric" placeholder="10-digit mobile number" />
          </Field>

          <Field label="Address line 1" error={errors.line1?.message}>
            <Input {...register("line1")} autoComplete="address-line1" placeholder="House no, street, area" />
          </Field>

          <Field label="Address line 2 (optional)" error={errors.line2?.message}>
            <Input {...register("line2")} autoComplete="address-line2" />
          </Field>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="City" error={errors.city?.message}>
              <Input {...register("city")} autoComplete="address-level2" />
            </Field>
            <Field label="State" error={errors.state?.message}>
              <Input {...register("state")} autoComplete="address-level1" />
            </Field>
            <Field label="Pincode" error={errors.pincode?.message}>
              <Input {...register("pincode")} autoComplete="postal-code" inputMode="numeric" />
            </Field>
          </div>

          <Field label="Order note (optional)" error={errors.note?.message}>
            <Textarea {...register("note")} placeholder="Any instructions for your order" />
          </Field>
        </div>

        {lines.length === 0 && (
          <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
            Your cart is empty. Add some products before proceeding to checkout.
          </p>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-6">
          <p className="text-sm text-stone-500">
            Paying by cash on delivery after confirm.
          </p>
          <Button type="submit" size="lg" disabled={isSubmitting || lines.length === 0}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            Place order
          </Button>
        </div>
        <p className="mt-4 text-xs text-stone-400">
          Checkout is a frontend placeholder in this build — payment and order
          storage are implemented in a later stage.
        </p>
      </form>

      <div className="h-fit rounded-2xl border border-stone-200 bg-stone-50 p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-semibold text-stone-900">
          Order summary
        </h2>
        <ul className="mt-4 divide-y divide-stone-200 text-sm">
          {lines.map((line) => (
            <li key={line.variantId} className="flex justify-between gap-4 py-3">
              <span className="text-stone-600">
                {line.productName}{" "}
                <span className="text-stone-400">× {line.quantity}</span>
              </span>
              <span className="font-medium text-stone-900">
                ₹{line.unitPrice * line.quantity}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-stone-200 pt-4 text-sm">
          <div className="flex justify-between text-stone-600">
            <dt>Subtotal</dt>
            <dd>₹{subtotal}</dd>
          </div>
          <div className="flex justify-between text-stone-600">
            <dt>Delivery</dt>
            <dd>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</dd>
          </div>
          <div className="flex justify-between pt-2 text-base font-semibold text-stone-900">
            <dt>Total</dt>
            <dd>₹{total}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
      {error && (
        <p className={cn("text-xs font-medium text-red-600", !error && "sr-only")}>
          {error}
        </p>
      )}
    </div>
  );
}