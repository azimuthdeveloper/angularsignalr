export interface FoodItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface FoodList {
  items: FoodItem[];
}

export interface Order {
  id: number;
  tableNumber: number;
  foodItemId: number;
  foodItem: FoodItem;
  orderDate: Date; // Using Date for DateTimeOffset
  orderState: OrderState;
}

export enum OrderState {
  Ordered = 'Ordered',
  Preparing = 'Preparing',
  AwaitingDelivery = 'AwaitingDelivery',
  Completed = 'Completed'
}

export interface FoodRequest{
  table: number,
  foodId: number,
}

export interface AuthenticationResponse{
  token: string,
}
