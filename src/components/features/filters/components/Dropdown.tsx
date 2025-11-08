import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Select } from "@chakra-ui/react";
import { Data } from "../../../../types/types";
import { getCustomPlaceholder } from "../../../../helpers/customPlaceholders";

interface DropdownProps {
  data: Data[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  filterType: string;
}

interface Data {
  [key: string]: any; // Index signature to allow any string key
  // Define other properties with specific types if known
}

export const Dropdown: React.FC<DropdownProps> = ({
  data,
  onChange,
  value,
  filterType,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Ability to make appended URLS shareable
  useEffect(() => {
    // Check if there are existing URL parameters for the current filterType
    const paramValue = searchParams.get(filterType);

    // If there's a value in the URL, update the state and trigger the filter

    if (paramValue) {
      onChange({
        target: {
          value: paramValue,
        },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, []);

  const handleFilters = (e: any) => {
    // Handle the dropdown change
    onChange(e);

    // Update the URL query parameter
    if (e.target.value) {
      searchParams.set(filterType, e.target.value);
    } else {
      searchParams.delete(filterType);
    }
    setSearchParams(searchParams);
  };

  // Filter the data based on the filterType
  const filteredOptions = data.filter((i) => {
    if (filterType === "manufacturer") {
      return i.manufacturer;
    }
    if (filterType === "state") {
      return i.state;
    }
    if (filterType === "city") {
      return i.city;
    }

    return false;
  });

  // Remove duplicate values to show each value only once (e.g., "TX", "Los Angeles") instead of fetching every instance from the API.
  const uniqueValues = new Set<string>();

  for (let i = 0; i < filteredOptions.length; i++) {
    uniqueValues.add(filteredOptions[i][filterType] as string);
  }

  return (
    <>
      <Select
        aria-label="Select"
        placeholder={getCustomPlaceholder(filterType) as string}
        value={value}
        onChange={handleFilters}
      >
        {Array.from(uniqueValues)
          .sort()
          .map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
      </Select>
    </>
  );
};
