interface Review {
  user: string;
  name: string;
  rating: number;
  comment: string;
}

interface Item {
  _id: string;
  user: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: Review[];
  qty: number;
}

export { Review, Item };
