import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFilterStore from "../../../../../store";
import { Flex, Input } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import "./search.scss";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = useFilterStore((state) => state.searchFilter);

  // Initialize the search filter state with the query parameter on mount
  useEffect(() => {
    const initialSearchValue = searchParams.get("search") || "";
    useFilterStore.setState({ searchFilter: initialSearchValue });
  }, [searchParams]);

  const handleSearchFilter = (e: any) => {
    // Update the filter store state
    useFilterStore.setState({ searchFilter: e.target.value });

    // Update the URL query parameter
    if (e.target.value) {
      searchParams.set("search", e.target.value);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };
  const { t } = useTranslation();
  return (
    <>
      <Flex>
        <Input
          className="search"
          placeholder={t("search")}
          type="text"
          value={searchFilter}
          onChange={handleSearchFilter}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </Flex>
    </>
  );
};
