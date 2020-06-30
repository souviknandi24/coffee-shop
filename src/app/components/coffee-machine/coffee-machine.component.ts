import { Component, Input, OnInit } from '@angular/core';

import { CoffeeMachineStatus } from '../../constants/coffee-shop.constants';
import { CoffeeShopService } from '../../services/coffee-shop.service';

@Component({
  selector: 'app-coffee-machine',
  templateUrl: './coffee-machine.component.html',
  styleUrls: ['./coffee-machine.component.scss']
})
export class CoffeeMachineComponent implements OnInit {
  constructor(public coffeeMachineService: CoffeeShopService) { }

  get isCoffeeMachineRunning() {
    return this.coffeeMachineService.coffeeMachineStatus === CoffeeMachineStatus.RUNNING;
  }

  ngOnInit(): void {
  }
}
