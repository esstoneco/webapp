import { useCallback } from "react";
import { useTranslation } from "react-i18next";

// Translate display strings while leaving IDs, filter values, form values and
// React elements unchanged. English source copy is the key in each locale file.
export function useText() {
  const { t } = useTranslation();
  return useCallback(<T,>(value: T): T extends string ? string : T => {
    const translated = typeof value === "string"
      ? t(value, { defaultValue: value }) : value;
    return translated as T extends string ? string : T;
  }, [t]);
}
