import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl font-semibold text-amber-700">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-stone-900">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-stone-500">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}