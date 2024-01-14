export interface IProduct {
  id?: number;
  name: string;
  description: string;
  image: string;
  price: number;

  attributeValueIds: number[];
  categoryIds: number[];
}