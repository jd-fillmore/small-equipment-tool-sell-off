import axios from "axios";

export const fetchProducts = async () => {
  try {
    const isJobsite = import.meta.env.VITE_ENV === "jobsite";

    const urlEn = import.meta.env.VITE_API_URL_EN;
    const urlFr = import.meta.env.VITE_API_URL_FR;

    // if URL contains /fr, load in FR API
    // else, load in EN API
    const urlParts = window.location.pathname.split("/");
    const mainUrl = urlParts.includes("fr") ? urlFr : urlEn;

    const response = await axios.get(mainUrl);
    const products = response.data.groups;
    console.log(
      `Fetched data for ${isJobsite ? "Jobsite" : "Battlefield"}:`,
      products
    );
    return products;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
