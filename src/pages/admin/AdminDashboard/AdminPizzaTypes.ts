export interface Pizza {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: number | null;
  types: number[];
  sizes: number[];
  rating: number;
  description: string;

}