import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoffeeMachineComponent } from './coffee-machine.component';

describe('CoffeeMachineComponent', () => {
  let component: CoffeeMachineComponent;
  let fixture: ComponentFixture<CoffeeMachineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
