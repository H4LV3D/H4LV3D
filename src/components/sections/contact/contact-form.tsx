"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, m } from "motion/react";

import { contactSchema, budgets, type ContactInput } from "@/lib/contact-schema";
import { sendContactMessage } from "@/app/[locale]/contact/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight } from "@/components/illustrations/doodle-icons";
import { Doodle } from "@/components/illustrations/doodle";
import { site } from "@/config/site";
import { ease } from "@/lib/motion";

type FieldKey = "name" | "email" | "message";
type Failure = "error" | "notConfigured" | "rateLimited";

export function ContactForm({ onSent }: { onSent?: () => void }) {
  const t = useTranslations("Contact.form");
  const locale = useLocale();
  const [pending, startTransition] = React.useTransition();
  const [failure, setFailure] = React.useState<Failure | null>(null);
  const [sent, setSent] = React.useState<{ name: string; email: string } | null>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", trap: "" },
  });

  const errorText = (key: FieldKey) => {
    const msg = errors[key]?.message;
    return msg ? t(`errors.${key}`) : undefined;
  };

  const onSubmit = (values: ContactInput) => {
    setFailure(null);
    startTransition(async () => {
      try {
        const result = await sendContactMessage(values, locale);
        switch (result.status) {
          case "success":
            setSent({ name: values.name, email: values.email });
            reset();
            onSent?.();
            break;
          case "invalid": {
            const keys = Object.keys(result.fields).filter((k): k is FieldKey =>
              ["name", "email", "message"].includes(k),
            );
            for (const key of keys) setError(key, { message: key });
            if (keys[0]) setFocus(keys[0]);
            else setFailure("error");
            break;
          }
          case "not-configured":
            setFailure("notConfigured");
            break;
          case "rate-limited":
            setFailure("rateLimited");
            break;
          default:
            setFailure("error");
        }
      } catch {
        // Network failure or a server crash: never leave the visitor guessing.
        setFailure("error");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={pending} className="flex flex-col gap-8">
        <fieldset disabled={pending} className="contents">
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
                <Select value={field.value ?? ""} onValueChange={field.onChange} disabled={pending}>
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

          {/* Honeypot: hidden from people and assistive tech, ignored by password managers. */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="contact-ref">Leave this empty</label>
            <input
              id="contact-ref"
              tabIndex={-1}
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
              data-form-type="other"
              {...register("trap")}
            />
          </div>
        </fieldset>

        <AnimatePresence initial={false}>
          {failure && (
            <m.div
              key={failure}
              role="alert"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: ease.out }}
              className="flex flex-col gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-4"
            >
              <p className="text-base">{t(failure)}</p>
              <a href={`mailto:${site.email}`} className="scribble-underline w-fit text-sm font-medium">
                {t("emailInstead")} · {site.email}
              </a>
            </m.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="xl" disabled={pending} aria-live="polite">
            {pending ? (
              <>
                <Spinner />
                {t("sending")}
              </>
            ) : (
              <>
                {t("submit")}
                <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
              </>
            )}
          </Button>
        </div>
      </form>

      <Dialog open={!!sent} onOpenChange={(open) => !open && setSent(null)}>
        <DialogContent closeLabel={t("close")} className="gap-6 p-8">
          <DialogHeader className="items-start gap-4 text-left">
            <Doodle name="check" className="size-12" draw="mount" />
            <DialogTitle className="text-4xl">{t("sentTitle")}</DialogTitle>
            <DialogDescription className="text-base text-pretty">
              {sent && t("sentBody", { name: sent.name.split(" ")[0], email: sent.email })}
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button onClick={() => setSent(null)}>{t("sendAnother")}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5 animate-spin">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
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
