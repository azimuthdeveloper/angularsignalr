import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {Order, OrderState} from "../../model/data";
import {RealtimeClientService} from "../../services/realtime-client.service";
import {DatePipe, JsonPipe} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {firstValueFrom, Subscription} from "rxjs";
import {FormsModule} from "@angular/forms";
import {AuthenticationInterceptor} from "../../interceptors/authinterceptor";

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [
    JsonPipe,
    HttpClientModule,
    DatePipe,
    FormsModule,
  ],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css',
  providers: [AuthenticationInterceptor]
})
export class KitchenComponent implements OnInit, OnDestroy{

  foodStates = ['Ordered', 'Preparing', 'AwaitingDelivery', 'Completed'];

  orderSubscription: Subscription | undefined;
  orders = signal<Order[]>([]);
  constructor(private realtime: RealtimeClientService, private http: HttpClient) {
  }



  async ngOnInit() {
    this.realtime.connect();
    let existingOrders = await firstValueFrom(this.http.get<Array<Order>>('http://localhost:4200/api/Kitchen/GetExistingOrders'));
    this.orders.set([...existingOrders]);
    this.orderSubscription = this.realtime.ordersUpdated$.subscribe(x => this.orders.set([...x]));
  }

  ngOnDestroy(): void {
    this.orderSubscription?.unsubscribe();
  }

  async updateState(id: number, $event: Event) {
    let value = ($event.target as HTMLSelectElement)?.value;
    await this.realtime.updateFoodItem(id, value as OrderState);
  }
}
