"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { site } from "@/config/site";

export function useCopyEmail() {
  const t = useTranslations("Common");
  return React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      toast(t("copied"), { description: site.email });
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }, [t]);
}
