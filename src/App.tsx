import { ChakraProvider, Container } from "@chakra-ui/react";
import "@fontsource-variable/montserrat";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../src/services/api/Api";

import { Header } from "./components/shared/header/Header";
import { MainTable } from "./components/shared/Table";

import "../src/styles/typography.scss";
import "../src/styles/general.scss";
import "../src/styles/variables.scss";
import { useEffect } from "react";

function App() {
  // Fetch the data
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (import.meta.env.VITE_ENV === "jobsite") {
      document.body.classList.add("jobsite-env");
    }
  }, []);

  return (
    <>
      <ChakraProvider>
        <Container maxW="1200px">
          {isLoading ? (
            <div>Loading products...</div>
          ) : error ? (
            <div>Error: Failed to load data</div>
          ) : (
            <>
              <Header data={data} isLoading={isLoading} error={error} />
              <MainTable data={data} isLoading={isLoading} error={error} />
            </>
          )}
        </Container>
      </ChakraProvider>
    </>
  );
}

export default App;

if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
}
