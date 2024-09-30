export interface Product {
  id: string;
  productName: string;
  price: number;
  boughtDate: string;
}

export interface Meta {
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface MockData {
  meta: Meta;
  products: Product[];
}
