import { create } from "zustand";
import zukeeper from "zukeeper";

interface FilterState {
  searchFilter: string;
  manufacturerDropdownFilter: string;
  provinceDropdownFilter: string;
  cityDropdownFilter: string;
  filteredCities: string[];
  currentPage: number;
  priceRangeFilter: number | null;
  clearFilter: string;
  setSearchFilter: (value: string) => void;
  setManufacturerDropdownFilter: (value: string) => void;
  setProvinceDropdownFilter: (value: string) => void;
  setCityDropdownFilter: (value: string) => void;
  setFilteredCities: (value: string[]) => void;
  setCurrentPage: (page: number) => void;
  setPriceRange: (value: number) => void;
  setClearFilter: (value: string) => void;
}

const useFilterStore = create<FilterState>(
  zukeeper((set: any) => ({
    searchFilter: "",
    manufacturerDropdownFilter: "",
    provinceDropdownFilter: "",
    cityDropdownFilter: "",
    filteredCities: [],
    currentPage: 0,
    priceRangeFilter: null,
    clearFilter: "",
    setSearchFilter: (value: string) => set({ searchFilter: value }),
    setManufacturerDropdownFilter: (value: string) =>
      set({ manufacturerDropdownFilter: value }),
    setProvinceDropdownFilter: (value: string) =>
      set({ provinceDropdownFilter: value }),
    setCityDropdownFilter: (value: string) =>
      set({ cityDropdownFilter: value }),
    setFilteredCitiesFilter: (value: string[]) =>
      set({ filteredCities: value }),
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setPriceRange: (value: number) => set({ priceRangeFilter: value }),
    setClearFilter: (value: string) => set({ clearFilter: value }),
  }))
);

// Assign the store to window.store for debugging
if (process.env.NODE_ENV === "development") {
  (window as any).store = useFilterStore;
}

export default useFilterStore;
