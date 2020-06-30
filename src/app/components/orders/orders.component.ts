import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import {
    BeverageOrder, IngredientsQuantity, QueueStatus
} from '../../constants/coffee-shop.constants';
import { CoffeeShopService } from '../../services/coffee-shop.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(public coffeeShopService: CoffeeShopService) { }

  selectedBeverage = null;

  QueueStatus = QueueStatus;

  ngOnInit(): void { }

  isBeverageMakingPossible(beverageName: string) {
    const ingredientsQuantityAvailable: IngredientsQuantity = this.coffeeShopService.ingredientsQuantity;
    const beverageRecipe = this.coffeeShopService.beverageRecipes[beverageName];
    let isPossible = true;

    for (const [ingredientName, quantityRequired] of Object.entries(beverageRecipe)) {
      if (quantityRequired > ingredientsQuantityAvailable[ingredientName]) {
        isPossible = false;
        break;
      }
    }

    return isPossible;
  }

  get beveragesAvailable() {
    return this.coffeeShopService.beveragesList.filter((beverageName: string) => this.isBeverageMakingPossible(beverageName));
  }

  changeSelectedBeverage(event) {
    this.selectedBeverage = this.beveragesAvailable.includes(event.target.value) ? event.target.value : null;
  }

  addOrder() {
    if (this.selectedBeverage && this.isBeverageMakingPossible(this.selectedBeverage)) {
      const ingredientsQuantityAvailable: IngredientsQuantity = this.coffeeShopService.ingredientsQuantity;
      const beverageRecipe = this.coffeeShopService.beverageRecipes[this.selectedBeverage];

      for (const [ingredientName, quantityRequired] of Object.entries(beverageRecipe)) {
        ingredientsQuantityAvailable[ingredientName] -= quantityRequired;
      }

      this.coffeeShopService.lastId += 1;
      this.coffeeShopService.addNewOrderToQueue({
        id: this.coffeeShopService.lastId,
        item: this.selectedBeverage,
        orderPlacedAt: new Date(),
        orderCompletedAt: null
      });


      this.selectedBeverage = null;
    }
  }
}
