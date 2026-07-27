export interface CartItem {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}