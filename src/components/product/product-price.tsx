import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
};

export function ProductPrice({
  price,
  originalPrice,
  className,
  size = "md",
}: ProductPriceProps) {
  const hasSale = originalPrice != null && originalPrice > price;

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span
        className={cn("font-semibold text-stone-900", sizeClasses[size])}
      >
        {formatPrice(price)}
      </span>
      {hasSale && (
        <span className="text-sm text-stone-400 line-through">
          {formatPrice(originalPrice!)}
        </span>
      )}
    </div>
  );
}
