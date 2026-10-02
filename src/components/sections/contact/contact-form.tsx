"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { contactSchema, budgets, type ContactInput } from "@/lib/contact-schema";
import { sendContactMessage } from "@/app/[locale]/contact/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/illustrations/doodle-icons";
import { site } from "@/config/site";

type FieldKey = "name" | "email" | "message";

export function ContactForm({ onSent }: { onSent?: () => void }) {
  const t = useTranslations("Contact.form");
  const [pending, startTransition] = React.useTransition();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const errorText = (key: FieldKey) => {
    const msg = errors[key]?.message;
    return msg ? t(`errors.${key}`) : undefined;
  };

  const onSubmit = (values: ContactInput) =>
    startTransition(async () => {
      const result = await sendContactMessage(values);
      switch (result.status) {
        case "success":
          toast(t("success"));
          reset();
          onSent?.();
          break;
        case "invalid":
          for (const key of Object.keys(result.fields) as FieldKey[]) setError(key, { message: key });
          break;
        case "not-configured":
          toast(t("notConfigured"), { description: site.email });
          break;
        default:
          toast(t("error"), { description: site.email });
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Field id="name" label={t("name")} error={errorText("name")}>
          <Input
            id="name"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
        </Field>
        <Field id="email" label={t("email")} error={errorText("email")}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <Field id="budget" label={t("budget")}>
        <Controller
          control={control}
          name="budget"
          render={({ field }) => (
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger id="budget">
                <SelectValue placeholder={t("budgetPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {budgets.map((b) => (
                  <SelectItem key={b} value={b}>
                    {t(`budgets.${b}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field id="message" label={t("message")} error={errorText("message")}>
        <Textarea
          id="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div>
        <Button type="submit" size="xl" disabled={pending}>
          {pending ? t("sending") : t("submit")}
          <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="font-hand text-lg text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
