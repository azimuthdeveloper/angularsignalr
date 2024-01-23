import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenComponent } from './kitchen.component';

describe('KitchenComponent', () => {
  let component: KitchenComponent;
  let fixture: ComponentFixture<KitchenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
