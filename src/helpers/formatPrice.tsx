export function formatPrice(price: number) {
  const language = window.location.pathname.includes("/fr") ? "fr-ca" : "en-ca";
  const options = {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return price.toLocaleString(language, options);
}
