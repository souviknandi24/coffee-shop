import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
    BeverageOrder, BeverageRecipe, CoffeeMachineStatus, CoffeeShopData, IngredientsQuantity,
    OrdersList
} from '../constants/coffee-shop.constants';

@Injectable({
  providedIn: 'root'
})
export class CoffeeShopService {
  coffeeMachineStatus = CoffeeMachineStatus.TURNED_OFF;
  ordersList: BeverageOrder[] = [];
  coffeeMachineChannels = 1;
  timeToPrepareBeverage = 5000; // 3 seconds
  beveragesList: string[] = [];
  beverageRecipes: { [key: string]: BeverageRecipe };
  ingredientsQuantity: IngredientsQuantity = {};
  ingredientsList: string[] = [];

  orders: OrdersList = {
    completed: [],
    processing: [],
    inqueue: []
  };

  dummyData: CoffeeShopData =
    {
      machine: {
        outlets: { count_n: 1 },
        beverages:
        {
          hot_tea: { hot_milk: 100, hot_water: 200, sugar_syrup: 10, ginger_syrup: 10, tea_leaves_syrup: 30 },
          black_tea: { hot_water: 300, sugar_syrup: 50, ginger_syrup: 30, tea_leaves_syrup: 30 },
          green_tea: { hot_water: 100, sugar_syrup: 50, ginger_syrup: 30, green_mixture: 30 },
          hot_coffee: { hot_milk: 400, hot_water: 100, sugar_syrup: 50, ginger_syrup: 30, tea_leaves_syrup: 30 }
        },
        total_items_quantity: { hot_milk: 500, hot_water: 500, sugar_syrup: 100, ginger_syrup: 100, tea_leaves_syrup: 50 }
      }
    };
  lastId = 0;

  constructor(private http: HttpClient) { }

  getCoffeeShopData(): Observable<any> {
    return this.http.get('https://api.npoint.io/e8cd5a9bbd1331de326a');
  }

  refillIngredients() {
    this.ingredientsList.forEach((ingredientName: string) => {
      this.ingredientsQuantity[ingredientName] = 500;
    });
  }

  addNewOrderToQueue(order: BeverageOrder) {
    this.orders.inqueue.push(order);
    this.checkAndUpdateProcessingQueue();
  }

  addOrderToProcessing() {
    const order: BeverageOrder = this.orders.inqueue.shift();
    this.orders.processing.push(order);
    this.coffeeMachineStatus = CoffeeMachineStatus.RUNNING;

    setTimeout(() => { this.addOrderToCompleted(order); }, this.timeToPrepareBeverage);
  }

  addOrderToCompleted(orderInProcess: BeverageOrder) {
    const orderIndex: number = this.orders.processing.findIndex((order: BeverageOrder) => order.id === orderInProcess.id);

    if (orderIndex >= 0) {
      this.orders.processing.splice(orderIndex, 1);
      this.orders.completed.push(orderInProcess);
    }

    if (this.orders.processing.length === 0) {
      this.coffeeMachineStatus = CoffeeMachineStatus.IDLE;
    }

    this.checkAndUpdateProcessingQueue();
  }

  checkAndUpdateProcessingQueue() {
    while (this.orders.processing.length < this.coffeeMachineChannels && this.orders.inqueue.length) {
      this.addOrderToProcessing();
    }
  }
}
