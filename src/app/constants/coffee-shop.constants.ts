export interface BeverageOrder {
  id: number;
  item: string;
  orderPlacedAt: Date;
  orderCompletedAt: Date;
}

export enum QueueStatus {
  COMPLETED = 'completed',
  PROCESSING = 'processing',
  INQUEUE = 'inqueue'
}

export type OrdersList = {
  [key in QueueStatus]: BeverageOrder[];
};

export interface BeverageRecipe {
  [key: string]: number;
}

export interface IngredientsQuantity {
  [key: string]: number;
}

export interface CoffeeShopData {
  'machine': {
    'outlets': {
      'count_n': number
    },
    'beverages': { [key: string]: BeverageRecipe },
    'total_items_quantity': IngredientsQuantity
  };
}

export enum CoffeeMachineStatus {
  TURNED_OFF = 'turned off',
  STARTING = 'starting',
  IDLE = 'idle',
  RUNNING = 'running',
  FULL = 'full'
}
