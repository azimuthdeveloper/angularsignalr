import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {RealtimeClientService} from "../../services/realtime-client.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthenticationResponse, FoodItem, Order} from "../../model/data";
import {firstValueFrom, Subscription} from "rxjs";
import {JsonPipe, NgOptimizedImage} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthenticationInterceptor} from "../../interceptors/authinterceptor";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    JsonPipe,
    FormsModule,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',

})
export class CustomersComponent implements OnInit, OnDestroy {

  availableFood = signal<Array<FoodItem>>([]);
  activeOrders = signal<Array<Order>>([]);
  activeOrdersSubscription?: Subscription;

  constructor(private realtime: RealtimeClientService, private http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.activeOrdersSubscription?.unsubscribe();
  }

  tableNumber?: number;

  showActiveOrders = false;
  needsLogin = true;
  login?: string;
  password?: string;


  async ngOnInit() {

  }

  async loadOrders() {
    let food = await firstValueFrom(this.http.get<Array<FoodItem>>('http://localhost:4200/api/FoodItems/GetFoodItems'));
    this.availableFood.set([...food]);

    let orders = await firstValueFrom(this.http.get<Array<Order>>('http://localhost:4200/api/Kitchen/GetExistingOrders'));
    this.activeOrders.set([...orders]);

    this.activeOrdersSubscription = this.realtime.ordersUpdated$.subscribe(orders => {
      this.activeOrders.set([...orders]);
    });
  }

  async sendOrder(foodId: number, tableNumber: number) {
    await this.realtime.orderFoodItem(foodId, tableNumber);
  }

  showActiveOrdersToggle() {
    this.showActiveOrders = !this.showActiveOrders;
  }

  async doLogin(login?: string, password?: string) {
    if (login && password) {
      try {
        let response = await firstValueFrom(this.http.post<AuthenticationResponse>('http://localhost:4200/api/Authentication/Login', {
          username: login,
          password: password
        }));
        // debugger;
        sessionStorage.setItem("token", response.token);
        this.needsLogin = false;
        await this.loadOrders();
        this.realtime.connect();
      } catch (e) {
        alert("Incorrect username/password");
      }
    }
  }
}
