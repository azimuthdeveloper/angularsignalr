import { Routes } from '@angular/router';
import {KitchenComponent} from "./pages/kitchen/kitchen.component";
import {CustomersComponent} from "./pages/customers/customers.component";

export const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'kitchen', component: KitchenComponent },
  // Add other routes as needed
];
