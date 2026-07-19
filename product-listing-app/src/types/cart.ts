export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}