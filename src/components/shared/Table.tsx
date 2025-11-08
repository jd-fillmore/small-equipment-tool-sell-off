import { useMemo, useEffect, useState } from "react";
import useFilterStore from "../../store";
import { Data, Equipment } from "../../types/types";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Pagination } from "./pagination/Pagination";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../helpers/formatPrice";

import "../shared/table.scss";

interface MainTableProps {
  data: Data[];
  isLoading: boolean;
  error: any;
}

export const MainTable = ({ data, isLoading, error }: MainTableProps) => {
  // Set number of items to show per page
  const itemsPerPage = 50;

  if (isLoading && !window.location.href.includes("/fr")) {
    return <p className="table-loading">Loading table data, please wait...</p>;
  } else if (isLoading && window.location.href.includes("/fr")) {
    return (
      <p className="table-loading">
        Chargement des données du tableau, veuillez patienter...
      </p>
    );
  }

  if (error) {
    return <p>There's been an error!</p>;
  }

  // Bring in items from Zustand store
  const {
    searchFilter,
    manufacturerDropdownFilter,
    provinceDropdownFilter,
    cityDropdownFilter,
    currentPage,
    setCurrentPage,
    priceRangeFilter,
  } = useFilterStore();

  // Create search filter
  const filteredSearch = (item: any) =>
    item.model.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.manufacturer.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item["product-family-display-name"]
      .toLowerCase()
      .includes(searchFilter.toLowerCase()) ||
    item["serial-number"].toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.state.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.city.toLowerCase().includes(searchFilter.toLowerCase());

  // Sorting logic

  const [order, setOrder] = useState<string>("ASC");
  const [sortColumn, setSortColumn] = useState<string>("ASC");

  // Handle sorting logic on click
  const handleHeaderClick = (col) => {
    if (order === "ASC") {
      setOrder("DSC");
    } else {
      setOrder("ASC");
    }
    setSortColumn(col);
    console.log("order changed");
  };

  // Search, dropdown, header sorting and price range filters functionality and working in conjunction
  const filteredData = useMemo(() => {
    const filteredEquipment = data
      .map((group) => group.equipments) // Map over the parent array as it has nested children arrays with all data containing
      .flat() // Combine all chidren into one combined array
      .filter(
        // Filter over the new, combined array
        (item: any) =>
          filteredSearch(item) &&
          (manufacturerDropdownFilter === "" ||
            item.manufacturer === manufacturerDropdownFilter) &&
          (provinceDropdownFilter === "" ||
            item.state === provinceDropdownFilter) &&
          (cityDropdownFilter === "" || item.city === cityDropdownFilter) &&
          (priceRangeFilter === null ||
            priceRangeFilter === undefined ||
            Number(item["price"].text) <= priceRangeFilter)
      );

    // Sorting logic
    if (sortColumn === "regular-price" || sortColumn === "price") {
      // Sorting for price columns
      if (order === "ASC") {
        filteredEquipment.sort((a, b) => {
          const priceA = parseFloat(a[sortColumn]?.text);
          const priceB = parseFloat(b[sortColumn]?.text);
          return priceA > priceB ? 1 : -1;
        });
      } else {
        filteredEquipment.sort((a, b) => {
          const priceA = parseFloat(a[sortColumn]?.text);
          const priceB = parseFloat(b[sortColumn]?.text);
          return priceA < priceB ? 1 : -1;
        });
      }
    } else {
      // Sorting for non-price columns
      if (order === "ASC") {
        filteredEquipment.sort((a, b) =>
          a[sortColumn] > b[sortColumn] ? 1 : -1
        );
      } else {
        filteredEquipment.sort((a, b) =>
          a[sortColumn] < b[sortColumn] ? 1 : -1
        );
      }
    }

    return filteredEquipment;
  }, [
    data,
    searchFilter,
    manufacturerDropdownFilter,
    provinceDropdownFilter,
    cityDropdownFilter,
    priceRangeFilter,
    order,
    sortColumn,
  ]);
  const { t } = useTranslation();
  // Reset the current page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [
    searchFilter,
    manufacturerDropdownFilter,
    provinceDropdownFilter,
    cityDropdownFilter,
    priceRangeFilter,
  ]);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = useMemo(
    () => filteredData.slice(offset, offset + itemsPerPage),
    [filteredData, currentPage]
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  if (!currentPageData || currentPageData.length === 0) {
    return <p>{t("matches")}</p>;
  }

  console.log("filtered table data", filteredData);
  console.log("price range filter", priceRangeFilter);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th onClick={() => handleHeaderClick("manufacturer")}>
                {t("manu")}
                {order === "ASC" && (
                  <span
                    className={`asc ${
                      sortColumn === "manufacturer" ? "active" : ""
                    }`}
                  >
                    ▲
                  </span>
                )}
                {order === "DSC" && (
                  <span
                    className={`dsc ${
                      sortColumn === "manufacturer" ? "active" : ""
                    }`}
                  >
                    ▼
                  </span>
                )}
              </Th>
              <Th onClick={() => handleHeaderClick("model")}>
                {t("model")}
                {order === "ASC" && (
                  <span
                    className={`asc ${sortColumn === "model" ? "active" : ""}`}
                  >
                    ▲
                  </span>
                )}
                {order === "DSC" && (
                  <span
                    className={`dsc ${sortColumn === "model" ? "active" : ""}`}
                  >
                    ▼
                  </span>
                )}
              </Th>
              <Th
                onClick={() => handleHeaderClick("product-family-display-name")}
              >
                {t("desc")}
                {order === "ASC" && (
                  <span
                    className={`asc ${
                      sortColumn === "product-family-display-name"
                        ? "active"
                        : ""
                    }`}
                  >
                    ▲
                  </span>
                )}
                {order === "DSC" && (
                  <span
                    className={`dsc ${
                      sortColumn === "product-family-display-name"
                        ? "active"
                        : ""
                    }`}
                  >
                    ▼
                  </span>
                )}
              </Th>
              <Th onClick={() => handleHeaderClick("serial-number")}>
                {t("serial")}
                {order === "ASC" && (
                  <span
                    className={`asc ${
                      sortColumn === "serial-number" ? "active" : ""
                    }`}
                  >
                    ▲
                  </span>
                )}
                {order === "DSC" && (
                  <span
                    className={`dsc ${
                      sortColumn === "serial-number" ? "active" : ""
                    }`}
                  >
                    ▼
                  </span>
                )}
              </Th>
              <Th onClick={() => handleHeaderClick("state")}>
                {t("prov")}
                {order === "ASC" && (
                  <span
                    className={`asc ${sortColumn === "state" ? "active" : ""}`}
                  >
                    ▲
                  </span>
                )}
                {order === "DSC" && (
                  <span
                    className={`dsc ${sortColumn === "state" ? "active" : ""}`}
                  >
                    ▼
                  </span>
                )}
              </Th>
              <Th onClick={() => handleHeaderClick("city")}>
                {t("city")}
                {order === "ASC" && (
                  <span
                    className={`asc ${sortColumn === "city" ? "active" : ""}`}
                  >
                    ▲
                  </span>
                )}
                {order === "DSC" && (
                  <span
                    className={`dsc ${sortColumn === "city" ? "active" : ""}`}
                  >
                    ▼
                  </span>
                )}
              </Th>
              <Th
                onClick={() => handleHeaderClick("regular-price")}
                className="align-right"
              >
                {t("regPrice")}
                {order === "ASC" && (
                  <span
                    className={`asc ${
                      sortColumn === "regular-price" ? "active" : ""
                    }`}
                  >
                    ▲
                  </span>
                )}
                {order === "DSC" && (
                  <span
                    className={`dsc ${
                      sortColumn === "regular-price" ? "active" : ""
                    }`}
                  >
                    ▼
                  </span>
                )}
              </Th>
              <Th
                onClick={() => handleHeaderClick("price")}
                className="align-right sale-header"
              >
                {t("salePrice")}
                {order === "ASC" && (
                  <span
                    className={`asc ${sortColumn === "price" ? "active" : ""}`}
                  >
                    ▲
                  </span>
                )}
                {order === "DSC" && (
                  <span
                    className={`dsc ${sortColumn === "price" ? "active" : ""}`}
                  >
                    ▼
                  </span>
                )}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentPageData.map((equipment: Equipment) => (
              <Tr key={equipment.id}>
                {/* If manufacturer or model has a blank API value, show N/A */}
                <Td>
                  {equipment.manufacturer.length > 0
                    ? equipment.manufacturer
                    : "N/A"}
                </Td>
                {/* Some models have a blank API value of more than 1 space */}
                <Td>{equipment.model.length > 1 ? equipment.model : "N/A"}</Td>
                <Td>{equipment["product-family-display-name"]}</Td>
                <Td>{equipment["serial-number"]}</Td>
                <Td>{equipment.state}</Td>
                <Td>
                  {/* If any locations have a space in them, add a hyphen to properly link to website location pages */}
                  {import.meta.env.VITE_ENV === "battlefield" ? (
                    <a
                      target="_blank"
                      href={`https://battlefieldequipment.ca/locations/${
                        equipment.city.indexOf(" ")
                          ? equipment.city.replace(/\s/g, "-")
                          : equipment.city
                      }`}
                    >
                      {equipment.city}
                    </a>
                  ) : (
                    <a
                      target="_blank"
                      href="https://jobsiteequipment.ca/locations/"
                    >
                      {equipment.city}
                    </a>
                  )}
                </Td>
                <Td className="align-right reg-price">
                  {formatPrice(Number(equipment["regular-price"]?.text))}
                </Td>
                <Td className="align-right sale-price">
                  <strong>
                    {formatPrice(Number(equipment["price"]?.text))}
                  </strong>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};
