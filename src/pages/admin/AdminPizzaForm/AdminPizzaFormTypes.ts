 export interface PizzaForm {
    title: string;
    price: number;
    imageUrl: string;
    category: number | null;
    types: number[];
    sizes: number[];
    description: string;
    rating?: number;
  };