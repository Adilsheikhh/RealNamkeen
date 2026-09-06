"use client";

import { useState } from "react";
import { Loader2, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Placeholder — message storage is implemented in a later stage.
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 700);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl bg-green-50 p-6 text-green-900">
        <MessageSquare className="size-6" />
        <h2 className="font-display text-lg font-semibold">Message received</h2>
        <p className="text-sm">
          Thanks for reaching out! We&apos;ll get back to you soon. (This shows a
          mock confirmation — messages are not stored yet.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" name="name" required autoComplete="name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-phone">Phone (optional)</Label>
        <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" name="message" required rows={5} />
      </div>
      <Button type="submit" size="lg" className="self-start" disabled={sending}>
        {sending && <Loader2 className="animate-spin" />}
        Send message
      </Button>
    </form>
  );
}