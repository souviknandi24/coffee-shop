import { Component, Input, OnInit } from '@angular/core';

import { BeverageOrder, QueueStatus } from '../../../constants/coffee-shop.constants';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order: BeverageOrder;
  @Input() queueStatus: QueueStatus;

  QueueStatus = QueueStatus;

  constructor() { }

  ngOnInit(): void { }
}
