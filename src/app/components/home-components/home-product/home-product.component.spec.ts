import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductComponent } from './home-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductComponentsModule } from '@/components/product-components/product-components.module';

describe('HomeProductComponent', () => {
  let component: HomeProductComponent;
  let fixture: ComponentFixture<HomeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeProductComponent],
      imports: [RouterTestingModule, ProductComponentsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
