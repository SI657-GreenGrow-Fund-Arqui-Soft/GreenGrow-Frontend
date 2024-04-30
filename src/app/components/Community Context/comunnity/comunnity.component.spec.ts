import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunnityComponent } from './comunnity.component';

describe('ComunnityComponent', () => {
  let component: ComunnityComponent;
  let fixture: ComponentFixture<ComunnityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunnityComponent]
    });
    fixture = TestBed.createComponent(ComunnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
