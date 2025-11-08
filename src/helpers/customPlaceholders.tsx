import { useTranslation } from "react-i18next";

export function getCustomPlaceholder(filterType: any) {
  const { t } = useTranslation();
  if (filterType === "manufacturer") {
    return <>{t("manu")}</>;
  }
  if (filterType === "state") {
    return <>{t("prov")}</>;
  }
  if (filterType === "city") {
    return <>{t("city")}</>;
  }
  return "Select option";
}
