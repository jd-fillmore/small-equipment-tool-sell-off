export interface Equipment {
  equipments: [];
  id: string;
  "dealer-name": string;
  "stock-number": string;
  GroupName: string;
  GroupCode: string;
  "product-family-code": string;
  "product-family": string;
  "product-family-display-name": string;
  "manufacturer-code": string;
  manufacturer: string;
  description: string;
  model: string;
  "serial-number": string;
  year: string;
  hours: number;
  city: string;
  state: string;
  sku: string;
  "inspection-link": string;
  certification: string;
  "certification-code": string;
  availability: string;
  "regular-price": {
    currency: string;
    text: string;
  };
  price: {
    currency: string;
    text: string;
  };
  "product-family-categories": {
    category: {
      "category-code": string;
      "category-display-name": string;
    };
  };
  photos: {
    text: string;
  }[];
  classifications: any[];
  specs: any[];
  [key: string]: any;
}

export interface Data {
  equipments: Equipment[];
  id: string;
  "dealer-name": string;
  "stock-number": string;
  GroupName: string;
  GroupCode: string;
  "product-family-code": string;
  "product-family": string;
  "product-family-display-name": string;
  "manufacturer-code": string;
  manufacturer: string;
  description: string;
  model: string;
  "serial-number": string;
  year: string;
  hours: number;
  city: string;
  state: string;
  sku: string;
  "inspection-link": string;
  certification: string;
  "certification-code": string;
  availability: string;
  "regular-price": {
    currency: string;
    text: string;
  };
  price: {
    currency: string;
    text: string;
  };
  "product-family-categories": {
    category: {
      "category-code": string;
      "category-display-name": string;
    };
  };
  photos: {
    text: string;
  }[];
  classifications: any[];
  specs: any[];
}
