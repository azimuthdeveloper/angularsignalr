import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Observable, Subject} from "rxjs";
import {FoodRequest, Order, OrderState} from "../model/data";

@Injectable({
  providedIn: 'root'
})
export class RealtimeClientService {
  private hubConnection?: signalR.HubConnection;
  private pendingFoodUpdatedSubject = new Subject<Order[]>();
  ordersUpdated$: Observable<Order[]> = this.pendingFoodUpdatedSubject.asObservable();

  constructor() {

  }

  connect(){
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:4200/foodhub', {
        withCredentials: sessionStorage.getItem('token') != null,
        accessTokenFactory: () => {
          let token = sessionStorage.getItem('token');
            return token ?? '';
        },
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      }) // Replace with your SignalR hub URL
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch(err => console.error('Error connecting to SignalR hub:', err));

    this.hubConnection.on('PendingFoodUpdated', (orders: Order[]) => {
      this.pendingFoodUpdatedSubject.next(orders);
    });
  }

  async orderFoodItem(foodId: number, table: number) {
    await this.hubConnection?.invoke('OrderFoodItem', {
      foodId,
      table,
    } as FoodRequest);
  }

  async updateFoodItem(orderId: number, state: OrderState) {
    await this.hubConnection?.invoke('UpdateFoodItem', orderId, state);
  }


}
