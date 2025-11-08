import Slider from "rc-slider";
import { Input, Flex } from "@chakra-ui/react";
import "rc-slider/assets/index.css";
import { useTranslation } from "react-i18next";

interface PriceRangeProps {
  value: any;
  min: number;
  max: number;
  onChange: any;
}

export const PriceRange = ({ value, min, max, onChange }: PriceRangeProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  // Calculate an initial value within the valid range
  const initialValue = Math.max(min, Math.min(max, value));
  const { t } = useTranslation();

  return (
    <>
      <Flex direction="column">
        <Input
          aria-label="Price"
          value={value === null ? t("price") : value.toLocaleString()}
          onChange={handleInputChange}
        />
        <Slider
          ariaLabelForHandle={"Price Range Slider"}
          value={value === null ? initialValue : value}
          onChange={onChange}
          min={min}
          max={max}
        />
      </Flex>
    </>
  );
};
