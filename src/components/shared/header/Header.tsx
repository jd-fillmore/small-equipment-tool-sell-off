import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFilterStore from "../../../store";
import { Data } from "../../../types/types";
import { Dropdown } from "../../features/filters/components/Dropdown";
import { Search } from "../../features/filters/components/search/Search";
import { PriceRange } from "../../features/filters/components/PriceRange";
import { ClearButton } from "../../features/filters/components/ClearFiltersButton";

import "./header.scss";
import { Grid } from "@chakra-ui/react";

interface HeaderProps {
  data: Data[];
  isLoading: boolean;
  error: any;
}

export const Header = ({ data, isLoading, error }: HeaderProps) => {
  // If data is loading/errors, show responses
  if (isLoading) {
    return (
      <p className="header-loading">Loading header data, please wait...</p>
    );
  }

  if (error) {
    return <p>There's been an error!</p>;
  }

  // Bring in global state
  const {
    manufacturerDropdownFilter,
    provinceDropdownFilter,
    cityDropdownFilter,
    priceRangeFilter,
  } = useFilterStore();

  const filteredData = data.map((group) => group.equipments).flat();

  console.log("filtered data from header component:", filteredData);

  const handleDropdownFilterManufacturer = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    useFilterStore.setState({ manufacturerDropdownFilter: e.target.value });
  };

  const handleDropdownFilterProvince = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    useFilterStore.setState({ provinceDropdownFilter: e.target.value });
    // Filter the data based on the selected province
    const filteredCitiesSet = new Set<string>(
      filteredData
        .filter((item) => item.state === e.target.value)
        .map((item) => item.city)
    );

    const filteredCities = Array.from(filteredCitiesSet);

    useFilterStore.setState({ cityDropdownFilter: "" });
  };

  const handleDropdownFilterCity = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    useFilterStore.setState({ cityDropdownFilter: e.target.value });
  };

  const handlePriceRangeFilter = (value: number | null | undefined) => {
    useFilterStore.setState({ priceRangeFilter: value });
  };

  // Calculate the min price based on the smallest price value from API
  const minPrice = Math.min(
    ...data.map((i) =>
      Math.min(...i.equipments.map((item) => parseFloat(item["price"].text)))
    )
  );

  // Calculate the max price based on the largest price value from API
  const maxPrice = Math.max(
    ...data.map((i) =>
      Math.max(...i.equipments.map((item) => parseFloat(item["price"].text)))
    )
  );

  const [_searchParams, setSearchParams] = useSearchParams();

  // On click of clear button, update the zustand store states for all filters
  // and clear URL
  const handleClearFilter = () => {
    // Clear Zustand store states
    useFilterStore.setState({
      searchFilter: "",
      manufacturerDropdownFilter: "",
      provinceDropdownFilter: "",
      cityDropdownFilter: "",
      currentPage: 0,
      priceRangeFilter: null,
    });

    // Clear query parameters
    setSearchParams(new URLSearchParams());
  };

  // On load of /fr, filter to QC upfront
  useEffect(() => {
    const url = window.location.href;

    // On load, if the environment is both French and Battlefield, adjust url to add '?state=QC'
    if (url.includes("/fr") && import.meta.env.VITE_ENV === "battlefield") {
      // Set the province dropdown filter state to 'QC'
      useFilterStore.setState({ provinceDropdownFilter: "QC" });
    }
  }, []);

  return (
    <>
      {/* <p className="intro">
        Small Equipment & Tool Sell-Off only applies to the serial numbers
        indicated. No substitutions, exchanges or returns. F.O.B current
        location. All sales are final. Applicable taxes are not included.
        Pricing and availability are subject to change.
      </p> */}
      <section className="header-area">
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)", // For screens below 768px (default Chakra UI base breakpoint)
            md: "repeat(6, 1fr)", // For screens 768px and above
          }}
          gap={6}
          alignItems="center"
        >
          <Search />
          <Dropdown
            data={filteredData}
            value={manufacturerDropdownFilter}
            onChange={handleDropdownFilterManufacturer}
            filterType="manufacturer"
          />
          <Dropdown
            data={filteredData}
            value={provinceDropdownFilter}
            onChange={handleDropdownFilterProvince}
            filterType="state"
          />
          {/* // Filter the data for the City dropdown based on whether a Province is selected.
          // If a Province is selected, only show cities belonging to that Province.
          // Otherwise, show all cities from the filtered data. */}

          <Dropdown
            data={
              provinceDropdownFilter
                ? filteredData.filter(
                    (item) => item.state === provinceDropdownFilter
                  )
                : filteredData
            }
            value={cityDropdownFilter}
            onChange={handleDropdownFilterCity}
            filterType="city"
          />
          <PriceRange
            value={priceRangeFilter}
            onChange={handlePriceRangeFilter}
            min={minPrice}
            max={maxPrice}
          />
          <ClearButton onClick={handleClearFilter} />
        </Grid>
      </section>
    </>
  );
};
