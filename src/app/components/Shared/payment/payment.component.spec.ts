import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component'; // Asegúrate de importar correctamente el componente Payment

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentComponent], // Asegúrate de declarar el componente Payment en TestBed
    });
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
