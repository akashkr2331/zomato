import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrOrdersComponent } from './curr-orders.component';

describe('CurrOrdersComponent', () => {
  let component: CurrOrdersComponent;
  let fixture: ComponentFixture<CurrOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
