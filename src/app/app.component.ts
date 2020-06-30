import { NgxSpinnerService } from 'ngx-spinner';

import { Component, OnInit } from '@angular/core';

import {
    BeverageOrder, BeverageRecipe, CoffeeMachineStatus, CoffeeShopData, IngredientsQuantity
} from './constants/coffee-shop.constants';
import { CoffeeShopService } from './services/coffee-shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Coffee Shop';

  constructor(private coffeeShopService: CoffeeShopService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.coffeeShopService.getCoffeeShopData().subscribe({
      next: (data: CoffeeShopData) => {
        this.loadCoffeeShopData(this.coffeeShopService.dummyData);
        this.spinner.hide();
      },
      error: (error) => {
        this.loadCoffeeShopData(this.coffeeShopService.dummyData);
        this.spinner.hide();
        console.error(error);
      },
    });
  }

  loadCoffeeShopData(data: CoffeeShopData) {
    this.coffeeShopService.coffeeMachineChannels = data?.machine?.outlets?.count_n ?? 1;
    this.coffeeShopService.beverageRecipes = data?.machine?.beverages ?? {};
    this.coffeeShopService.beveragesList = Object.keys(this.coffeeShopService.beverageRecipes) ?? [];
    this.coffeeShopService.ingredientsQuantity = data?.machine?.total_items_quantity ?? {};
    this.coffeeShopService.ingredientsList = Object.keys(this.coffeeShopService.ingredientsQuantity) ?? [];

    // The coffee machine is ready to serve
    this.coffeeShopService.coffeeMachineStatus = CoffeeMachineStatus.IDLE;
  }
}
