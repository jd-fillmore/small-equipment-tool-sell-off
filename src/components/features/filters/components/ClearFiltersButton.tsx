import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface ClearButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ClearButton = ({ onClick }: ClearButtonProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Button onClick={onClick}>{t("clear")}</Button>
    </>
  );
};
