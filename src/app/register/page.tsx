import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a Real Foods account to track orders and check out faster.",
};

export default function RegisterPage() {
  return (
    <div className="container-page flex justify-center py-12 sm:py-20">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <AuthForm mode="register" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}